import { describe, it, expect, beforeEach } from 'vitest'
import { playedMs, useKeySigStore } from './store'
import { getDay, getSettings, localDayKey } from '@/progress/progressStore'
import { restoreLiveSession } from '@/app/liveSession'
import { withPreset } from '@/app/drillPreset'
import { withDrill } from '@/test/fixtures'
import { KEY_SIG_LEVELS } from '@/config/constants'

const base = withDrill('key-sig', { durationSec: 60 }, { ...getSettings(), naming: 'letters' as const })
const at = (level: number) => withDrill('key-sig', { level }, base)
const T0 = new Date('2026-08-28T10:00:00Z').getTime()
const DAY0 = localDayKey(new Date(T0))
const store = () => useKeySigStore.getState()
const wrongIndex = () => store().question!.correctIndex === 0 ? 1 : 0

beforeEach(() => {
  localStorage.clear()
  useKeySigStore.setState({ phase: 'setup', question: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null })
})

describe('key-sig store', () => {
  it('starts a session at its level and length', () => {
    store().start(at(3), T0)
    expect(store()).toMatchObject({ phase: 'running', level: 3, endsAt: T0 + 60_000, correct: 0, wrong: 0 })
    expect(store().question).not.toBeNull()
  })

  it('counts a right answer, its time and the streak', () => {
    store().start(at(1), T0)
    store().answer(store().question!.correctIndex, T0 + 1500)
    expect(store()).toMatchObject({ correct: 1, wrong: 0, streak: 1, bestStreak: 1, sumMs: 1500 })
    expect(store().feedback).toMatchObject({ correct: true })
    // One answer per question: a second tap before the next question is ignored.
    store().answer(wrongIndex(), T0 + 1600)
    expect(store().wrong).toBe(0)
  })

  it('keeps a miss with the signature, mode, clef and both labels, and breaks the streak', () => {
    store().start(at(4), T0)
    store().answer(store().question!.correctIndex, T0 + 1000)
    store().nextQuestion(T0 + 2000)
    const q = store().question!
    const pick = wrongIndex()
    store().answer(pick, T0 + 4000)
    expect(store().misses).toEqual([{
      fifths: q.fifths, mode: q.mode, clef: q.clef,
      answer: q.options[q.correctIndex].label, chosen: q.options[pick].label,
    }])
    expect(store()).toMatchObject({ streak: 0, bestStreak: 1, wrong: 1, sumMs: 3000 })
  })

  it('asks a different signature after every answer', () => {
    store().start(at(1), T0)
    for (let i = 0; i < 50; i++) {
      const before = store().question!.fifths
      store().answer(store().question!.correctIndex, T0)
      store().nextQuestion(T0)
      expect(store().question!.fifths).not.toBe(before)
      expect(store().feedback).toBeNull()
    }
  })

  it('records a finished session as key-sig with its level weight and a pace score', () => {
    store().start(at(3), T0)
    store().answer(store().question!.correctIndex, T0 + 1000)
    store().tick(T0 + 59_000)
    expect(store().phase).toBe('running')
    store().tick(T0 + 60_000)
    const [saved] = getDay(DAY0)
    expect(saved).toMatchObject({ drill: 'key-sig', level: 3, durationSec: 60, correct: 1, weight: KEY_SIG_LEVELS[3].weight })
    expect(saved.practiceScore).toBeGreaterThan(0)
    expect(saved.partial).toBeUndefined()
    expect(store().phase).toBe('finished')
  })

  it('scores a harder level higher for the same answers', () => {
    const score = (level: number) => {
      store().start(at(level), T0)
      for (let i = 0; i < 5; i++) {
        store().answer(store().question!.correctIndex, T0)
        store().nextQuestion(T0)
      }
      store().tick(T0 + 60_000)
      return store().lastResult!.practiceScore
    }
    expect(score(4)).toBeGreaterThan(score(1))
  })

  it('pauses the clock and hands paused time back on resume', () => {
    store().start(at(1), T0)
    store().pause('menu', T0 + 10_000)
    store().tick(T0 + 200_000)
    expect(store().phase).toBe('running')
    store().resume(T0 + 30_000)
    expect(store().endsAt).toBe(T0 + 80_000)
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
    expect(getDay(DAY0)[0]).toMatchObject({ drill: 'key-sig', partial: true, practiceScore: 0, durationSec: 30 })
  })

  it('runs a lesson preset\'s level and length for that session only', () => {
    const preset = withPreset(base, { drill: 'key-sig', level: 2, durationSec: 120 })
    store().start(preset, T0)
    expect(store()).toMatchObject({ level: 2, endsAt: T0 + 120_000 })
    expect(Math.abs(store().question!.fifths)).toBeLessThanOrEqual(KEY_SIG_LEVELS[2].maxAccidentals)
    expect(getSettings().drills['key-sig']).toBeUndefined()
  })
})

describe('key-sig session across a page load', () => {
  it('comes back paused, moving past a question already answered', () => {
    store().start(at(2), T0)
    store().answer(store().question!.correctIndex, T0 + 1_000)
    store().pause('away', T0 + 4_000)
    const saved = localStorage.getItem('musoni-live-v1')
    useKeySigStore.setState({ phase: 'setup', question: null, feedback: null, correct: 0, wrong: 0, pausedAt: null, pauseReason: null })
    if (saved) localStorage.setItem('musoni-live-v1', saved)
    restoreLiveSession(useKeySigStore, 'key-sig', T0 + 10_000)
    expect(store()).toMatchObject({ phase: 'running', correct: 1, pausedAt: T0 + 4_000, pauseReason: 'away', feedback: null, level: 2 })
    expect(store().question).not.toBeNull()
  })
})
