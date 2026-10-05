import type { Accidental, Naming, Pitch } from '@/core/music/types'
import { buildOptions, type NoteOption } from '@/core/music/pianoKeys'
import { midi, pitchFromMidi } from '@/core/music/pitch'
import type { SoundEvent } from '@/core/audio/playPitch'
import {
  CHORD_HOLD_SEC, CHORD_LEVELS, CHORD_MISS_GAP_SEC, CHORD_ROMAN_FROM, CHORD_ROMAN_KEY_BLOCK, type ChordLevelNumber,
} from '@/config/constants'
import {
  NUMERALS, ROOTS, chordSymbol, diatonicTriad, keySignatureSpec, parseKey, pitchClass, qualityOf, sameName,
  triadTones, voice, type ChordKey, type Inversion, type NoteName, type Quality,
} from './theory'

export type ChordLevel = ChordLevelNumber

/** What every question has: the chord as written and as sounded. */
interface Chord {
  root: NoteName
  quality: Quality
  inversion: Inversion
  /** Voiced bottom to top, as drawn on the staff and played. */
  notes: Pitch[]
  /** Lead-sheet symbol: "Am/C". */
  symbol: string
}

/** Levels 1-4: name the chord by its root (on the pad) and quality (a chip). */
export interface NameQuestion extends Chord {
  kind: 'name'
  /** The answer pad, its black keys spelled the chord's way. */
  options: NoteOption[]
  /** The root's key on the pad. */
  correctIndex: number
  /** The quality chips this level uses; the rest are disabled. */
  qualities: readonly Quality[]
  /** The level has inversions, so the name says "root position" too. */
  inversions: boolean
}

/** Levels 5-7: the key is named and its signature drawn; tap the chord's numeral. */
export interface RomanQuestion extends Chord {
  kind: 'roman'
  /** As config writes it ('Bb', 'f#'). */
  key: string
  /** The key signature for the staff ('Bb', 'F#m'). */
  keySignature: string
  /** 0 = I (or i), 6 = vii°. */
  degree: number
  /** The key's seven numerals, in order. */
  numerals: readonly string[]
  /** Questions asked in this key, this one included. */
  inKey: number
}

export type ChordQuestion = NameQuestion | RomanQuestion

/** A reader's answer: a root key and a quality, or a numeral. */
export type ChordAnswer = { root: number; quality: Quality } | { degree: number }

export function isRoman(level: number): boolean {
  return level >= CHORD_ROMAN_FROM
}

/** One chord a name level may ask, and how likely it is. */
export interface ChordSpec {
  root: NoteName
  quality: Quality
  inversion: Inversion
  weight: number
}

const C_MAJOR = parseKey('C')

/**
 * Every chord a name level (1-4) asks, with its weight. Level 1: the seven
 * triads of C major. From level 2: each of the level's qualities equally
 * often, spread evenly over every root that spells it with single
 * accidentals, and at level 4 over root position and both inversions.
 * Augmented triads stay in root position: the triad is symmetric, so an
 * inverted one reads as another augmented triad respelled.
 */
export function namePool(level: ChordLevel): ChordSpec[] {
  const cfg = CHORD_LEVELS[level]
  if (cfg.mode !== 'name') return []
  if (cfg.roots === 'c-major') {
    return [0, 1, 2, 3, 4, 5, 6].map(d => {
      const tones = diatonicTriad(C_MAJOR, d)
      return { root: tones[0], quality: qualityOf(tones)!, inversion: 0, weight: 1 }
    })
  }
  const qualities = cfg.qualities ?? []
  return qualities.flatMap(quality => {
    const roots = ROOTS.filter(r => triadTones(r, quality) !== null)
    const inversions: Inversion[] = cfg.inversions && quality !== 'aug' ? [0, 1, 2] : [0]
    const weight = 1 / (qualities.length * roots.length * inversions.length)
    return roots.flatMap(root => inversions.map(inversion => ({ root, quality, inversion, weight })))
  })
}

function pickWeighted<T extends { weight: number }>(items: readonly T[], rng: () => number): T {
  const total = items.reduce((s, i) => s + i.weight, 0)
  let r = rng() * total
  for (const item of items) {
    r -= item.weight
    if (r < 0) return item
  }
  return items[items.length - 1]
}

function pick<T>(items: readonly T[], rng: () => number): T {
  return items[Math.min(items.length - 1, Math.floor(rng() * items.length))]
}

/**
 * Sharps or flats on the pad's black keys: the root's own accidental, or
 * flats when the chord has one (F minor: A♭), else sharps.
 */
export function padSpelling(tones: readonly NoteName[]): Exclude<Accidental, ''> {
  const root = tones[0].accidental
  if (root) return root
  return tones.some(t => t.accidental === 'b') ? 'b' : '#'
}

