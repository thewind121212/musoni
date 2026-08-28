import type { Clef } from '../core/music/types'

export const POINTS_PER_CORRECT = 10
export const ACCIDENTALS_WEIGHT = 1.4
export const ACCIDENTAL_CHANCE = 0.4
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

/**
 * Session lengths, from note-naming pedagogy rather than round numbers.
 *
 * One minute is an established convention for timed note-naming (the
 * "One-Minute Club" used in piano teaching), and "two minutes, twice a day" is
 * a commonly taught drill pattern. Thirty seconds is not from the literature: it
 * exists so a day never gets skipped for lack of time, since the research on
 * sight-reading is consistent that frequency matters more than session length.
 *
 * There is deliberately no five-minute option. Recommended daily sight-reading
 * practice totals roughly 5-15 minutes across everything, so a single
 * five-minute naming sprint crowds out the reading it is supposed to serve.
 */
export const DURATIONS = [
  { seconds: 30, label: '30s', note: 'Keep the streak' },
  { seconds: 60, label: '1 min', note: 'The standard drill' },
  { seconds: 120, label: '2 min', note: 'Twice a day' },
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
