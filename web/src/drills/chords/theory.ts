import type { Accidental, Letter, Pitch } from '@/core/music/types'
import { diatonicStep } from '@/core/music/notation'

/*
 * Triads as written: spelled from their root by letter (a third is two
 * letters up, a fifth four), so A minor is A C E and never A B# E. Pure, no
 * config: the drill's levels pick from what this module can spell.
 *
 * The app's pitches carry one accidental at most, so a triad that would need
 * a double sharp or flat (D# major, Gb minor, Db diminished, B augmented) is
 * never spelled: `triadTones` returns null and the drill does not ask it.
 */

export type Quality = 'major' | 'minor' | 'dim' | 'aug'
/** In the order of the answer chips: Trưởng, Thứ, Giảm, Tăng. */
export const QUALITIES: readonly Quality[] = ['major', 'minor', 'dim', 'aug']

/** Which chord tone is in the bass: 0 root position, 1 first inversion (third), 2 second inversion (fifth). */
export type Inversion = 0 | 1 | 2

/** A note name with no octave: what the root is, and what the answer pad shows. */
export interface NoteName {
  letter: Letter
  accidental: Accidental
}

const LETTERS: readonly Letter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const SEMIS: Record<Letter, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const ALTER: Record<Accidental, number> = { '': 0, '#': 1, b: -1 }

/** Semitones from the root to the third and to the fifth. */
const SHAPE: Record<Quality, readonly [number, number]> = {
  major: [4, 7],
  minor: [3, 7],
  dim: [3, 6],
  aug: [4, 8],
}

/** Pitch class, 0 = C. */
export function pitchClass(n: NoteName): number {
  return (((SEMIS[n.letter] + ALTER[n.accidental]) % 12) + 12) % 12
}

export function sameName(a: NoteName, b: NoteName): boolean {
  return a.letter === b.letter && a.accidental === b.accidental
}

/**
 * The note `steps` letters above `from` and `semitones` above it, spelled on
 * that letter; null when the letter would need a double sharp or flat.
 */
export function spellAbove(from: NoteName, steps: number, semitones: number): NoteName | null {
  const letter = LETTERS[(LETTERS.indexOf(from.letter) + steps) % 7]
  let diff = (((pitchClass(from) + semitones - SEMIS[letter]) % 12) + 12) % 12
  if (diff > 6) diff -= 12
  if (diff === 0) return { letter, accidental: '' }
  if (diff === 1) return { letter, accidental: '#' }
  if (diff === -1) return { letter, accidental: 'b' }
  return null
}

/** Root, third and fifth, or null when one of them needs a double accidental. */
export function triadTones(root: NoteName, quality: Quality): [NoteName, NoteName, NoteName] | null {
  const [third, fifth] = SHAPE[quality]
  const t = spellAbove(root, 2, third)
  const f = spellAbove(root, 4, fifth)
  return t && f ? [root, t, f] : null
}

/** The quality of three tones stacked in thirds from the root, or null when they are not a triad. */
export function qualityOf(tones: readonly [NoteName, NoteName, NoteName]): Quality | null {
  const [r, t, f] = tones
  const up = (n: NoteName) => (pitchClass(n) - pitchClass(r) + 12) % 12
  const steps = (n: NoteName) => (LETTERS.indexOf(n.letter) - LETTERS.indexOf(r.letter) + 7) % 7
  if (steps(t) !== 2 || steps(f) !== 4) return null
  return QUALITIES.find(q => SHAPE[q][0] === up(t) && SHAPE[q][1] === up(f)) ?? null
}

/**
 * The roots the drill may ask: every key of the answer pad in either
 * spelling. E#, B#, Cb and Fb are left out: the pad has no such key, so a
 * chord on them could not be answered.
 */
export const ROOTS: readonly NoteName[] = [
  'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B',
].map(nameOf)

/** 'F#' → F sharp. Capitals only: 'b' after the letter is a flat. */
export function nameOf(text: string): NoteName {
  return { letter: text[0] as Letter, accidental: (text[1] ?? '') as Accidental }
}

/** F5, the staff's top line: no voiced note goes above it, so the treble staff never needs room above. */
export const TOP_STEP = diatonicStep({ letter: 'F', octave: 5 })

/**
 * The triad in close position on the treble staff, bass first. The bass sits
 * between C4 and B4; when the chord would then climb above the top line (an
 * inversion on a B), it drops an octave. So nothing is drawn above the staff,
 * and the staff never moves between questions.
 */
