import type { Naming, Pitch } from '../../core/music/types'
import { buildOptions, type NoteOption } from '../../core/music/pianoKeys'
import { cadence, keySpelling, noteInKey, tonicOf, walkHome, type KeyName } from '../../core/music/keys'
import { midi } from '../../core/music/pitch'
import type { SoundEvent } from '../../core/audio/playPitch'
import {
  EAR_LEVELS, EAR_KEY_BLOCK, EAR_CADENCE_STEP_SEC, EAR_CADENCE_HOLD_SEC, EAR_AFTER_CADENCE_SEC,
  EAR_NOTE_HOLD_SEC, EAR_NOTE_LEAD_SEC, EAR_WALK_STEP_SEC, EAR_MISS_GAP_SEC,
} from '../../config/constants'

export type EarLevel = 1 | 2 | 3 | 4

export interface EarQuestion {
  key: KeyName
  /** Semitones above the tonic: which note of the key this is. */
  semitones: number
  /** The note that plays, and is revealed on the staff once answered. */
  pitch: Pitch
  /** The answer pad, its black keys spelled the key's way. */
  options: NoteOption[]
  correctIndex: number
  /** The key's home note on the pad, marked as a landmark. */
  tonicIndex: number
  /** First question in its key: the cadence plays before the note. */
  newKey: boolean
  /** First question, or a different key from the last one: the "new key" badge. */
  keyChanged: boolean
}

function pick<T>(arr: readonly T[], rng: () => number): T { return arr[Math.floor(rng() * arr.length)] }

function indexOf(options: NoteOption[], p: Pitch) {
  return options.findIndex(o => o.letter === p.letter && o.accidental === p.accidental)
}

/**
 * The next note to find by ear.
 *
 * The key holds for `EAR_KEY_BLOCK` questions, then moves to another of the
 * level's keys (never the same one twice running), and the cadence plays
 * again. Within a key the same note never comes twice in a row: a repeat is
 * answered from memory of the last sound, not by hearing it in the key.
 *
 * `keyChanged` says the key really moved (the badge); `newKey` says a block
 * starts (the cadence), which in one key is a refresher.
 *
 * @param previous the question just asked and how many questions its key has
 *   had so far (it included), or null at the start of a session.
 */
export function generateEarQuestion(
  level: EarLevel,
  naming: Naming,
  previous: (Pick<EarQuestion, 'key' | 'semitones'> & { inKey: number }) | null,
  rng: () => number = Math.random,
  opts: { oneKey?: boolean } = {},
): EarQuestion {
  const { notes, blackKeys } = EAR_LEVELS[level]
  // The "stay in one key" aid: C at every level. Off by default, since a key
  // that never moves drifts toward memorising pitches.
  const keys: readonly KeyName[] = opts.oneKey ? ['C'] : EAR_LEVELS[level].keys
  const newKey = !previous || previous.inKey >= EAR_KEY_BLOCK || !keys.includes(previous.key)
  let key = previous?.key ?? pick(keys, rng)
  if (newKey && previous) {
    const others = keys.filter(k => k !== previous.key)
    key = others.length > 0 ? pick(others, rng) : keys[0]
  }

  const repeatable = newKey || !previous
  let semitones = pick(notes, rng)
  for (let attempt = 0; attempt < 12 && !repeatable && semitones === previous.semitones; attempt++) {
    semitones = pick(notes, rng)
  }

  const pitch = noteInKey(key, semitones)
  const options = buildOptions(naming, blackKeys, keySpelling(key))
  return {
    key, semitones, pitch, options,
    correctIndex: indexOf(options, pitch),
    tonicIndex: indexOf(options, tonicOf(key)),
    newKey,
    keyChanged: !previous || previous.key !== key,
  }
}

/**
 * What a question plays: the cadence first when the key is new (or the reader
 * asked to hear it again), then the note. `noteAt` is when the note sounds,
 * which is when the answer clock starts.
 */
export function questionSound(question: EarQuestion, withCadence: boolean): { events: SoundEvent[]; noteAt: number } {
  if (!withCadence) {
    return {
      events: [{ pitches: [question.pitch], at: EAR_NOTE_LEAD_SEC, hold: EAR_NOTE_HOLD_SEC }],
      noteAt: EAR_NOTE_LEAD_SEC,
    }
  }
  const chords = cadence(question.key)
  const events: SoundEvent[] = chords.map((pitches, i) => ({
    pitches, at: i * EAR_CADENCE_STEP_SEC, hold: EAR_CADENCE_HOLD_SEC,
  }))
  const noteAt = (chords.length - 1) * EAR_CADENCE_STEP_SEC + EAR_CADENCE_HOLD_SEC + EAR_AFTER_CADENCE_SEC
  events.push({ pitches: [question.pitch], at: noteAt, hold: EAR_NOTE_HOLD_SEC })
  return { events, noteAt }
}

/**
 * What an answer plays. Right: the note walks home to the tonic, so the ear
 * hears where it sits in the key. Wrong: the reader's note, then the right
 * one, so the gap between them is heard and not just shown.
 */
export function answerSound(question: EarQuestion, chosen: Pitch | null): SoundEvent[] {
  if (chosen === null) {
    return walkHome(question.key, question.semitones).map((p, i) => ({
      pitches: [p], at: i * EAR_WALK_STEP_SEC, hold: EAR_WALK_STEP_SEC,
    }))
  }
  return [
    { pitches: [chosen], at: 0, hold: EAR_MISS_GAP_SEC - 0.1 },
    { pitches: [question.pitch], at: EAR_MISS_GAP_SEC, hold: EAR_NOTE_HOLD_SEC },
  ]
}

/** A key name on the pad (no octave) placed in the octave of the note it was picked against. */
export function chosenPitch(question: EarQuestion, index: number): Pitch {
  const option = question.options[index]
  const target = midi(question.pitch)
  // The same name within six semitones of the note: the octave the reader meant.
  for (const octave of [question.pitch.octave - 1, question.pitch.octave, question.pitch.octave + 1]) {
    const p: Pitch = { letter: option.letter, accidental: option.accidental, octave }
    if (Math.abs(midi(p) - target) <= 6) return p
  }
  return { letter: option.letter, accidental: option.accidental, octave: question.pitch.octave }
}
