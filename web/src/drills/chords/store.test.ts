import { beforeEach, describe, expect, it } from 'vitest'
import { playedMs, useChordStore } from './store'
import type { NameQuestion, RomanQuestion } from './generator'
import { getBest, getDay, getSettings, localDayKey } from '@/progress/progressStore'
import { restoreLiveSession } from '@/app/liveSession'
import { withDrill } from '@/test/fixtures'
import { withPreset } from '@/app/drillPreset'
import { CHORD_LEVELS } from '@/config/constants'

const base = withDrill('chords', { durationSec: 120 }, { ...getSettings(), naming: 'letters' as const })
const at = (level: number, options: Record<string, string | boolean> = {}) => withDrill('chords', { level, ...options }, base)
const T0 = new Date('2026-10-05T10:00:00Z').getTime()
const DAY0 = localDayKey(new Date(T0))
const store = () => useChordStore.getState()
const nameQ = () => store().question as NameQuestion
const romanQ = () => store().question as RomanQuestion
const wrongRoot = () => nameQ().options.findIndex((_, i) => i !== nameQ().correctIndex)

beforeEach(() => {
  localStorage.clear()
  useChordStore.setState({
    phase: 'setup', question: null, feedback: null, pickedRoot: null, pickedQuality: null,
    lastResult: null, misses: [], pausedAt: null, pauseReason: null,
  })
})

describe('chords store: answering by name', () => {
  it('waits for both taps, root first, and counts a right answer', () => {
    store().start(at(1), T0)
    store().pickRoot(nameQ().correctIndex, T0 + 500)
    expect(store().feedback).toBeNull()
    expect(store().pickedRoot).toBe(nameQ().correctIndex)
    store().pickQuality(nameQ().quality, T0 + 1500)
    expect(store().feedback).toEqual({ correct: true, answer: { root: nameQ().correctIndex, quality: nameQ().quality } })
    expect(store().correct).toBe(1)
    expect(store().sumMs).toBe(1500)
    expect(store().pickedRoot).toBeNull()
  })

  it('takes the quality first too, and lets the root be changed before the quality', () => {
    store().start(at(1), T0)
    store().pickQuality(nameQ().quality, T0)
    expect(store().feedback).toBeNull()
    store().pickRoot(nameQ().correctIndex, T0)
    expect(store().feedback!.correct).toBe(true)

    store().nextQuestion(T0)
    store().pickRoot(wrongRoot(), T0)
    store().pickRoot(nameQ().correctIndex, T0)
    store().pickQuality(nameQ().quality, T0)
    expect(store().correct).toBe(2)
  })

  it('counts a wrong quality or a wrong root as a miss, and keeps it for the result', () => {
    store().start(at(1), T0)
    const q = nameQ()
    const other = q.qualities.find(x => x !== q.quality)!
    store().pickRoot(q.correctIndex, T0)
    store().pickQuality(other, T0)
    expect(store().feedback!.correct).toBe(false)
    expect(store().streak).toBe(0)
    expect(store().misses).toEqual([{ question: q, answer: { root: q.correctIndex, quality: other } }])

    store().nextQuestion(T0)
    store().pickRoot(wrongRoot(), T0)
    store().pickQuality(nameQ().quality, T0)
    expect(store().wrong).toBe(2)
  })

  it('ignores a quality the level does not ask', () => {
    store().start(at(2), T0)
    store().pickQuality('dim', T0)
    expect(store().pickedQuality).toBeNull()
  })

  it('takes one answer per question, none while paused, and no numerals', () => {
    store().start(at(1), T0)
    store().pickDegree(0, T0)
    expect(store().feedback).toBeNull()
    store().pause('menu', T0)
    store().pickRoot(nameQ().correctIndex, T0)
    expect(store().pickedRoot).toBeNull()
    store().resume(T0)
    store().pickRoot(nameQ().correctIndex, T0)
    store().pickQuality(nameQ().quality, T0)
    store().pickRoot(wrongRoot(), T0)
    store().pickQuality(nameQ().quality, T0)
    expect(store().correct + store().wrong).toBe(1)
  })

  it('builds streaks', () => {
    store().start(at(1), T0)
    for (let i = 0; i < 3; i++) {
      store().pickRoot(nameQ().correctIndex, T0)
      store().pickQuality(nameQ().quality, T0)
      store().nextQuestion(T0)
    }
    expect(store().streak).toBe(3)
    store().pickRoot(wrongRoot(), T0)
    store().pickQuality(nameQ().quality, T0)
    expect(store().streak).toBe(0)
    expect(store().bestStreak).toBe(3)
  })
})

