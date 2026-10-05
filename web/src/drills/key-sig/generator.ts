import type { Clef, Naming, Pitch } from '@/core/music/types'
import type { NoteOption } from '@/core/music/pianoKeys'
import { midi, pitchFromMidi } from '@/core/music/pitch'
import type { SoundEvent } from '@/core/audio/playPitch'
import { KEY_SIG_CHORD_HOLD_SEC, KEY_SIG_LEVELS, KEY_SIG_MINOR_CHANCE, KEY_SIG_MISS_GAP_SEC } from '@/config/constants'
import type { KeySigLevel } from './strings'
import { keyPad, sameName, tonicOf, type Mode, type NoteName } from './signatures'

export interface KeySigQuestion {
  /** The signature: sharps (1 to 7), flats (-1 to -7), or 0 for none. */
  fifths: number
  /** Which key is asked for: the major, or (level 4) its relative minor. */
  mode: Mode
  clef: Clef
  /** The answer pad, spelled the key's way (see `keyPad`). */
  options: NoteOption[]
  /** The tonic's key on the pad. */
  correctIndex: number
}

function pick<T>(arr: readonly T[], rng: () => number): T { return arr[Math.floor(rng() * arr.length)] }

/** The signatures a level shows: up to its number of sharps or flats, and none (C major). */
export function signaturesFor(level: KeySigLevel): number[] {
  const max = KEY_SIG_LEVELS[level].maxAccidentals
  return Array.from({ length: 2 * max + 1 }, (_, i) => i - max)
}

/**
 * The next signature to read. Never the one just shown, in either mode or
 * clef: a repeat reads as a glitch and is answered from memory, not by
 * reading. At level 4 the question asks for the major or the relative minor
 * at random, so the reader has to read the question as well as the staff.
 *
 * @param previous the question just asked, or null at the start of a session.
 */
export function generateKeySigQuestion(
  level: KeySigLevel,
  naming: Naming,
  previous: Pick<KeySigQuestion, 'fifths'> | null,
  rng: () => number = Math.random,
): KeySigQuestion {
  const { clefs, minor } = KEY_SIG_LEVELS[level]
  const fifths = pick(signaturesFor(level).filter(f => f !== previous?.fifths), rng)
  const mode: Mode = minor && rng() < KEY_SIG_MINOR_CHANCE ? 'minor' : 'major'
  const clef = pick(clefs, rng)
  const options = keyPad(fifths, naming)
  const tonic = tonicOf(fifths, mode)
  return { fifths, mode, clef, options, correctIndex: options.findIndex(o => sameName(o, tonic)) }
}

/** A note name at octave 4, for playback (Cb4 sounds as B3). */
function at4(n: NoteName): Pitch {
  return { letter: n.letter, accidental: n.accidental, octave: 4 }
}

/**
 * A pad key's own sound, C4 to B4 left to right like the pad. A renamed white
 * key keeps its place: B# (on C) sounds C4, not C5; Cb (on B) sounds B4, not B3.
 */
function onPad(n: NoteName): Pitch {
  const m = midi(at4(n))
  return { ...at4(n), octave: m < 60 ? 5 : m > 71 ? 3 : 4 }
}

/** The key's home chord, root position from the tonic at octave 4. Spelling does not matter: it only sounds. */
export function homeChord(fifths: number, mode: Mode): Pitch[] {
  const root = midi(at4(tonicOf(fifths, mode)))
  return [0, mode === 'major' ? 4 : 3, 7].map(s => pitchFromMidi(root + s, '#'))
}

/**
 * What an answer plays. Right: the key's home chord, so the key is heard as
 * well as named. Wrong: the reader's note, then the home chord, so the miss
 * is heard against the key it should have been.
 */
export function answerSound(question: KeySigQuestion, chosenIndex: number): SoundEvent[] {
  const chord: SoundEvent = { pitches: homeChord(question.fifths, question.mode), at: 0, hold: KEY_SIG_CHORD_HOLD_SEC }
  if (chosenIndex === question.correctIndex) return [chord]
  return [
    { pitches: [onPad(question.options[chosenIndex])], at: 0, hold: KEY_SIG_MISS_GAP_SEC - 0.1 },
    { ...chord, at: KEY_SIG_MISS_GAP_SEC },
  ]
}
