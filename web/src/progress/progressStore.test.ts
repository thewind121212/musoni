import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// The shipped defaults: Vietnamese first, and solfege with it, because that is
// how notes are taught in the target market.
const DEFAULT_SETTINGS = {
  level: 1,
  durationSec: 60,
  accidentals: false,
  naming: 'solfege',
  sound: true,
  keyLabels: true, padStyle: 'piano' as const, earLevel: 1 as const, earDurationSec: 120,
  earCadenceEach: false, earOneKey: false,
  lang: 'vi',
  activityExpanded: false,
} as const
import { getSettings, saveSettings, recordSession, getDay, getRange, getBest, localDayKey, getStreak, getDailyMinutes, getLongestStreak, getActiveDayCount, getRecentAverage } from './progressStore'

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
  // Pins the zone per case so the check discriminates on any runner, not only
  // one whose own offset happens to put the session on a different UTC day.
  // Node re-reads TZ when it is assigned, so this works mid-process.
  describe.each([
    // 1:30am in Ho Chi Minh City is still the previous day in UTC.
    { tz: 'Asia/Ho_Chi_Minh', at: '2026-08-27T18:30:00Z', local: '2026-08-28', utc: '2026-08-27' },
    // 5:30pm in Los Angeles is already the next day in UTC.
    { tz: 'America/Los_Angeles', at: '2026-08-28T00:30:00Z', local: '2026-08-27', utc: '2026-08-28' },
  ])('in $tz', ({ tz, at, local, utc }) => {
    beforeEach(() => { vi.stubEnv('TZ', tz) })
    afterEach(() => { vi.unstubAllEnvs() })

    it('buckets by LOCAL day, not UTC day', () => {
      recordSession(session({ at }))
      expect(getDay(local)).toHaveLength(1)
      expect(getDay(utc)).toHaveLength(0)
    })
  })
  it('getBest picks highest practiceScore for drill+level', () => {
    recordSession(session({ practiceScore: 50 }))
    recordSession(session({ practiceScore: 90 }))
    recordSession(session({ practiceScore: 200, level: 2 }))
    expect(getBest('note-id', 1)!.practiceScore).toBe(90)
    expect(getBest('note-id', 3)).toBeNull()
  })
  it('getBest skips sessions played with listening aids', () => {
    recordSession(session({ drill: 'hear-play', practiceScore: 40 }))
    recordSession(session({ drill: 'hear-play', practiceScore: 90, aids: true }))
    expect(getBest('hear-play', 1)!.practiceScore).toBe(40)
  })
  it('counts aided sessions toward daily minutes', () => {
    recordSession(session({ drill: 'hear-play', durationSec: 120, aids: true }))
    expect(getDailyMinutes()[localDayKey(new Date('2026-08-28T10:00:00Z'))]).toBe(2)
  })
  it('loads progress saved before the listening aids with both off', () => {
    const old: Record<string, unknown> = { ...DEFAULT_SETTINGS }
    delete old.earCadenceEach
    delete old.earOneKey
    localStorage.setItem('musoni-progress-v1', JSON.stringify({ version: 1, settings: old, days: {} }))
    expect(getSettings()).toMatchObject({ earCadenceEach: false, earOneKey: false })
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

describe('getRecentAverage', () => {
  const now = new Date('2026-08-28T12:00:00')
  const at = (offset: number) => {
    const d = new Date(now)
    d.setDate(d.getDate() + offset)
    return d.toISOString()
  }

  it('averages the last week at the level, leaving out the session being compared', () => {
    recordSession(session({ at: at(0), practiceScore: 200 }))
    recordSession(session({ at: at(-1), practiceScore: 100 }))
    recordSession(session({ at: at(-6), practiceScore: 50 }))
    recordSession(session({ at: at(-7), practiceScore: 1 }))
    recordSession(session({ at: at(-1), practiceScore: 999, level: 2 }))
    expect(getRecentAverage('note-id', 1, at(0), 7, now)).toBe(75)
  })

  it('is null with nothing else to compare against', () => {
    recordSession(session({ at: at(0) }))
    expect(getRecentAverage('note-id', 1, at(0), 7, now)).toBeNull()
  })
})

describe('partial sessions', () => {
  it('count toward daily minutes but never toward bests or averages', () => {
    const now = new Date('2026-08-28T12:00:00')
    recordSession(session({ at: now.toISOString(), practiceScore: 40 }))
    recordSession(session({ at: now.toISOString(), practiceScore: 0, durationSec: 120, partial: true }))
    expect(getBest('note-id', 1)!.practiceScore).toBe(40)
    expect(getRecentAverage('note-id', 1, 'none', 7, now)).toBe(40)
    expect(getDailyMinutes()[localDayKey(now)]).toBe(3)
  })
})
