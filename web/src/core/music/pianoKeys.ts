import type { Accidental, Letter, Naming } from './types'
import { label } from './pitch'

export interface NoteOption {
  label: string
  letter: Letter
  accidental: Accidental
  /** Keyboard shortcut for this key, shown where a physical keyboard is likely. */
  keyHint: string
  /**
   * Which piano row the key belongs to. Naturals are the white keys along the
   * bottom, accidentals the black keys above them.
   */
  row: 'natural' | 'accidental'
  /**
   * For accidentals, which gap between white keys it sits in (0 = C/D, 1 = D/E,
   * 2 = F/G, 3 = G/A, 4 = A/B). Naturals use their own left-to-right position.
   */
  slot: number
}

const LETTERS: Letter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

/** Marks a key hint that is typed with Shift: `⇧c` is Shift+C. */
export const SHIFT = '⇧'

/**
 * The computer key for a pad key is its note's letter: C to B on the white
 * keys, and Shift with the letter the black key is spelled with (Shift+C for
 * C#, Shift+D for Db on a row of flats). So typing answers with the name the
 * reader just read, whatever the naming shown on the keys.
 */
const keyFor = (letter: Letter, black: boolean) => (black ? SHIFT : '') + letter.toLowerCase()

/**
 * The five black keys, as the white key they sit above when spelled sharp and
 * the one they sit below when spelled flat. Slot order matches a piano: two
 * black keys, a gap where E meets F, then three.
 */
const BLACK_KEYS: { sharp: Letter; flat: Letter }[] = [
  { sharp: 'C', flat: 'D' },
  { sharp: 'D', flat: 'E' },
  { sharp: 'F', flat: 'G' },
  { sharp: 'G', flat: 'A' },
  { sharp: 'A', flat: 'B' },
]

/**
 * Builds the answer keys as a piano: the seven naturals always along the
 * bottom, and when accidentals are in play the five black keys above them.
 *
 * The keys never move between questions, so the pad becomes a layout to learn
 * rather than a set of choices to re-read each time. The black keys are spelled
 * to match the printed note, so a question printed with a flat is answered on a
 * row of flats.
 */
export function buildOptions(naming: Naming, accidentals: boolean, spelling: Exclude<Accidental, ''>): NoteOption[] {
  const naturals: NoteOption[] = LETTERS.map((letter, i) => ({
    label: label(letter, '', naming),
    letter,
    accidental: '' as Accidental,
    keyHint: keyFor(letter, false),
    row: 'natural' as const,
    slot: i,
  }))
  if (!accidentals) return naturals

  const blacks: NoteOption[] = BLACK_KEYS.map((key, i) => {
    const letter = spelling === '#' ? key.sharp : key.flat
    return {
      label: label(letter, spelling, naming),
      letter,
      accidental: spelling,
      keyHint: keyFor(letter, true),
      row: 'accidental' as const,
      slot: i,
    }
  })
  return [...naturals, ...blacks]
}
