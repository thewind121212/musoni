import type { Accidental, Letter, Naming } from '@/core/music/types'
import { buildOptions, type NoteOption } from '@/core/music/pianoKeys'
import { label } from '@/core/music/pitch'

/*
 * Key signatures as music theory writes them. A signature is its number of
 * sharps (1 to 7) or flats (-1 to -7), 0 for none: "fifths", since each sharp
 * moves the key up a fifth and each flat down one. Every name here is derived
 * from the order of sharps and flats; `signatures.test.ts` checks the result
 * against the standard table of all 15 keys.
 */

export type Mode = 'major' | 'minor'

/** A note name without an octave: a key's tonic, a sharp or flat in a signature. */
export interface NoteName {
  letter: Letter
  accidental: Accidental
}

/** The most sharps or flats a signature has. */
export const MAX_FIFTHS = 7

/** Sharps are written in this order (F C G D A E B), flats in its reverse. */
export const SHARP_ORDER: readonly Letter[] = ['F', 'C', 'G', 'D', 'A', 'E', 'B']
export const FLAT_ORDER: readonly Letter[] = ['B', 'E', 'A', 'D', 'G', 'C', 'F']

const LETTERS: readonly Letter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const SEMIS: Record<Letter, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const mod = (n: number, m: number) => ((n % m) + m) % m

/** The sharps or flats of a signature, in the order they are written. */
export function signatureNotes(fifths: number): NoteName[] {
  return fifths >= 0
    ? SHARP_ORDER.slice(0, fifths).map(letter => ({ letter, accidental: '#' as const }))
    : FLAT_ORDER.slice(0, -fifths).map(letter => ({ letter, accidental: 'b' as const }))
}

/** How a signature writes a letter: sharp, flat, or natural when it is not in the signature. */
function inSignature(fifths: number, letter: Letter): Accidental {
  return signatureNotes(fifths).some(n => n.letter === letter) ? (fifths > 0 ? '#' : 'b') : ''
}

/**
 * The key a signature stands for. The major tonic moves four letters (a fifth)
 * per sharp and back four per flat from C; the relative minor sits on the
 * major scale's sixth degree, five letters up (a minor third down). Its
 * accidental is whatever the signature gives that letter.
 */
export function tonicOf(fifths: number, mode: Mode): NoteName {
  const major = mod(4 * fifths, 7)
  const letter = LETTERS[mode === 'major' ? major : mod(major + 5, 7)]
  return { letter, accidental: inSignature(fifths, letter) }
}

/** The signature as VexFlow names it: its major key (`C`, `F#`, `Bb`, `Cb`). */
export function vexKeyName(fifths: number): string {
  const t = tonicOf(fifths, 'major')
  return t.letter + t.accidental
}

/**
 * The 12-key answer pad spelled the key's way: flats on the black keys for a
 * flat signature, sharps otherwise. A signature note that lands on a white key
 * renames it, as the key writes it: Cb (on B) and Fb (on E) in six and seven
 * flats, E# (on F) and B# (on C) in six and seven sharps. So every tonic is on
 * the pad under its own name: Cb major is answered on "Dob", never on "Si".
 * Those renamed keys show in their signatures whichever mode is asked, so they
 * give nothing away.
 */
export function keyPad(fifths: number, naming: Naming): NoteOption[] {
  const renamed = new Map<number, NoteName>()
  for (const n of signatureNotes(fifths)) {
    renamed.set(mod(SEMIS[n.letter] + (n.accidental === '#' ? 1 : -1), 12), n)
  }
  return buildOptions(naming, true, fifths < 0 ? 'b' : '#').map(o => {
    const as = o.row === 'natural' ? renamed.get(SEMIS[o.letter]) : undefined
    return as ? { ...o, letter: as.letter, accidental: as.accidental, label: label(as.letter, as.accidental, naming) } : o
  })
}

/**
 * The rule that finds a major key from its signature:
 * - none: C major;
 * - one flat: F major (the one flat key the next rule cannot reach);
 * - sharps: a half step above the last sharp;
 * - two flats or more: the second-to-last flat.
 */
export type MajorRule =
  | { kind: 'none' }
  | { kind: 'oneFlat' }
  | { kind: 'sharps'; count: number; last: NoteName }
  | { kind: 'flats'; count: number; penultimate: NoteName }

export function majorRule(fifths: number): MajorRule {
  const notes = signatureNotes(fifths)
  if (fifths === 0) return { kind: 'none' }
  if (fifths === -1) return { kind: 'oneFlat' }
  if (fifths > 0) return { kind: 'sharps', count: fifths, last: notes[notes.length - 1] }
  return { kind: 'flats', count: -fifths, penultimate: notes[notes.length - 2] }
}

/** Same note name: letter and accidental. */
export function sameName(a: NoteName, b: NoteName): boolean {
  return a.letter === b.letter && a.accidental === b.accidental
}
