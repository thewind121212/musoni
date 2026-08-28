import type { Clef, Letter, Accidental, Naming, Pitch } from '../../core/music/types'
import { parsePitch, diatonicIndex, pitchFromDiatonic, isExcluded, label } from '../../core/music/pitch'
import { LEVELS, ACCIDENTAL_CHANCE, OPTION_COUNT_MIN, OPTION_COUNT_MAX } from '../../config/constants'

export interface NoteOption { label: string; letter: Letter; accidental: Accidental }
export interface Question { pitch: Pitch; clef: Clef; options: NoteOption[]; correctIndex: number }

const LETTERS: Letter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

function pick<T>(arr: T[], rng: () => number): T { return arr[Math.floor(rng() * arr.length)] }

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

  let options: NoteOption[]
  if (!accidentals) {
    options = LETTERS.map(l => ({ label: label(l, '', naming), letter: l, accidental: '' as Accidental }))
  } else {
    const seen = new Set<string>()
    const add = (l: Letter, a: Accidental, out: NoteOption[]) => {
      if (isExcluded(l, a)) return
      const lab = label(l, a, naming)
      if (!seen.has(lab)) { seen.add(lab); out.push({ label: lab, letter: l, accidental: a }) }
    }
    const correct: NoteOption[] = []
    add(pitch.letter, pitch.accidental, correct)
    // confusable neighbors: letters within ±2 diatonic steps, all accidental variants
    const candidates: NoteOption[] = []
    const li = LETTERS.indexOf(pitch.letter)
    for (const off of [-2, -1, 0, 1, 2]) {
      const l = LETTERS[(li + off + 7) % 7]
      for (const a of ['', '#', 'b'] as Accidental[]) add(l, a, candidates)
    }
    const target = OPTION_COUNT_MIN + Math.floor(rng() * (OPTION_COUNT_MAX - OPTION_COUNT_MIN + 1))
    while (correct.length < target && candidates.length > 0) {
      correct.push(candidates.splice(Math.floor(rng() * candidates.length), 1)[0])
    }
    options = correct
  }

  // shuffle (Fisher-Yates)
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1)); [options[i], options[j]] = [options[j], options[i]]
  }
  const correctIndex = options.findIndex(
    o => o.letter === pitch.letter && o.accidental === pitch.accidental)
  return { pitch, clef: pool.clef, options, correctIndex }
}
