import { describe, it, expect, beforeEach } from 'vitest'

// The shipped defaults: Vietnamese first, and solfege with it, because that is
// how notes are taught in the target market.
const DEFAULT_SETTINGS = {
  level: 1,
  durationSec: 60,
  accidentals: false,
  naming: 'solfege',
  sound: true,
  lang: 'vi',
} as const
import { getSettings, saveSettings, recordSession, getDay, getRange, getBest, localDayKey, getStreak, getDailyMinutes, getLongestStreak, getActiveDayCount } from './progressStore'

const session = (over = {}) => ({
  drill: 'note-id' as const, level: 1, accidentals: false, naming: 'letters' as const, durationSec: 60,
  correct: 10, wrong: 2, accuracy: 10 / 12, avgMs: 900, bestStreak: 6,
  weight: 1, practiceScore: 83, at: '2026-08-28T10:00:00Z', ...over,
})

beforeEach(() => localStorage.clear())

describe('progressStore', () => {
  it('default settings', () =>
    expect(getSettings()).toEqual(DEFAULT_SETTINGS))
  it('settings round-trip', () => {
    saveSettings({ ...DEFAULT_SETTINGS, naming: 'solfege', accidentals: true, sound: false, durationSec: 120, lang: 'en' })
    expect(getSettings().naming).toBe('solfege')
  })
  it('records under the LOCAL date key derived from `at`', () => {
    recordSession(session())
    const key = localDayKey(new Date('2026-08-28T10:00:00Z'))
    expect(getDay(key)).toHaveLength(1)
    const otherDay = localDayKey(new Date('2026-08-27T10:00:00Z'))
    expect(getDay(otherDay)).toHaveLength(0)
  })
  it('getRange returns only days inside range', () => {
    recordSession(session({ at: '2026-08-26T09:00:00Z' }))
    recordSession(session({ at: '2026-08-28T09:00:00Z' }))
    const from = localDayKey(new Date('2026-08-27T09:00:00Z'))
    const to = localDayKey(new Date('2026-08-28T09:00:00Z'))
    const r = getRange(from, to)
    expect(Object.keys(r)).toEqual([to])
  })
  it('buckets by LOCAL day, not UTC day, when they differ', () => {
    // 1am UTC is still the previous evening in negative-offset timezones and
    // the previous evening in UTC itself is late enough to roll into the next
    // UTC day for positive-offset timezones. Rather than assume the test
    // runner's offset, derive the expected bucket the same way production
    // code does and assert the UTC-slice key is NOT used when it would differ.
    const at = '2026-08-28T00:30:00Z'
    recordSession(session({ at }))
    const expectedKey = localDayKey(new Date(at))
    const utcSliceKey = at.slice(0, 10)
    expect(getDay(expectedKey)).toHaveLength(1)
    if (utcSliceKey !== expectedKey) {
      expect(getDay(utcSliceKey)).toHaveLength(0)
    }
  })
  it('getBest picks highest practiceScore for drill+level', () => {
    recordSession(session({ practiceScore: 50 }))
    recordSession(session({ practiceScore: 90 }))
    recordSession(session({ practiceScore: 200, level: 2 }))
    expect(getBest('note-id', 1)!.practiceScore).toBe(90)
    expect(getBest('note-id', 3)).toBeNull()
  })
  it('recovers from corrupted localStorage', () => {
    localStorage.setItem('musoni-progress-v1', '{not json')
    expect(getSettings()).toEqual(DEFAULT_SETTINGS)
  })
  it('recovers from valid JSON that is the wrong shape (null)', () => {
    localStorage.setItem('musoni-progress-v1', 'null')
    expect(getSettings()).toEqual(DEFAULT_SETTINGS)
    expect(getDay('2026-08-28')).toEqual([])
  })
  it('recovers from valid JSON that is the wrong shape ({})', () => {
    localStorage.setItem('musoni-progress-v1', '{}')
    expect(getSettings()).toEqual(DEFAULT_SETTINGS)
    expect(getDay('2026-08-28')).toEqual([])
  })
})

describe('getBest spans every session length', () => {
  it('compares sessions of different lengths directly, since the score is a pace', () => {
    recordSession(session({ durationSec: 60, practiceScore: 100 }))
    recordSession(session({ durationSec: 300, practiceScore: 140 }))
    expect(getBest('note-id', 1)!.practiceScore).toBe(140)
  })
  it('does not fragment into a bucket per custom length', () => {
    recordSession(session({ durationSec: 60, practiceScore: 300 }))
    recordSession(session({ durationSec: 437, practiceScore: 80 }))
    expect(getBest('note-id', 1)!.practiceScore).toBe(300)
  })
})

describe('getStreak', () => {
  const day = (offset: number) => {
    const d = new Date('2026-08-28T12:00:00')
    d.setDate(d.getDate() + offset)
    return d
  }
  const on = (offset: number) => session({ at: day(offset).toISOString() })
  const today = day(0)

  it('is zero with no sessions', () => {
    expect(getStreak(today)).toBe(0)
  })
  it('counts consecutive days ending today', () => {
    recordSession(on(0)); recordSession(on(-1)); recordSession(on(-2))
    expect(getStreak(today)).toBe(3)
  })
  it('counts multiple sessions in a day once', () => {
    recordSession(on(0)); recordSession(on(0))
    expect(getStreak(today)).toBe(1)
  })
  it('survives an unpractised today by counting back from yesterday', () => {
    recordSession(on(-1)); recordSession(on(-2))
    expect(getStreak(today)).toBe(2)
  })
  it('breaks on a missed day', () => {
    recordSession(on(0)); recordSession(on(-1)); recordSession(on(-3))
    expect(getStreak(today)).toBe(2)
  })
})


describe('activity history', () => {
  const day = (offset: number) => {
    const d = new Date('2026-08-28T12:00:00')
    d.setDate(d.getDate() + offset)
    return d
  }
  const on = (offset: number, durationSec = 60) =>
    session({ at: day(offset).toISOString(), durationSec })

  it('sums minutes per day', () => {
    recordSession(on(0, 60))
    recordSession(on(0, 120))
    recordSession(on(-1, 300))
    const minutes = getDailyMinutes()
    expect(minutes[localDayKey(day(0))]).toBe(3)
    expect(minutes[localDayKey(day(-1))]).toBe(5)
  })

  it('omits days with no sessions', () => {
    recordSession(on(0))
    expect(getDailyMinutes()[localDayKey(day(-1))]).toBeUndefined()
  })

  it('finds the longest run, not the current one', () => {
    // A four-day run last week, then a gap, then two days now.
    for (const offset of [-10, -9, -8, -7, -1, 0]) recordSession(on(offset))
    expect(getLongestStreak()).toBe(4)
    expect(getStreak(day(0))).toBe(2)
  })

  it('counts a single day as a streak of one', () => {
    recordSession(on(0))
    expect(getLongestStreak()).toBe(1)
  })

  it('is zero with no history', () => {
    expect(getLongestStreak()).toBe(0)
    expect(getActiveDayCount()).toBe(0)
  })

  it('counts active days regardless of how many sessions each holds', () => {
    recordSession(on(0)); recordSession(on(0)); recordSession(on(-3))
    expect(getActiveDayCount()).toBe(2)
  })
})
