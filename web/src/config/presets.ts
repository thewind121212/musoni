import type { Settings } from '../progress/progressStore'

/**
 * A preset sets the workout parameters only: what is being practised.
 *
 * Note naming and sound are deliberately absent. Those are personal
 * preferences, and a preset that flipped someone from Do Re Mi to C D E, or
 * turned their audio on in a quiet room, would feel broken rather than quick.
 */
export type WorkoutParams = Pick<Settings, 'level' | 'durationSec' | 'accidentals'>

export interface Preset extends WorkoutParams {
  id: 'warmup' | 'daily' | 'challenge'
}

export const PRESETS: readonly Preset[] = [
  { id: 'warmup', level: 1, durationSec: 30, accidentals: false },
  { id: 'daily', level: 2, durationSec: 60, accidentals: false },
  { id: 'challenge', level: 4, durationSec: 120, accidentals: true },
]

/** True when the current setup already is this preset, to the last parameter. */
export function matchesPreset(settings: WorkoutParams, preset: WorkoutParams): boolean {
  return settings.level === preset.level
    && settings.durationSec === preset.durationSec
    && settings.accidentals === preset.accidentals
}
