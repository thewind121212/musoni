import type { Clef, Letter, Accidental, Naming, Pitch } from '../../core/music/types'
import { parsePitch, diatonicIndex, pitchFromDiatonic, isExcluded, label } from '../../core/music/pitch'
import { LEVELS, ACCIDENTAL_CHANCE } from '../../config/constants'

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

export interface Question {
  pitch: Pitch
  clef: Clef
  options: NoteOption[]
  correctIndex: number
  /** Which spelling the black keys are showing for this question. */
  spelling: Exclude<Accidental, ''>
}

const LETTERS: Letter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

/** Natural keys carry 1..7; black keys carry the row above on a QWERTY board. */
const NATURAL_KEYS = ['1', '2', '3', '4', '5', '6', '7']
const ACCIDENTAL_KEYS = ['q', 'w', 'e', 'r', 't']

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

function pick<T>(arr: T[], rng: () => number): T { return arr[Math.floor(rng() * arr.length)] }

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
    keyHint: NATURAL_KEYS[i],
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
      keyHint: ACCIDENTAL_KEYS[i],
      row: 'accidental' as const,
      slot: i,
    }
  })
  return [...naturals, ...blacks]
}

export function generateQuestion(
  level: 1 | 2 | 3 | 4, accidentals: boolean, naming: Naming, rng: () => number = Math.random,
): Question {
  const pool = pick(LEVELS[level].pools, rng)
  const lo = diatonicIndex(parsePitch(pool.low))
  const hi = diatonicIndex(parsePitch(pool.high))
  const base = pitchFromDiatonic(lo + Math.floor(rng() * (hi - lo + 1)))

  let accidental: Accidental = ''
  if (accidentals && rng() < ACCIDENTAL_CHANCE) {
    const a: Accidental = rng() < 0.5 ? '#' : 'b'
    accidental = isExcluded(base.letter, a) ? (a === '#' ? 'b' : '#') : a
  }
  const pitch: Pitch = { ...base, accidental }

  // A natural question leaves the black keys spelled as sharps, the commoner
  // default; a printed accidental sets the row to its own spelling so the
  // answer is always present.
  const spelling: Exclude<Accidental, ''> = accidental === 'b' ? 'b' : '#'
  const options = buildOptions(naming, accidentals, spelling)
  const correctIndex = options.findIndex(
    o => o.letter === pitch.letter && o.accidental === pitch.accidental)

  return { pitch, clef: pool.clef, options, correctIndex, spelling }
}