function chord(root: NoteName, quality: Quality, inversion: Inversion, tones: [NoteName, NoteName, NoteName]): Chord {
  return { root, quality, inversion, notes: voice(tones, inversion), symbol: chordSymbol(root, quality, tones[inversion]) }
}

/** The question for one chord of a name level's pool. */
export function nameQuestion(level: ChordLevel, naming: Naming, spec: ChordSpec): NameQuestion {
  const cfg = CHORD_LEVELS[level]
  const tones = triadTones(spec.root, spec.quality)!
  const options = buildOptions(naming, cfg.blackKeys ?? false, padSpelling(tones))
  return {
    kind: 'name',
    ...chord(spec.root, spec.quality, spec.inversion, tones),
    options,
    correctIndex: options.findIndex(o => sameName(o, spec.root)),
    qualities: cfg.qualities ?? [],
    inversions: cfg.inversions ?? false,
  }
}

/** The question for one degree of a key. */
export function romanQuestion(key: string, degree: number, inKey: number): RomanQuestion {
  const k: ChordKey = parseKey(key)
  const tones = diatonicTriad(k, degree)
  return {
    kind: 'roman',
    ...chord(tones[0], qualityOf(tones)!, 0, tones),
    key, keySignature: keySignatureSpec(k), degree, numerals: NUMERALS[k.mode], inKey,
  }
}

/**
 * The next chord to read. Never the same chord twice in a row (a repeat is
 * answered from memory of the last one, not by reading).
 *
 * Name levels draw from `namePool`. Roman levels hold a key for
 * `CHORD_ROMAN_KEY_BLOCK` questions, then move to another of the level's
 * keys; within a key the same degree never comes twice running.
 *
 * @param previous the question just asked, or null at the start of a session.
 */
export function generateChordQuestion(
  level: ChordLevel,
  naming: Naming,
  previous: ChordQuestion | null,
  rng: () => number = Math.random,
): ChordQuestion {
  if (!isRoman(level)) {
    const pool = namePool(level)
    const fresh = previous?.kind === 'name'
      ? pool.filter(s => !(sameName(s.root, previous.root) && s.quality === previous.quality && s.inversion === previous.inversion))
      : pool
    return nameQuestion(level, naming, pickWeighted(fresh.length > 0 ? fresh : pool, rng))
  }

  const keys = CHORD_LEVELS[level].keys ?? []
  const last = previous?.kind === 'roman' ? previous : null
  const stay = last !== null && last.inKey < CHORD_ROMAN_KEY_BLOCK && keys.includes(last.key)
  if (stay) {
    const degrees = [0, 1, 2, 3, 4, 5, 6].filter(d => d !== last.degree)
    return romanQuestion(last.key, pick(degrees, rng), last.inKey + 1)
  }
  const others = keys.filter(k => k !== last?.key)
  const key = pick(others.length > 0 ? others : keys, rng)
  return romanQuestion(key, pick([0, 1, 2, 3, 4, 5, 6], rng), 1)
}

/** Whether an answer names the question's chord. */
export function isRight(q: ChordQuestion, a: ChordAnswer): boolean {
  if (q.kind === 'roman') return 'degree' in a && a.degree === q.degree
  return 'root' in a && a.root === q.correctIndex && a.quality === q.quality
}

const SHAPE: Record<Quality, readonly number[]> = { major: [0, 4, 7], minor: [0, 3, 7], dim: [0, 3, 6], aug: [0, 4, 8] }

/**
 * The chord the reader named, voiced near the question's, for hearing the
 * difference. Only its sound matters, so it is spelled plainly. Null when the
 * answer is the right one.
 */
export function chosenChord(q: ChordQuestion, a: ChordAnswer): Pitch[] | null {
  if (isRight(q, a)) return null
  if (q.kind === 'roman') {
    if (!('degree' in a)) return null
    return voice(diatonicTriad(parseKey(q.key), a.degree), 0)
  }
  if (!('root' in a)) return null
  const option = q.options[a.root]
  // Root position, its root as close as can be to the question's root.
  const anchor = midi(q.notes.find(n => sameName(n, q.root))!)
  const root = anchor + ((((pitchClass(option) - anchor) % 12) + 18) % 12) - 6
  const spelling = option.accidental === 'b' ? 'b' : '#'
  return SHAPE[a.quality].map(s => pitchFromMidi(root + s, spelling))
}

/**
 * What an answer plays when listening is on. Right: the chord. Wrong: the
 * chord the reader named, then the right one, so the difference is heard.
 */
export function answerSound(q: ChordQuestion, chosen: Pitch[] | null): SoundEvent[] {
  if (!chosen) return [{ pitches: q.notes, at: 0, hold: CHORD_HOLD_SEC }]
  return [
    { pitches: chosen, at: 0, hold: CHORD_MISS_GAP_SEC - 0.1 },
    { pitches: q.notes, at: CHORD_MISS_GAP_SEC, hold: CHORD_HOLD_SEC },
  ]
}
