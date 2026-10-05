import { describe, it, expect } from 'vitest'
import { isUnlocked, latestLesson, pickToday, practiceCards, type TodayInput } from './practicePlan'
import { fakeDrill } from '@/test/fakeDrill'

const open = fakeDrill({ id: 'open', order: 1 })
const keySig = fakeDrill({ id: 'key-sig', order: 2, unlockedBy: 'keys/key-signatures' })
const chords = fakeDrill({ id: 'chords', order: 3, unlockedBy: 'chords/triads' })
const drills = [open, keySig, chords]

const NOW = new Date(2026, 9, 5, 18, 0)
const daysAgo = (n: number) => new Date(2026, 9, 5 - n, 9, 0).toISOString()

describe('unlocks', () => {
  it('opens a drill with no unlock lesson from the start, and the others with their lesson', () => {
    const h = { done: { 'keys/key-signatures': {} }, lastPlayed: {} }
    expect([open, keySig, chords].map(d => isUnlocked(d, h))).toEqual([true, true, false])
  })

  it('opens a drill the reader has played, even with its lesson unfinished or not written yet', () => {
    expect(isUnlocked(chords, { done: {}, lastPlayed: { chords: daysAgo(1) } })).toBe(true)
  })

  it('lists open drills in order, marks a newly opened one until it is seen, and counts the rest', () => {
    const h = { done: { 'keys/key-signatures': {} }, lastPlayed: { open: daysAgo(1) } }
    const first = practiceCards(drills, h, [])
    expect(first.open.map(c => [c.drill.id, c.played, c.isNew])).toEqual([['open', true, false], ['key-sig', false, true]])
    expect(first.locked.map(d => d.id)).toEqual(['chords'])
    expect(practiceCards(drills, h, ['key-sig']).open[1].isNew).toBe(false)
  })

  it('never marks a drill open from the start as new', () => {
    expect(practiceCards([open], { done: {}, lastPlayed: {} }, []).open[0].isNew).toBe(false)
  })
})

describe('pickToday', () => {
  const base: TodayInput = {
    drills, history: { done: {}, lastPlayed: {} }, settings: { drills: {} },
    lastLesson: null, todayMinutes: 0, dailyGoal: 5, now: NOW,
  }

  it("gives a brand-new reader the first open drill: one gentle minute at level 1", () => {
    const pick = pickToday(base)!
    expect(pick.drill.id).toBe('open')
    expect(pick.preset).toEqual({ drill: 'open', level: 1, durationSec: 60, mode: 'a' })
    expect(pick.reason).toEqual({ kind: 'new' })
  })

  it("picks the last lesson's drill, at its level, until it is practised after that lesson", () => {
    const pick = pickToday({
      ...base, todayMinutes: 3,
      history: { done: { 'keys/key-signatures': {} }, lastPlayed: { open: daysAgo(3), 'key-sig': daysAgo(6) } },
      lastLesson: { key: 'keys/key-signatures', at: daysAgo(5), practice: { drill: 'key-sig', level: 2, durationSec: 60, mode: 'b' } },
    })!
    expect(pick.drill.id).toBe('key-sig')
    expect(pick.preset).toEqual({ drill: 'key-sig', level: 2, durationSec: 120, mode: 'b' })
    expect(pick.reason).toEqual({ kind: 'lesson', lesson: 'keys/key-signatures' })
  })

  it("moves on from the lesson's drill once it was practised after it, to the drill practised least recently", () => {
    const pick = pickToday({
      ...base, todayMinutes: 4,
      settings: { drills: { open: { level: 2, durationSec: 300, mode: 'c' } } },
      history: { done: { 'keys/key-signatures': {} }, lastPlayed: { 'key-sig': daysAgo(1), open: daysAgo(3) } },
      lastLesson: { key: 'keys/key-signatures', at: daysAgo(2), practice: { drill: 'key-sig', level: 2, durationSec: 60 } },
    })!
    expect(pick.drill.id).toBe('open')
    // The reader's own level and options; the length fills the one minute left, not their 5.
    expect(pick.preset).toEqual({ drill: 'open', level: 2, durationSec: 60, mode: 'c' })
    expect(pick.reason).toEqual({ kind: 'rest', days: 3 })
  })

  it('prefers a never-played open drill over one played before', () => {
    const pick = pickToday({ ...base, history: { done: { 'keys/key-signatures': {} }, lastPlayed: { open: daysAgo(9) } } })!
    expect(pick.drill.id).toBe('key-sig')
    expect(pick.reason.kind).toBe('new')
  })

  it('says so when every open drill was already practised today', () => {
    const pick = pickToday({ ...base, todayMinutes: 6, drills: [open], history: { done: {}, lastPlayed: { open: daysAgo(0) } } })!
    expect(pick.reason).toEqual({ kind: 'again' })
    expect(pick.preset.durationSec).toBe(60)
  })

  it('fills two minutes while two or more are left', () => {
    const h = { done: {}, lastPlayed: { open: daysAgo(1) } }
    expect(pickToday({ ...base, drills: [open], history: h, todayMinutes: 3 })!.preset.durationSec).toBe(120)
    expect(pickToday({ ...base, drills: [open], history: h, todayMinutes: 4 })!.preset.durationSec).toBe(60)
  })

  it('is null with no drill open', () => {
    expect(pickToday({ ...base, drills: [chords] })).toBeNull()
  })
})

describe('latestLesson', () => {
  it('finds the lesson finished last, by time not by order', () => {
    expect(latestLesson({ 'a/1': { at: daysAgo(1) }, 'a/2': { at: daysAgo(3) } })).toBe('a/1')
    expect(latestLesson({})).toBeNull()
  })
})
