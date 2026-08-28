import { LEVELS, ACCIDENTALS_WEIGHT, POINTS_PER_CORRECT } from '../config/constants'

export function difficultyWeight(level: 1 | 2 | 3 | 4, accidentals: boolean): number {
  return LEVELS[level].weight * (accidentals ? ACCIDENTALS_WEIGHT : 1)
}
export function accuracy(correct: number, wrong: number): number {
  const total = correct + wrong
  return total === 0 ? 0 : correct / total
}
/**
 * A pace, not a total: correct answers **per minute**, weighted by difficulty
 * and multiplied by accuracy.
 *
 * Scoring the raw count would mean a longer session always wins, which makes
 * bests meaningless once any length can be chosen. Per-minute keeps a 30-second
 * sprint and a 10-minute session on the same scale, so the number answers "how
 * well did I read" and the practice-time chart answers "how much did I do".
 *
 * Multiplying by accuracy is what stops mashing: 50 answers at 60% scores below
 * 35 at 95%.
 */
export function practiceScore(
  correct: number, wrong: number, weight: number, durationSec: number,
): number {
  const minutes = durationSec / 60
  if (minutes <= 0) return 0
  return Math.round((correct / minutes) * POINTS_PER_CORRECT * weight * accuracy(correct, wrong))
}
