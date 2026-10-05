import { describe, it, expect, beforeEach } from 'vitest'
import { playedMs, useEarStore } from './store'
import { getDay, getSettings, localDayKey } from '@/progress/progressStore'
import { restoreLiveSession } from '@/app/liveSession'
import { withDrill } from '@/test/fixtures'

const base = withDrill('hear-play', { durationSec: 120 }, { ...getSettings(), naming: 'letters' as const })
/** Settings for a session at this level, with any Nghe & Đàn options. */
const at = (level: number, options: Record<string, boolean> = {}) => withDrill('hear-play', { level, ...options }, base)
const T0 = new Date('2026-08-28T10:00:00Z').getTime()
const DAY0 = localDayKey(new Date(T0))
const store = () => useEarStore.getState()

beforeEach(() => {
  localStorage.clear()
  useEarStore.setState({ phase: 'setup', question: null, feedback: null, pausedAt: null, pauseReason: null })
})

describe('hear-play store', () => {
  it('keeps every question in C when the session stays in one key', () => {
    store().start(at(3, { oneKey: true }), T0)
    for (let i = 0; i < 20; i++) {
      expect(store().question!.key).toBe('C')
      store().nextQuestion(T0)
    }
  })

  it('marks a session played with an aid, and only then', () => {
    store().start(at(2, { cadenceEach: true }), T0)
    store().tick(T0 + 120_000)
    expect(store().lastResult!.aids).toBe(true)
    store().start(at(2), T0)
    store().tick(T0 + 120_000)
    expect(store().lastResult!.aids).toBeUndefined()
  })

  it('does not count one key as an aid at level 1, which is already in C', () => {
    store().start(at(1, { oneKey: true }), T0)
    store().tick(T0 + 120_000)
    expect(store().lastResult!.aids).toBeUndefined()
  })

  it('starts a session in its own length, on a new key', () => {
    store().start(at(2), T0)
    expect(store().phase).toBe('running')
    expect(store().endsAt).toBe(T0 + 120_000)
    expect(store().question!.newKey).toBe(true)
  })

  it('times the answer from when the note sounded, not from the cadence', () => {
    store().start(at(1), T0)
    store().heard(T0 + 2500)
    store().answer(store().question!.correctIndex, T0 + 3500)
    expect(store().sumMs).toBe(1000)
  })

  it('keeps a miss with both labels, and the note on a treble staff', () => {
    store().start(at(1), T0)
    const q = store().question!
    const wrong = q.options.findIndex((_, i) => i !== q.correctIndex)
    store().answer(wrong, T0 + 1000)
    expect(store().misses).toEqual([{
      clef: 'treble', pitch: q.pitch, answer: q.options[q.correctIndex].label, chosen: q.options[wrong].label,
    }])
    expect(store().streak).toBe(0)
  })

  it('counts questions per key and starts over on a new one', () => {
    store().start(at(2), T0)
    let expected = 1
    for (let i = 0; i < 14; i++) {
      store().answer(store().question!.correctIndex, T0)
      store().nextQuestion(T0)
      expected = store().question!.newKey ? 1 : expected + 1
      expect(store().inKey).toBe(expected)
    }
  })

  it('records a finished session as hear-play with its level weight and score', () => {
    store().start(at(3), T0)
    store().answer(store().question!.correctIndex, T0 + 1000)
    store().tick(T0 + 120_000)
    const [saved] = getDay(DAY0)
    expect(saved).toMatchObject({ drill: 'hear-play', level: 3, durationSec: 120, correct: 1, accidentals: true })
    expect(saved.practiceScore).toBeGreaterThan(0)
    expect(store().phase).toBe('finished')
  })

  it('pauses the clock and hands paused time back on resume', () => {
    store().start(at(1), T0)
    store().pause('menu', T0 + 10_000)
    store().tick(T0 + 200_000)
    expect(store().phase).toBe('running')
    store().resume(T0 + 30_000)
    expect(store().endsAt).toBe(T0 + 140_000)
    expect(playedMs(store(), T0 + 40_000)).toBe(20_000)
  })

  it('ending early keeps answered time as partial, or drops a session with none', () => {
    store().start(at(1), T0)
    store().endEarly(T0 + 5000)
    expect(store().phase).toBe('setup')
    expect(getDay(DAY0)).toHaveLength(0)
    store().start(at(1), T0)
    store().answer(store().question!.correctIndex, T0 + 1000)
    store().endEarly(T0 + 30_000)
    expect(store().phase).toBe('finished')
    expect(getDay(DAY0)[0]).toMatchObject({ drill: 'hear-play', partial: true, practiceScore: 0, durationSec: 30 })
  })
})

/** A page load: the store starts over empty, and whatever storage held is brought back. */
function reload(store: { setState: (s: object) => void }, drill: 'note-id' | 'hear-play', now: number) {
  const saved = localStorage.getItem('musoni-live-v1')
  store.setState({ phase: 'setup', question: null, feedback: null, correct: 0, wrong: 0, pausedAt: null, pauseReason: null })
  if (saved) localStorage.setItem('musoni-live-v1', saved)
  restoreLiveSession(store as never, drill, now)
}

describe('hear-play session across a page load', () => {
  it('comes back paused with its key and answers after a refresh', () => {
    store().start(at(2), T0)
    const key = store().question!.key
    store().answer(store().question!.correctIndex, T0 + 1_000)
    store().pause('away', T0 + 4_000)
    reload(useEarStore, 'hear-play', T0 + 10_000)
    expect(store()).toMatchObject({ phase: 'running', correct: 1, pausedAt: T0 + 4_000, feedback: null })
    // The answered question was counted, so the next one is asked, in the same key.
    expect(store().question!.key).toBe(key)
  })
})
