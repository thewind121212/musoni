import { LEVELS, ACCIDENTALS_WEIGHT, POINTS_PER_CORRECT } from '../config/constants'

export function difficultyWeight(level: 1 | 2 | 3 | 4, accidentals: boolean): number {
  return LEVELS[level].weight * (accidentals ? ACCIDENTALS_WEIGHT : 1)
}
export function accuracy(correct: number, wrong: number): number {
  const total = correct + wrong
  return total === 0 ? 0 : correct / total
}
export function practiceScore(correct: number, wrong: number, weight: number): number {
  return Math.round(correct * POINTS_PER_CORRECT * weight * accuracy(correct, wrong))
}