export function voice(tones: readonly [NoteName, NoteName, NoteName], inversion: Inversion): Pitch[] {
  const order = [0, 1, 2].map(i => tones[(i + inversion) % 3])
  const steps = [0]
  for (let i = 1; i < 3; i++) {
    const gap = (LETTERS.indexOf(order[i].letter) - LETTERS.indexOf(order[i - 1].letter) + 7) % 7
    steps.push(steps[i - 1] + gap)
  }
  let bass = diatonicStep({ letter: order[0].letter, octave: 4 })
  if (bass + steps[2] > TOP_STEP) bass -= 7
  return order.map((n, i) => {
    const step = bass + steps[i]
    return { letter: n.letter, accidental: n.accidental, octave: Math.floor(step / 7) }
  })
}

const SIGN: Record<Accidental, string> = { '': '', '#': '♯', b: '♭' }
const SUFFIX: Record<Quality, string> = { major: '', minor: 'm', dim: '°', aug: '+' }

/** A note name as a lead sheet writes it: letter and ♯ or ♭. */
export function symbolName(n: NoteName): string {
  return n.letter + SIGN[n.accidental]
}

/** The lead-sheet symbol: "C", "F♯m", "B°", "C+", and "Am/C" when another tone is in the bass. */
export function chordSymbol(root: NoteName, quality: Quality, bass?: NoteName): string {
  const symbol = symbolName(root) + SUFFIX[quality]
  return bass && !sameName(bass, root) ? `${symbol}/${symbolName(bass)}` : symbol
}

// ---------------------------------------------------------------- Roman numerals

export type KeyMode = 'major' | 'minor'

/** A key: its tonic and mode. */
export interface ChordKey {
  tonic: NoteName
  mode: KeyMode
}

/**
 * A key as config writes it: the tonic, a capital letter for major and a
 * small one for minor ('Bb' = B♭ major, 'f#' = F♯ minor).
 */
export function parseKey(text: string): ChordKey {
  const minor = text[0] === text[0].toLowerCase()
  return { tonic: nameOf(text[0].toUpperCase() + text.slice(1)), mode: minor ? 'minor' : 'major' }
}

const MAJOR_STEPS = [0, 2, 4, 5, 7, 9, 11]
const NATURAL_MINOR_STEPS = [0, 2, 3, 5, 7, 8, 10]

/** The numerals of the triads on each degree, in order. Minor uses the harmonic minor's V and vii°. */
export const NUMERALS: Record<KeyMode, readonly string[]> = {
  major: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
  minor: ['i', 'ii°', 'III', 'iv', 'V', 'VI', 'vii°'],
}

/** The scale degree (0 = tonic) as spelled in the key's natural scale. */
export function degreeName(key: ChordKey, degree: number): NoteName {
  const steps = key.mode === 'major' ? MAJOR_STEPS : NATURAL_MINOR_STEPS
  const n = spellAbove(key.tonic, degree, steps[degree])
  if (!n) throw new Error(`degree ${degree} of ${symbolName(key.tonic)} ${key.mode} needs a double accidental`)
  return n
}

/** The degree's triad: root, third, fifth. In minor, V and vii° raise the seventh degree (harmonic minor). */
export function diatonicTriad(key: ChordKey, degree: number): [NoteName, NoteName, NoteName] {
  const raised = key.mode === 'minor' && (degree === 4 || degree === 6)
  const tones = [0, 2, 4].map(i => {
    const d = (degree + i) % 7
    const n = degreeName(key, d)
    if (!(raised && d === 6)) return n
    const up = spellAbove(key.tonic, 6, 11)
    if (!up) throw new Error(`the leading tone of ${symbolName(key.tonic)} minor needs a double sharp`)
    return up
  })
  return tones as [NoteName, NoteName, NoteName]
}

/** Sharps (positive) or flats (negative) in the key signature. */
export function keyAccidentals(key: ChordKey): number {
  let count = 0
  for (let d = 0; d < 7; d++) count += ALTER[degreeName(key, d).accidental]
  return count
}

/** The key signature as the staff renderer writes it: 'G', 'Bb', 'F#m', 'Cm'. */
export function keySignatureSpec(key: ChordKey): string {
  return key.tonic.letter + key.tonic.accidental + (key.mode === 'minor' ? 'm' : '')
}
