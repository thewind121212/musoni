import type { Clef } from '../core/music/types'

export const POINTS_PER_CORRECT = 10
export const ACCIDENTALS_WEIGHT = 1.4
export const ACCIDENTAL_CHANCE = 0.4
export const OPTION_COUNT_MIN = 8
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

/** Session lengths the user can pick in the drill setup phase. */
export const DURATIONS = [
  { seconds: 30, label: '30s', note: 'Quick check' },
  { seconds: 60, label: '1 min', note: 'Daily default' },
  { seconds: 120, label: '2 min', note: 'Focused set' },
  { seconds: 300, label: '5 min', note: 'Deep practice' },
] as const

export const DEFAULT_DURATION_SECONDS = 60

/** Level descriptions shown in setup. */
export const LEVEL_INFO: Record<1 | 2 | 3 | 4, { name: string; detail: string }> = {
  1: { name: 'Treble', detail: 'On the staff only' },
  2: { name: 'Treble +', detail: 'Adds ledger lines' },
  3: { name: 'Bass', detail: 'Bass clef range' },
  4: { name: 'Both', detail: 'Treble and bass mixed' },
}

/** Drill clock resolution. */
export const TICK_MS = 200
/** Pitch playback. */
export const AUDIO_GAIN = 0.25
export const AUDIO_DURATION_SEC = 0.4
