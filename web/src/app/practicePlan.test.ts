import { describe, it, expect } from 'vitest'
import { pickToday, type TodayInput } from './practicePlan'
import { fakeDrill } from '@/test/fakeDrill'

const open = fakeDrill({ id: 'open', order: 1 })
const keySig = fakeDrill({ id: 'key-sig', order: 2 })
const drills = [open, keySig]

const NOW = new Date(2026, 9, 5, 18, 0)
const daysAgo = (n: number) => new Date(2026, 9, 5 - n, 9, 0).toISOString()

describe('pickToday', () => {
  const base: TodayInput = {
    drills, lastPlayed: {}, settings: { drills: {} }, todayMinutes: 0, dailyGoal: 5, now: NOW,
  }

  it("gives a brand-new reader the first drill: one gentle minute at level 1", () => {
    const pick = pickToday(base)!
    expect(pick.drill.id).toBe('open')
    expect(pick.preset).toEqual({ drill: 'open', level: 1, durationSec: 60, mode: 'a' })
    expect(pick.reason).toEqual({ kind: 'new' })
  })

  it('picks the drill practised least recently, at the reader’s own level and options', () => {
    const pick = pickToday({
      ...base, todayMinutes: 4,
      settings: { drills: { open: { level: 2, durationSec: 300, mode: 'c' } } },
      lastPlayed: { 'key-sig': daysAgo(1), open: daysAgo(3) },
    })!
    expect(pick.drill.id).toBe('open')
    // The length fills the one minute left, not their 5.
    expect(pick.preset).toEqual({ drill: 'open', level: 2, durationSec: 60, mode: 'c' })
    expect(pick.reason).toEqual({ kind: 'rest', days: 3 })
  })

  it('prefers a never-played drill over one played before', () => {
    const pick = pickToday({ ...base, lastPlayed: { open: daysAgo(9) } })!
    expect(pick.drill.id).toBe('key-sig')
    expect(pick.reason.kind).toBe('new')
  })

  it('says so when every drill was already practised today', () => {
    const pick = pickToday({ ...base, todayMinutes: 6, drills: [open], lastPlayed: { open: daysAgo(0) } })!
    expect(pick.reason).toEqual({ kind: 'again' })
    expect(pick.preset.durationSec).toBe(60)
  })

  it('fills two minutes while two or more are left', () => {
    const lastPlayed = { open: daysAgo(1) }
    expect(pickToday({ ...base, drills: [open], lastPlayed, todayMinutes: 3 })!.preset.durationSec).toBe(120)
    expect(pickToday({ ...base, drills: [open], lastPlayed, todayMinutes: 4 })!.preset.durationSec).toBe(60)
  })

  it('is null with no drill listed', () => {
    expect(pickToday({ ...base, drills: [] })).toBeNull()
  })
})
