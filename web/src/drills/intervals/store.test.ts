import { describe, it, expect, beforeEach } from 'vitest'
import { playedMs, useIntervalsStore } from './store'
import { getDay, getSettings, localDayKey } from '@/progress/progressStore'
import { restoreLiveSession } from '@/app/liveSession'
import { withPreset } from '@/app/drillPreset'
import { withDrill } from '@/test/fixtures'
import { INTERVAL_LEVELS } from '@/config/constants'
import { answerKey } from './generator'
import { rowOf, type Cell } from './grid'
import type { Size } from './interval'

const base = withDrill('intervals', { durationSec: 60 }, { ...getSettings(), naming: 'letters' as const })
const at = (level: number, options: Record<string, boolean> = {}) => withDrill('intervals', { level, ...options }, base)
const T0 = new Date('2026-08-28T10:00:00Z').getTime()
const DAY0 = localDayKey(new Date(T0))
const store = () => useIntervalsStore.getState()

/** The cell that answers the question on screen. */
function rightCell(): Cell {
  const { interval } = store().question!
  return { row: rowOf(interval, INTERVAL_LEVELS[store().level].rows), size: interval.size }
}
/** A cell of another size on the same row: always wrong, and always on the grid (the major/perfect row has every size). */
function wrongCell(): Cell {
  const right = rightCell()
  const row = right.row === 'size' ? 'size' : 'MP'
  return { row, size: (right.size === 8 ? 7 : right.size + 1) as Size }
}

beforeEach(() => {
  localStorage.clear()
  useIntervalsStore.setState({ phase: 'setup', question: null, feedback: null, pausedAt: null, pauseReason: null, misses: [] })
})

describe('intervals store', () => {
  it('starts a session at its own level and length', () => {
    store().start(at(3), T0)
    expect(store()).toMatchObject({ phase: 'running', level: 3, endsAt: T0 + 60_000 })
    expect(store().question).not.toBeNull()
  })

  it('counts a right answer and a miss, and keeps the miss with the cell picked', () => {
    store().start(at(2), T0)
    store().answer(rightCell(), T0 + 1500)
    expect(store()).toMatchObject({ correct: 1, wrong: 0, streak: 1, sumMs: 1500 })
    expect(store().feedback).toMatchObject({ correct: true })
    store().nextQuestion(T0 + 2000)
    const q = store().question!
    const pick = wrongCell()
    store().answer(pick, T0 + 3000)
    expect(store()).toMatchObject({ correct: 1, wrong: 1, streak: 0, bestStreak: 1 })
    expect(store().misses).toEqual([{ question: q, chosen: pick }])
  })

  it('takes any quality of the right size at level 1', () => {
    store().start(at(1), T0)
    store().answer({ row: 'size', size: store().question!.interval.size }, T0 + 500)
    expect(store().correct).toBe(1)
  })

  it('times each answer from when its question appears, not the verdict hold or a pause', () => {
    store().start(at(2), T0)
    store().answer(rightCell(), T0 + 1000)
    // The verdict holds until T0 + 3000; the next question's clock starts there.
    store().nextQuestion(T0 + 3000)
    store().pause('menu', T0 + 3500)
    store().resume(T0 + 13_500)
    store().answer(rightCell(), T0 + 14_000)
    expect(store().sumMs).toBe(1000 + 1000)
  })

  it('times a question that appeared during a pause from the resume', () => {
    store().start(at(2), T0)
    store().answer(rightCell(), T0 + 1000)
    store().pause('away', T0 + 1500)
    store().nextQuestion(T0 + 3000)
    store().resume(T0 + 20_000)
    store().answer(rightCell(), T0 + 21_000)
    expect(store().sumMs).toBe(1000 + 1000)
  })

  it('takes no answer while paused', () => {
    store().start(at(2), T0)
    store().pause('menu', T0 + 500)
    store().answer(rightCell(), T0 + 1000)
    expect(store()).toMatchObject({ correct: 0, wrong: 0, feedback: null })
  })

  it('ignores a blank cell, a row the level does not use, and a second answer', () => {
    store().start(at(2), T0)
    store().answer({ row: 'm', size: 5 }, T0)
    store().answer({ row: 'A', size: 4 }, T0)
    expect(store().feedback).toBeNull()
    store().answer(rightCell(), T0)
    store().answer(wrongCell(), T0)
    expect(store()).toMatchObject({ correct: 1, wrong: 0 })
  })

  it('never asks the same interval twice in a row', () => {
    store().start(at(4), T0)
    for (let i = 0; i < 200; i++) {
      const before = answerKey(4, store().question!.interval)
      store().nextQuestion(T0)
      expect(answerKey(4, store().question!.interval)).not.toBe(before)
    }
  })

  it('records a finished session with its level weight, accidentals and a pace score', () => {
    store().start(at(3), T0)
    store().answer(rightCell(), T0 + 1000)
    store().tick(T0 + 60_000)
    const [saved] = getDay(DAY0)
    expect(saved).toMatchObject({
      drill: 'intervals', level: 3, durationSec: 60, correct: 1, accidentals: true, weight: INTERVAL_LEVELS[3].weight,
    })
    expect(saved.practiceScore).toBeGreaterThan(0)
    expect(store().phase).toBe('finished')
  })

  it('scores a harder level higher for the same answers', () => {
    const score = (level: number) => {
      localStorage.clear()
      store().start(at(level), T0)
      store().answer(rightCell(), T0 + 1000)
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
    store().answer(rightCell(), T0 + 1000)
    store().endEarly(T0 + 30_000)
    expect(store().phase).toBe('finished')
    expect(getDay(DAY0)[0]).toMatchObject({ drill: 'intervals', partial: true, practiceScore: 0, durationSec: 30 })
  })

  it("runs a lesson preset's level and length, and keeps the reader's hearing", () => {
    const saved = at(1, { hear: false })
    store().start(withPreset(saved, { drill: 'intervals', level: 4, durationSec: 120 }), T0)
    expect(store().level).toBe(4)
    expect(store().endsAt).toBe(T0 + 120_000)
    expect(store().settings.drills.intervals.hear).toBe(false)
  })
})

describe('intervals session across a page load', () => {
  it('comes back paused, past the question already answered', () => {
    store().start(at(2), T0)
    const first = store().question!
    store().answer(rightCell(), T0 + 1000)
    store().pause('away', T0 + 4000)
    const saved = localStorage.getItem('musoni-live-v1')
    useIntervalsStore.setState({ phase: 'setup', question: null, feedback: null, correct: 0, wrong: 0, pausedAt: null, pauseReason: null })
    if (saved) localStorage.setItem('musoni-live-v1', saved)
    restoreLiveSession(useIntervalsStore, 'intervals', T0 + 10_000)
    expect(store()).toMatchObject({ phase: 'running', level: 2, correct: 1, pausedAt: T0 + 4000, pauseReason: 'away', feedback: null })
    expect(answerKey(2, store().question!.interval)).not.toBe(answerKey(2, first.interval))
  })
})
