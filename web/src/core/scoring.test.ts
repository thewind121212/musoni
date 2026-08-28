import { describe, it, expect } from 'vitest'
import { difficultyWeight, accuracy, practiceScore, enduranceBonus } from './scoring'

describe('scoring', () => {
  it('weights', () => {
    expect(difficultyWeight(1, false)).toBe(1.0)
    expect(difficultyWeight(4, false)).toBe(1.8)
    expect(difficultyWeight(4, true)).toBeCloseTo(2.52)
  })
  it('accuracy', () => {
    expect(accuracy(9, 1)).toBe(0.9)
    expect(accuracy(0, 0)).toBe(0)
  })
  it('over one minute the pace is just the weighted count', () =>
    // 38 * 10 * 2.1 * (38/42) = 722
    expect(practiceScore(38, 4, 2.1, 60)).toBe(722))

  it('is built on pace, so a faster reader wins at equal length', () => {
    expect(practiceScore(60, 0, 1, 60)).toBeGreaterThan(practiceScore(30, 0, 1, 60))
    expect(practiceScore(120, 0, 1, 120)).toBeGreaterThan(practiceScore(60, 0, 1, 120))
  })

  it('a much slower long session still loses', () => {
    const sprint = practiceScore(30, 0, 1, 60)     // 30 a minute
    const marathon = practiceScore(100, 0, 1, 600) // 10 a minute, a third of the pace
    expect(sprint).toBeGreaterThan(marathon)
  })

  it('guards a zero-length session', () =>
    expect(practiceScore(10, 0, 1, 0)).toBe(0))
  it('button-mash penalty: 50@60% < 35@95%', () =>
    expect(practiceScore(50, 33, 1, 60)).toBeLessThan(practiceScore(35, 2, 1, 60)))
})

describe('endurance', () => {
  const w = difficultyWeight(1, false)

  it('is neutral at one minute and grows per doubling', () => {
    expect(enduranceBonus(60)).toBe(1)
    expect(enduranceBonus(120)).toBeCloseTo(1.3)
    expect(enduranceBonus(240)).toBeCloseTo(1.6)
    expect(enduranceBonus(600)).toBeCloseTo(2.0)
  })

  it('floors short sessions rather than gutting them', () => {
    expect(enduranceBonus(30)).toBeGreaterThanOrEqual(0.6)
    expect(enduranceBonus(1)).toBeGreaterThanOrEqual(0.6)
  })

  it('rewards holding the same pace for longer', () => {
    const atPace = (sec: number) => practiceScore(30 * (sec / 60), 0, w, sec)
    expect(atPace(600)).toBeGreaterThan(atPace(300))
    expect(atPace(300)).toBeGreaterThan(atPace(120))
    expect(atPace(120)).toBeGreaterThan(atPace(60))
    expect(atPace(60)).toBeGreaterThan(atPace(30))
  })

  it('stops a short burst beating a long sustained session', () => {
    // The reason endurance exists: 30 seconds at double pace was out-scoring
    // ten minutes of holding a normal pace.
    const burst = practiceScore(30, 0, w, 30)    // 60 a minute, for 30 seconds
    const sustained = practiceScore(300, 0, w, 600) // 30 a minute, for ten minutes
    expect(sustained).toBeGreaterThan(burst)
  })

  it('does not let length alone win: half pace for ten times as long only ties', () => {
    const short = practiceScore(30, 0, w, 60)   // 30 a minute for one minute
    const long = practiceScore(150, 0, w, 600)  // 15 a minute for ten minutes
    expect(Math.abs(long - short)).toBeLessThan(short * 0.05)
  })
})
