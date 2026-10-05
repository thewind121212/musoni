import type { Accidental, Pitch } from '@/core/music/types'
import { diatonicIndex, isExcluded, parsePitch, pitchFromDiatonic } from '@/core/music/pitch'
import type { SoundEvent } from '@/core/audio/playPitch'
import {
  INTERVAL_AUG_DIM_SHARE, INTERVAL_HARMONIC_SHARE, INTERVAL_LEVELS, INTERVAL_PLAY, INTERVAL_RANGE,
} from '@/config/constants'
import { SIZES, intervalBetween, intervalId, type Interval } from './interval'

export type IntervalLevel = 1 | 2 | 3 | 4
export type IntervalClef = 'treble' | 'bass'
/** Side by side, lower note first (melodic), or stacked (harmonic). */
export type Layout = 'melodic' | 'harmonic'

/** Two notes and the interval between them. */
export interface Spelling {
  clef: IntervalClef
  lower: Pitch
  upper: Pitch
  interval: Interval
}

export interface IntervalQuestion extends Spelling {
  layout: Layout
}

const PLAIN = new Set(['M', 'm', 'P'])

/** What a level accepts as the answer: the size alone at level 1, else the interval ("m6"). */
export function answerKey(level: IntervalLevel, interval: Interval): string {
  return level === 1 ? String(interval.size) : intervalId(interval)
}

/** Whether a level asks this interval. Level 1 asks any (its notes are white keys, its answer the size). */
function asks(level: IntervalLevel, interval: Interval): boolean {
  if (level === 1) return true
  if (PLAIN.has(interval.quality)) return true
  return INTERVAL_LEVELS[level].augDim.includes(intervalId(interval))
}

const pools = new Map<IntervalLevel, Map<string, Spelling[]>>()

/**
 * Every question a level can ask, by answer: each pair of notes in the
 * level's clefs and range (`INTERVAL_RANGE`, by letter), with a sharp or flat
 * on either note from level 3, whose interval the level asks. Neither note is
 * ever spelled E♯, B♯, C♭ or F♭, and no note carries a double sharp or flat.
 * Built once per level.
 */
export function levelPool(level: IntervalLevel): ReadonlyMap<string, readonly Spelling[]> {
  const cached = pools.get(level)
  if (cached) return cached
  const { clefs, accidentals } = INTERVAL_LEVELS[level]
  const marks: Accidental[] = accidentals ? ['', '#', 'b'] : ['']
  const pool = new Map<string, Spelling[]>()
  for (const clef of clefs) {
    const low = diatonicIndex(parsePitch(INTERVAL_RANGE[clef].low))
    const high = diatonicIndex(parsePitch(INTERVAL_RANGE[clef].high))
    for (let at = low; at <= high; at++) {
      for (const mark of marks) {
        const lower = { ...pitchFromDiatonic(at), accidental: mark }
        if (isExcluded(lower.letter, mark)) continue
        for (const size of SIZES) {
          if (at + size - 1 > high) break
          for (const upperMark of marks) {
            const upper = { ...pitchFromDiatonic(at + size - 1), accidental: upperMark }
            if (isExcluded(upper.letter, upperMark)) continue
            const interval = intervalBetween(lower, upper)
            if (!interval || !asks(level, interval)) continue
            const key = answerKey(level, interval)
            pool.set(key, [...(pool.get(key) ?? []), { clef, lower, upper, interval }])
          }
        }
      }
    }
  }
  pools.set(level, pool)
  return pool
}

function pick<T>(items: readonly T[], rng: () => number): T {
  return items[Math.min(items.length - 1, Math.floor(rng() * items.length))]
}

/**
 * The next interval to name. The answer is picked first, evenly among the
 * level's answers (at level 4, an augmented or diminished one
 * `INTERVAL_AUG_DIM_SHARE` of the time), then one of its spellings: so a
 * size or quality with many spellings is not asked more than one with few.
 * Never the same answer twice in a row, so the grid is read, not repeated.
 *
 * @param previous the interval just asked, or null at the start.
 */
export function generateIntervalQuestion(
  level: IntervalLevel,
  previous: Interval | null,
  rng: () => number = Math.random,
): IntervalQuestion {
  const pool = levelPool(level)
  let answers = [...pool.keys()]
  const augDim = INTERVAL_LEVELS[level].augDim
  if (augDim.length > 0) {
    const odd = rng() < INTERVAL_AUG_DIM_SHARE
    answers = answers.filter(k => augDim.includes(k) === odd)
  }
  const last = previous && answerKey(level, previous)
  const fresh = answers.filter(k => k !== last)
  const key = pick(fresh.length > 0 ? fresh : answers, rng)
  const spelling = pick(pool.get(key)!, rng)
  return { ...spelling, layout: rng() < INTERVAL_HARMONIC_SHARE ? 'harmonic' : 'melodic' }
}

/** What an answer plays: the two notes one after the other (melodic) or together (harmonic). */
export function intervalSound(q: Pick<IntervalQuestion, 'lower' | 'upper' | 'layout'>): SoundEvent[] {
  if (q.layout === 'harmonic') return [{ pitches: [q.lower, q.upper], at: 0, hold: INTERVAL_PLAY.dyadHoldSec }]
  return [
    { pitches: [q.lower], at: 0, hold: INTERVAL_PLAY.holdSec },
    { pitches: [q.upper], at: INTERVAL_PLAY.stepSec, hold: INTERVAL_PLAY.holdSec },
  ]
}

/** The two notes in the notation of `core/music/notation`: "E4 C5" side by side, "E4+C5" stacked. */
export function intervalNotation(q: Pick<IntervalQuestion, 'lower' | 'upper' | 'layout'>): string {
  const note = (p: Pitch) => `${p.letter}${p.accidental}${p.octave}`
  return q.layout === 'harmonic' ? `${note(q.lower)}+${note(q.upper)}` : `${note(q.lower)} ${note(q.upper)}`
}
