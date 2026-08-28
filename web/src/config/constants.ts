import type { Clef } from '../core/music/types'

export const SESSION_SECONDS = 60
export const POINTS_PER_CORRECT = 10
export const ACCIDENTALS_WEIGHT = 1.4
export const ACCIDENTAL_CHANCE = 0.4
export const OPTION_COUNT_MIN = 7
export const OPTION_COUNT_MAX = 8
export const FEEDBACK_MS = 700

export const LEVELS: Record<1 | 2 | 3 | 4, { weight: number; pools: { clef: Clef; low: string; high: string }[] }> = {
  1: {
    weight: 1.0,
    pools: [{ clef: 'treble', low: 'E4', high: 'F5' }],
  },
  2: {
    weight: 1.3,
    pools: [{ clef: 'treble', low: 'A3', high: 'C6' }],
  },
  3: {
    weight: 1.5,
    pools: [{ clef: 'bass', low: 'G2', high: 'A3' }],
  },
  4: {
    weight: 1.8,
    pools: [
      { clef: 'treble', low: 'A3', high: 'C6' },
      { clef: 'bass', low: 'E2', high: 'E4' },
    ],
  },
}
