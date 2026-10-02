import type { Clef } from '../core/music/types'
import type { KeyName } from '../core/music/keys'

export const POINTS_PER_CORRECT = 10
export const ACCIDENTALS_WEIGHT = 1.4

/**
 * Endurance reward, applied per doubling of session length.
 *
 * Holding concentration for ten minutes is harder than for thirty seconds, and
 * a pure pace score not only ignores that, it penalises it: fatigue drags the
 * average down, so a short burst would out-score a long sustained session.
 *
 * The reward is logarithmic rather than linear, so each doubling adds the same
 * modest amount and long sessions cannot run away with the scoreboard the way
 * a raw total would. At 0.3 a doubling is worth 30%, so ten minutes is worth
 * twice one minute at the same pace, and a ten-minute session at half pace ties
 * a one-minute session at full pace.
 */
export const ENDURANCE_PER_DOUBLING = 0.3

/** Floor for very short sessions, so a 30-second drill still counts properly. */
export const MIN_ENDURANCE_BONUS = 0.6
export const ACCIDENTAL_CHANCE = 0.4
/**
 * A correct answer flashes and moves on; a miss holds long enough to read the
 * staff and see where the note actually was. Dwelling on answers the reader
 * already knows is what made the drill feel slow.
 */
export const FEEDBACK_CORRECT_MS = 260
export const FEEDBACK_WRONG_MS = 1100

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

/**
 * Minutes a day the home ring fills toward. Small on purpose: the research the
 * lengths above lean on says frequency beats session length, so the goal asks
 * for a habit (two or three short sessions), not a long sit.
 */
export const DAILY_GOAL_MINUTES = 5

/** Level descriptions shown in setup. */
export const LEVEL_INFO: Record<1 | 2 | 3 | 4, { name: string; detail: string }> = {
  1: { name: 'Treble', detail: 'On the staff only' },
  2: { name: 'Treble +', detail: 'Adds ledger lines' },
  3: { name: 'Bass', detail: 'Bass clef range' },
  4: { name: 'Both', detail: 'Treble and bass mixed' },
}

/**
 * Notation units across the drill's staff. Narrower than the Staff default
 * draws the same note larger once it is scaled to the screen width, while
 * leaving room for a wrong pick beside the answer.
 */
export const QUESTION_STAFF_WIDTH = 220

/** Result screen: how many distinct missed notes to show, and their staff width. */
export const MISSED_NOTES_SHOWN = 6
export const MISSED_NOTE_STAFF_WIDTH = 120

/** Drill clock resolution. */
export const TICK_MS = 200
/** A loading screen stays invisible this long, so a quick (cached) load never flashes it. */
export const LOADING_SHOW_AFTER_MS = 150
/** Pitch playback. */
export const AUDIO_GAIN = 0.25
export const AUDIO_DURATION_SEC = 0.4

/**
 * Sampled piano. One recording every minor third, so no note is shifted more
 * than a semitone from a real recording, which keeps the timbre
 * honest while the whole set stays near 260 kB. Covers every note the levels
 * can print (E2 to C6, plus accidentals). Source and licence:
 * public/audio/piano/LICENSE.md.
 */
export const PIANO_SAMPLE_URL = `${import.meta.env.BASE_URL}audio/piano/`
export const PIANO_SAMPLES = [
  'D#2', 'F#2', 'A2', 'C3', 'D#3', 'F#3', 'A3', 'C4',
  'D#4', 'F#4', 'A4', 'C5', 'D#5', 'F#5', 'A5', 'C6',
] as const
export const PIANO_GAIN = 0.9
/** How long a note rings before its release starts. */
export const PIANO_HOLD_SEC = 1.2
export const PIANO_RELEASE_SEC = 0.3

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

/*
 * Nghe & Đàn (hear and play). Notes are semitones above the key's tonic.
 *
 * L1 is the home chord in C, three notes far apart. L2 is the lower half of
 * the scale and already moves between keys: hearing a note by where it sits
 * in a key, not by its pitch, is the whole skill, and a key that never moves
 * drifts toward memorising pitches. L3 is the full scale in more keys; L4
 * adds the five notes outside the scale. Black keys are answers from L2 on,
 * since G and F major already need one.
 */
export const EAR_LEVELS: Record<1 | 2 | 3 | 4, {
  weight: number
  notes: readonly number[]
  keys: readonly KeyName[]
  blackKeys: boolean
}> = {
  1: { weight: 1.0, notes: [0, 4, 7], keys: ['C'], blackKeys: false },
  2: { weight: 1.3, notes: [0, 2, 4, 5, 7], keys: ['C', 'G', 'F'], blackKeys: true },
  3: { weight: 1.6, notes: [0, 2, 4, 5, 7, 9, 11], keys: ['C', 'G', 'F', 'D', 'Bb'], blackKeys: true },
  4: {
    weight: 2.0,
    notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    keys: ['C', 'G', 'F', 'D', 'Bb', 'A', 'Eb'],
    blackKeys: true,
  },
}

/**
 * Questions per key before it changes. The cadence plays when a key starts
 * (and on replay), not before every note: long enough in one key for the ear
 * to settle, short enough that it never gets used to one.
 */
export const EAR_KEY_BLOCK = 6

/** The cadence: chord spacing and length, then the pause before the note. */
export const EAR_CADENCE_STEP_SEC = 0.55
export const EAR_CADENCE_HOLD_SEC = 0.45
export const EAR_AFTER_CADENCE_SEC = 0.45
/** How long the note to find rings. */
export const EAR_NOTE_HOLD_SEC = 1
/** A small gap before a note with no cadence, so it never clips the last sound. */
export const EAR_NOTE_LEAD_SEC = 0.15
/** A right answer walks home to the tonic, one note per step. */
export const EAR_WALK_STEP_SEC = 0.28
/** On a miss: the reader's note, then the right one this long after. */
export const EAR_MISS_GAP_SEC = 0.75

/**
 * Feedback holds. A right answer stays long enough to hear it walk home; a
 * miss long enough to hear both notes and see them on the staff.
 */
export const EAR_FEEDBACK_CORRECT_MS = 1200
export const EAR_FEEDBACK_WRONG_MS = 2400

/** Hearing takes longer than reading, so a session opens on two minutes. */
export const EAR_DEFAULT_DURATION_SECONDS = 120