describe('chords store: Roman numerals', () => {
  it('runs levels 5-7 as numerals and answers with one tap', () => {
    store().start(at(6, { mode: 'roman' }), T0)
    expect(store().level).toBe(6)
    expect(romanQ().kind).toBe('roman')
    store().pickRoot(0, T0)
    expect(store().pickedRoot).toBeNull()
    store().pickDegree(romanQ().degree, T0 + 800)
    expect(store().feedback!.correct).toBe(true)
    store().nextQuestion(T0)
    store().pickDegree((romanQ().degree + 1) % 7, T0)
    expect(store().feedback!.correct).toBe(false)
    expect(store().misses[0].answer).toEqual({ degree: (romanQ().degree + 1) % 7 })
  })

  it('reads the mode with a naming level as the Roman level in the same place, and a Roman level as Roman', () => {
    store().start(at(2, { mode: 'roman' }), T0)
    expect(store().level).toBe(6)
    store().start(at(7, { mode: 'name' }), T0)
    expect(store().level).toBe(7)
    store().start(at(4, { mode: 'name' }), T0)
    expect(store().level).toBe(4)
  })

  it('takes a lesson preset with the mode for that session only', () => {
    const settings = withPreset(at(1), { drill: 'chords', level: 5, durationSec: 60, mode: 'roman' })
    store().start(settings, T0)
    expect(store().level).toBe(5)
    expect(store().endsAt).toBe(T0 + 60_000)
    expect(base.drills.chords?.mode).toBeUndefined()
  })

  it('runs a lesson preset without a mode by name, even when the reader last chose Roman numerals', () => {
    const settings = withPreset(at(6, { mode: 'roman' }), { drill: 'chords', level: 2, durationSec: 60 })
    store().start(settings, T0)
    expect(store().level).toBe(2)
    expect(nameQ().kind).toBe('name')
  })
})

describe('chords store: session', () => {
  it('scores a full session with the level weight and records it under the drill and level', () => {
    store().start(at(3), T0)
    for (let i = 0; i < 10; i++) {
      store().pickRoot(nameQ().correctIndex, T0)
      store().pickQuality(nameQ().quality, T0)
      store().nextQuestion(T0)
    }
    store().tick(T0 + 120_000)
    const r = store().lastResult!
    expect(store().phase).toBe('finished')
    expect(r).toMatchObject({ drill: 'chords', level: 3, correct: 10, weight: CHORD_LEVELS[3].weight })
    expect(r.practiceScore).toBeGreaterThan(0)
    expect(getDay(DAY0)).toHaveLength(1)
    expect(getBest('chords', 3)!.practiceScore).toBe(r.practiceScore)
    expect(getBest('chords', 7)).toBeNull()
  })

  it('ends on time with a root still waiting for its quality: the pick is dropped, later taps do nothing', () => {
    store().start(at(2), T0)
    store().pickRoot(nameQ().correctIndex, T0)
    store().pickQuality(nameQ().quality, T0)
    store().nextQuestion(T0)
    store().pickRoot(nameQ().correctIndex, T0 + 1000)
    store().tick(T0 + 120_000)
    expect(store()).toMatchObject({ phase: 'finished', pickedRoot: null, question: null })
    expect(store().lastResult).toMatchObject({ correct: 1, wrong: 0, durationSec: 120 })
    store().pickQuality('major', T0 + 121_000)
    store().pickRoot(0, T0 + 121_000)
    expect(store().lastResult).toMatchObject({ correct: 1, wrong: 0 })
    expect(getDay(DAY0)).toHaveLength(1)
  })

  it('records an early end with answers as partial, and drops one without', () => {
    store().start(at(1), T0)
    store().endEarly(T0 + 5000)
    expect(store().phase).toBe('setup')
    expect(getDay(DAY0)).toHaveLength(0)

    store().start(at(1), T0)
    store().pickRoot(nameQ().correctIndex, T0)
    store().pickQuality(nameQ().quality, T0)
    store().endEarly(T0 + 30_000)
    expect(store().phase).toBe('finished')
    expect(store().lastResult).toMatchObject({ partial: true, durationSec: 30 })
  })

  it('stops the clock while paused and moves the answer clock on by the pause', () => {
    store().start(at(1), T0)
    store().pause('away', T0 + 10_000)
    expect(playedMs(store(), T0 + 60_000)).toBe(10_000)
    store().resume(T0 + 70_000)
    expect(store().endsAt).toBe(T0 + 120_000 + 60_000)
    store().pickRoot(nameQ().correctIndex, T0 + 71_000)
    store().pickQuality(nameQ().quality, T0 + 71_000)
    expect(store().sumMs).toBe(11_000)
  })

  it('brings a session back paused after a page load, past an answered question, its root pick kept', () => {
    store().start(at(4), T0)
    store().pickRoot(nameQ().correctIndex, T0)
    store().pickQuality(nameQ().quality, T0)
    const answered = nameQ()
    store().pause('away', T0 + 4_000)
    reload(T0 + 10_000)
    expect(store()).toMatchObject({ phase: 'running', correct: 1, pausedAt: T0 + 4_000, feedback: null })
    expect(store().question).not.toEqual(answered)

    // A root picked and waiting for its quality stays picked.
    store().resume(T0 + 10_000)
    store().pickRoot(nameQ().correctIndex, T0 + 11_000)
    store().pause('away', T0 + 12_000)
    reload(T0 + 20_000)
    expect(store().pickedRoot).toBe(nameQ().correctIndex)
  })
})

/** A page load: the store starts over empty, and whatever storage held is brought back. */
function reload(now: number) {
  const saved = localStorage.getItem('musoni-live-v1')
  useChordStore.setState({
    phase: 'setup', question: null, feedback: null, pickedRoot: null, correct: 0, wrong: 0, pausedAt: null, pauseReason: null,
  })
  if (saved) localStorage.setItem('musoni-live-v1', saved)
  restoreLiveSession(useChordStore, 'chords', now)
}
