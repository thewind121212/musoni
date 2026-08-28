import { describe, it, expect } from 'vitest'
import { difficultyWeight, accuracy, practiceScore } from './scoring'

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

  it('is a pace: the same rate scores the same at any length', () => {
    expect(practiceScore(40, 0, 1, 60)).toBe(practiceScore(80, 0, 1, 120))
    expect(practiceScore(40, 0, 1, 60)).toBe(practiceScore(400, 0, 1, 600))
  })

  it('a longer session cannot out-rank a better one', () => {
    const sprint = practiceScore(30, 0, 1, 60)     // 30 a minute
    const marathon = practiceScore(100, 0, 1, 600) // 10 a minute
    expect(sprint).toBeGreaterThan(marathon)
  })

  it('guards a zero-length session', () =>
    expect(practiceScore(10, 0, 1, 0)).toBe(0))
  it('button-mash penalty: 50@60% < 35@95%', () =>
    expect(practiceScore(50, 33, 1, 60)).toBeLessThan(practiceScore(35, 2, 1, 60)))
})
