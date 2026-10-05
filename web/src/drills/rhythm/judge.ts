/*
 * Judging a tapped measure. Taps and note onsets are in ms from the downbeat
 * (the taps already moved by the reader's latency). Each onset is paired with
 * at most one tap, in order: on time within the tolerance, early or late
 * within twice it, otherwise missed. A tap paired with no note is extra.
 */

export type Mark = 'on' | 'early' | 'late' | 'missed'

export interface NoteMark {
  mark: Mark
  /** Tap minus onset in ms (negative = early); null when missed. */
  offsetMs: number | null
}

export interface Judgement {
  /** One mark per onset, in order. */
  notes: NoteMark[]
  /** Taps inside the measure that belong to no note, in ms from the downbeat. */
  extras: number[]
  /** Every note on time and no extra tap. */
  correct: boolean
}

/** What to say first about a measure: its earliest problem. */
export type Problem =
  | { kind: 'early' | 'late'; note: number; ms: number }
  | { kind: 'missed'; note: number }
  | { kind: 'extra'; count: number }

// Costs for the alignment. A miss or an extra tap outweighs any pairing,
// an early/late pairing outweighs any on-time one, and among equals the
// closer pairing wins.
const UNPAIRED = 1000
const OFF_BEAT = 10
const PER_MS = 0.001

/**
 * Judges taps against the onsets of a measure `lengthMs` long. Taps further
 * than twice the tolerance outside the measure are ignored; so is a tap
 * before the downbeat or after the bar line that no note claims (tapping
 * along with the count-in, or the next downbeat, is not an error).
 */
export function judgeTaps(onsets: readonly number[], taps: readonly number[], toleranceMs: number, lengthMs: number): Judgement {
  const window = 2 * toleranceMs
  const ts = taps.filter(t => t >= -window && t < lengthMs + window).sort((a, b) => a - b)
  const n = onsets.length
  const m = ts.length

  // cost[i][j]: the cheapest way to account for the first i onsets and j taps.
  const cost: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(Infinity))
  const step: ('pair' | 'miss' | 'skip')[][] = Array.from({ length: n + 1 }, () => new Array(m + 1))
  const skipCost = (t: number) => (t >= 0 && t < lengthMs ? UNPAIRED : 0)
  cost[0][0] = 0
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= m; j++) {
      const here = cost[i][j]
      if (here === Infinity) continue
      if (i < n && here + UNPAIRED < cost[i + 1][j]) {
        cost[i + 1][j] = here + UNPAIRED
        step[i + 1][j] = 'miss'
      }
      if (j < m && here + skipCost(ts[j]) < cost[i][j + 1]) {
        cost[i][j + 1] = here + skipCost(ts[j])
        step[i][j + 1] = 'skip'
      }
      if (i < n && j < m) {
        const d = Math.abs(ts[j] - onsets[i])
        if (d <= window) {
          const c = here + (d <= toleranceMs ? 0 : OFF_BEAT) + d * PER_MS
          if (c < cost[i + 1][j + 1]) {
            cost[i + 1][j + 1] = c
            step[i + 1][j + 1] = 'pair'
          }
        }
      }
    }
  }

  const notes: NoteMark[] = new Array(n)
  const extras: number[] = []
  for (let i = n, j = m; i > 0 || j > 0;) {
    const s = step[i][j]
    if (s === 'pair') {
      const offset = ts[j - 1] - onsets[i - 1]
      notes[i - 1] = {
        mark: Math.abs(offset) <= toleranceMs ? 'on' : offset < 0 ? 'early' : 'late',
        offsetMs: Math.round(offset),
      }
      i--; j--
    } else if (s === 'miss') {
      notes[i - 1] = { mark: 'missed', offsetMs: null }
      i--
    } else {
      if (skipCost(ts[j - 1]) > 0) extras.unshift(ts[j - 1])
      j--
    }
  }
  return { notes, extras, correct: notes.every(x => x.mark === 'on') && extras.length === 0 }
}

/**
 * The measure's first problem in time, for the line under the staff ("Nốt
 * thứ 3 trễ 90 ms"); null when it was right. Notes are counted from 1.
 * Extra taps are named only when every note was on time, with their count.
 */
export function firstProblem(j: Judgement, onsets: readonly number[]): Problem | null {
  // Onsets are in order, so the first note marked is the earliest problem.
  const i = j.notes.findIndex(x => x.mark !== 'on')
  if (i >= 0 && i < onsets.length) {
    const x = j.notes[i]
    return x.mark === 'missed' || x.offsetMs === null
      ? { kind: 'missed', note: i + 1 }
      : { kind: x.mark === 'early' ? 'early' : 'late', note: i + 1, ms: Math.abs(x.offsetMs) }
  }
  return j.extras.length > 0 ? { kind: 'extra', count: j.extras.length } : null
}

/** Mean distance of the paired taps from their notes, in ms; null when nothing was paired. */
export function meanOffset(j: Judgement): number | null {
  const paired = j.notes.filter(x => x.offsetMs !== null)
  if (paired.length === 0) return null
  return paired.reduce((sum, x) => sum + Math.abs(x.offsetMs!), 0) / paired.length
}
