import { describe, it, expect, beforeEach } from 'vitest'
import { getSettings, saveSettings, recordSession, getDay, getRange, getBest } from './progressStore'

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
  it('records under date key', () => {
    recordSession(session())
    expect(getDay('2026-08-28')).toHaveLength(1)
    expect(getDay('2026-08-27')).toHaveLength(0)
  })
  it('getRange returns only days inside range', () => {
    recordSession(session({ at: '2026-08-26T09:00:00Z' }))
    recordSession(session({ at: '2026-08-28T09:00:00Z' }))
    const r = getRange('2026-08-27', '2026-08-28')
    expect(Object.keys(r)).toEqual(['2026-08-28'])
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
})
