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
  it('practiceScore: 38 correct, 4 wrong, weight 2.1 → 718', () =>
    expect(practiceScore(38, 4, 2.1)).toBe(722)) // 38*10*2.1*(38/42)=722.0 — data-model example rounded loosely; 722 is the exact value
  it('button-mash penalty: 50@60% < 35@95%', () =>
    expect(practiceScore(50, 33, 1)).toBeLessThan(practiceScore(35, 2, 1)))
})
