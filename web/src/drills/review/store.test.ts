import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { useReviewStore, sessionPool } from './store'
import {
  getDailyMinutes, getLiveSession, getReviewMarks, localDayKey, markLessonDone, getDay, getSettings,
} from '@/progress/progressStore'
import { resetStores, withDrill } from '@/test/fixtures'

const T0 = new Date(2026, 9, 5, 10, 0).getTime()
const store = () => useReviewStore.getState()

beforeEach(() => {
  resetStores()
  useReviewStore.setState({ phase: 'setup', checkId: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null })
})
afterEach(() => vi.restoreAllMocks())

const done = (...keys: string[]) => keys.forEach(k => markLessonDone(k, { correct: 3, total: 3 }))

describe('review session', () => {
  it('has nothing to ask before a lesson is finished, so it stays in setup', () => {
    store().start(getSettings(), T0)
    expect(store().phase).toBe('setup')
  })

  it('asks the checks of finished lessons, in the chosen chapters', () => {
    done('pitch-staff/pitch-names')
    expect(sessionPool(getSettings()).map(c => c.ref.key)).toEqual(Array(3).fill('pitch-staff/pitch-names'))
    // A saved choice that matches nothing any more falls back to every chapter.
    expect(sessionPool(withDrill('review', { chapters: ['gone'] }))).toHaveLength(3)
    store().start(getSettings(), T0)
    expect(store().phase).toBe('running')
    expect(store().checkId).toMatch(/^pitch-staff\/pitch-names\/\d+$/)
  })

  it("keeps each check's last answer in progress, counts it, and lists a miss for the result", () => {
    done('pitch-staff/pitch-names')
    store().start(getSettings(), T0)
    const first = store().checkId!
    store().answer(0, false, T0 + 3000)
    expect(getReviewMarks()[first]).toEqual({ at: new Date(T0 + 3000).toISOString(), missed: true })
    expect(store()).toMatchObject({ wrong: 1, correct: 0, misses: [first], feedback: { choice: 0, correct: false } })
    // One answer per question.
    store().answer(1, true, T0 + 4000)
    expect(store().correct).toBe(0)

    store().nextQuestion(T0 + 5000)
    const second = store().checkId!
    expect(second).not.toBe(first)
    store().answer(1, true, T0 + 6000)
    expect(getReviewMarks()[second]).toEqual({ at: new Date(T0 + 6000).toISOString() })
  })

  it('never asks the same check twice in a row', () => {
    done('pitch-staff/pitch-names', 'pitch-staff/staff-clefs')
    store().start(getSettings(), T0)
    for (let i = 0; i < 30; i++) {
      const before = store().checkId
      store().answer(0, i % 2 === 0, T0 + i * 1000)
      store().nextQuestion(T0 + i * 1000 + 500)
      expect(store().checkId).not.toBe(before)
    }
  })

  it('finishes when the clock runs out, as a scored session at its one level whose time counts toward the day', () => {
    done('pitch-staff/pitch-names')
    store().start(withDrill('review', { durationSec: 60 }), T0)
    store().answer(0, true, T0 + 2000)
    store().tick(T0 + 60_000)
    expect(store().phase).toBe('finished')
    const result = store().lastResult!
    expect(result).toMatchObject({ drill: 'review', level: 1, durationSec: 60, correct: 1 })
    expect(result.practiceScore).toBeGreaterThan(0)
    expect(getDay(localDayKey(new Date(T0)))).toHaveLength(1)
    expect(getDailyMinutes()[localDayKey(new Date(T0))]).toBe(1)
  })

  it('ended early with answers, keeps the time played as a partial session', () => {
    done('pitch-staff/pitch-names')
    store().start(getSettings(), T0)
    store().answer(0, true, T0 + 2000)
    store().endEarly(T0 + 30_000)
    expect(store().phase).toBe('finished')
    expect(store().lastResult).toMatchObject({ partial: true, durationSec: 30, practiceScore: 0 })
  })

  it('pauses the clock and gives the paused time back', () => {
    done('pitch-staff/pitch-names')
    store().start(getSettings(), T0)
    const endsAt = store().endsAt!
    store().pause('menu', T0 + 1000)
    store().resume(T0 + 11_000)
    expect(store().endsAt).toBe(endsAt + 10_000)
  })

  it('keeps a running session for a page load, as check ids only', () => {
    done('pitch-staff/pitch-names')
    store().start(getSettings(), T0)
    const live = getLiveSession<{ checkId: string }>('review')!
    expect(live.state.checkId).toBe(store().checkId)
    expect(live.summary.to).toBe('/train/review')
    expect(JSON.stringify(live.state)).not.toContain('Which note')
  })
})
