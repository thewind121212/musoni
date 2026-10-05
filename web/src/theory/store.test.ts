import { beforeEach, describe, it, expect } from 'vitest'
import { useTheoryStore } from './store'
import { getDailyMinutes, getLessonsDone, localDayKey } from '@/progress/progressStore'

const store = () => useTheoryStore.getState()
const T0 = new Date(2026, 9, 5, 9).getTime()
const today = localDayKey(new Date(T0))

beforeEach(() => {
  localStorage.clear()
  useTheoryStore.setState({ lesson: null, steps: 0, step: 0, answers: {}, activeAt: null, pendingMs: 0 })
})

describe('theory store', () => {
  it('walks the steps, keeps the first answer only, and saves the lesson with its score at the end', () => {
    store().open('ch/a', 3, true, T0)
    store().answer(1, false, T0 + 1000)
    store().answer(0, true, T0 + 2000)
    store().next(T0 + 3000)
    store().answer(2, true, T0 + 4000)
    store().next(T0 + 5000)
    expect(getLessonsDone()).toEqual({})
    store().next(T0 + 6000)
    expect(store().step).toBe(3)
    expect(getLessonsDone()['ch/a']).toMatchObject({ correct: 1, total: 2 })
  })

  it('keeps its place for the same lesson, and starts a finished one over on a fresh visit', () => {
    store().open('ch/a', 2, true, T0)
    store().next(T0)
    store().open('ch/a', 2, true, T0)
    expect(store().step).toBe(1)
    store().next(T0)
    store().open('ch/a', 2, false, T0) // back from the practice drill
    expect(store().step).toBe(2)
    store().open('ch/a', 2, true, T0) // opened again from the list
    expect(store().step).toBe(0)
    store().open('ch/b', 4, false, T0)
    expect([store().lesson, store().step]).toEqual(['ch/b', 0])
  })

  it('counts time between taps toward the day, capped, and not while hidden', () => {
    store().open('ch/a', 5, true, T0)
    store().next(T0 + 60_000)
    store().next(T0 + 60_000 + 60 * 60_000) // an hour idle counts as 3 minutes
    store().hide(T0 + 60_000 + 60 * 60_000 + 30_000)
    expect(getDailyMinutes()[today]).toBe(5)
    store().next(T0 + 2 * 60 * 60_000) // still hidden: nothing counts
    store().show(T0 + 3 * 60 * 60_000)
    store().leave(T0 + 3 * 60 * 60_000 + 60_000)
    expect(getDailyMinutes()[today]).toBe(6)
  })

  it('does not record a lesson only glanced at, and forgets the place on close', () => {
    store().open('ch/a', 5, true, T0)
    store().next(T0 + 5_000)
    store().close(T0 + 8_000)
    expect(getDailyMinutes()).toEqual({})
    expect(store().lesson).toBeNull()
    store().open('ch/a', 5, true, T0 + 10_000)
    expect(store().step).toBe(0)
    // The few seconds carry over and count once there is enough time.
    store().leave(T0 + 30_000)
    const saved = JSON.parse(localStorage.getItem('musoni-progress-v1')!)
    expect(saved.days[today].lessons).toEqual([expect.objectContaining({ lesson: 'ch/a', seconds: 28 })])
  })
})
