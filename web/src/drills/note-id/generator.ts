import type { Clef, Accidental, Naming, Pitch } from '../../core/music/types'
import { parsePitch, diatonicIndex, pitchFromDiatonic, isExcluded } from '../../core/music/pitch'
import { buildOptions, type NoteOption } from '../../core/music/pianoKeys'
import { LEVELS, ACCIDENTAL_CHANCE } from '../../config/constants'

export interface Question {
  pitch: Pitch
  clef: Clef
  options: NoteOption[]
  correctIndex: number
  /** Which spelling the black keys are showing for this question. */
  spelling: Exclude<Accidental, ''>
}

function pick<T>(arr: T[], rng: () => number): T { return arr[Math.floor(rng() * arr.length)] }

/** Same letter, accidental and octave: the note a reader would see as a repeat. */
function samePitch(a: Pitch, b: Pitch): boolean {
  return a.letter === b.letter && a.accidental === b.accidental && a.octave === b.octave
}

/**
 * @param previous the note just asked, never asked twice in a row. Back-to-back
 * repeats read as a glitch and are answered from memory rather than from
 * reading, so they teach nothing.
 */
export function generateQuestion(
  level: 1 | 2 | 3 | 4,
  accidentals: boolean,
  naming: Naming,
  rng: () => number = Math.random,
  previous?: Pitch | null,
): Question {
  const pool = pick(LEVELS[level].pools, rng)
  const lo = diatonicIndex(parsePitch(pool.low))
  const hi = diatonicIndex(parsePitch(pool.high))
  // Redraw on a repeat. The pool always holds more than one note, so this
  // settles immediately; the cap only exists so a degenerate rng cannot hang.
  let pitch: Pitch = { letter: 'C', accidental: '', octave: 4 }
  for (let attempt = 0; attempt < 12; attempt++) {
    const base = pitchFromDiatonic(lo + Math.floor(rng() * (hi - lo + 1)))
    let accidental: Accidental = ''
    if (accidentals && rng() < ACCIDENTAL_CHANCE) {
      const a: Accidental = rng() < 0.5 ? '#' : 'b'
      accidental = isExcluded(base.letter, a) ? (a === '#' ? 'b' : '#') : a
    }
    pitch = { ...base, accidental }
    if (!previous || !samePitch(pitch, previous)) break
  }

  // A natural question leaves the black keys spelled as sharps, the commoner
  // default; a printed accidental sets the row to its own spelling so the
  // answer is always present.
  const spelling: Exclude<Accidental, ''> = pitch.accidental === 'b' ? 'b' : '#'
  const options = buildOptions(naming, accidentals, spelling)
  const correctIndex = options.findIndex(
    o => o.letter === pitch.letter && o.accidental === pitch.accidental)

  return { pitch, clef: pool.clef, options, correctIndex, spelling }
}
