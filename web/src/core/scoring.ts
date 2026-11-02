import {
  LEVELS, ACCIDENTALS_WEIGHT, POINTS_PER_CORRECT,
  ENDURANCE_PER_DOUBLING, MIN_ENDURANCE_BONUS,
} from '../config/constants'

export function difficultyWeight(level: 1 | 2 | 3 | 4, accidentals: boolean): number {
  return LEVELS[level].weight * (accidentals ? ACCIDENTALS_WEIGHT : 1)
}
export function accuracy(correct: number, wrong: number): number {
  const total = correct + wrong
  return total === 0 ? 0 : correct / total
}
/**
 * How much a session's length is worth, as a multiplier.
 *
 * One minute is the baseline at 1.0. Each doubling adds
 * ENDURANCE_PER_DOUBLING, so the curve rewards sitting with the drill without
 * letting length dominate the way a raw total would.
 */
export function enduranceBonus(durationSec: number): number {
  const minutes = durationSec / 60
  if (minutes <= 0) return 0
  return Math.max(MIN_ENDURANCE_BONUS, 1 + ENDURANCE_PER_DOUBLING * Math.log2(minutes))
}

/**
 * Pace, difficulty, accuracy and endurance in one number.
 *
 * Pace (correct per minute) rather than a raw count, so length alone cannot buy
 * a score and bests stay comparable across any duration. Accuracy multiplies in,
 * which is what stops mashing: 50 answers at 60% scores below 35 at 95%.
 * Endurance then pays back the concentration a longer session actually costs.
 */
export function practiceScore(
  correct: number, wrong: number, weight: number, durationSec: number,
): number {
  const minutes = durationSec / 60
  if (minutes <= 0) return 0
  const pace = correct / minutes
  return Math.round(
    pace * POINTS_PER_CORRECT * weight * accuracy(correct, wrong) * enduranceBonus(durationSec),
  )
}
