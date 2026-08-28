import { describe, it, expect, beforeEach } from 'vitest'
import { getSettings, saveSettings, recordSession, getDay, getRange, getBest, localDayKey } from './progressStore'

const session = (over = {}) => ({
  drill: 'note-id' as const, level: 1, accidentals: false, naming: 'letters' as const,
  correct: 10, wrong: 2, accuracy: 10 / 12, avgMs: 900, bestStreak: 6,
  weight: 1, practiceScore: 83, at: '2026-08-28T10:00:00Z', ...over,
})

beforeEach(() => localStorage.clear())

describe('progressStore', () => {
  it('default settings', () =>
    expect(getSettings()).toEqual({ naming: 'letters', accidentals: false, sound: true }))
  it('settings round-trip', () => {
    saveSettings({ naming: 'solfege', accidentals: true, sound: false })
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
    expect(getSettings()).toEqual({ naming: 'letters', accidentals: false, sound: true })
  })
  it('recovers from valid JSON that is the wrong shape (null)', () => {
    localStorage.setItem('musoni-progress-v1', 'null')
    expect(getSettings()).toEqual({ naming: 'letters', accidentals: false, sound: true })
    expect(getDay('2026-08-28')).toEqual([])
  })
  it('recovers from valid JSON that is the wrong shape ({})', () => {
    localStorage.setItem('musoni-progress-v1', '{}')
    expect(getSettings()).toEqual({ naming: 'letters', accidentals: false, sound: true })
    expect(getDay('2026-08-28')).toEqual([])
  })
})
