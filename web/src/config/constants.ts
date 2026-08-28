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
 * Offered session lengths. One minute is an established convention for timed
 * note-naming (the "One-Minute Club" used in piano teaching) and two minutes
 * twice a day is a commonly taught drill pattern. Thirty seconds is not from
 * the literature: it exists so a day is never skipped for lack of time, since
 * the research is consistent that frequency beats session length.
 *
 * Any length is allowed beyond these, via the custom stepper. That is safe
 * because the score is a pace rather than a total (see core/scoring), so a
 * long session cannot out-rank a short one just by lasting longer.
 */
export const DURATIONS = [
  { seconds: 30, label: '30s' },
  { seconds: 60, label: '1 min' },
  { seconds: 120, label: '2 min' },
  { seconds: 300, label: '5 min' },
] as const

/** Bounds for the custom length stepper, in minutes. */
export const CUSTOM_MINUTES_MIN = 1
export const CUSTOM_MINUTES_MAX = 30

/**
 * Where the custom stepper opens. It must not be one of the offered lengths:
 * landing on a preset would make the custom option look broken, because the
 * stepper only shows when the chosen length is not already a preset.
 */
export const DEFAULT_CUSTOM_MINUTES = 10

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

/** True when a length is one of the offered presets. */
export function isPresetDuration(seconds: number): boolean {
  return DURATIONS.some(d => d.seconds === seconds)
}

/**
 * The length the custom stepper should open on.
 *
 * It must never be a preset. The stepper is only rendered when the chosen
 * length is not one of the offered four, so opening custom on the length
 * already selected left the stepper hidden and the option looking dead.
 */
export function customOpeningSeconds(currentSeconds: number): number {
  if (!isPresetDuration(currentSeconds)) return currentSeconds
  return DEFAULT_CUSTOM_MINUTES * 60
}
