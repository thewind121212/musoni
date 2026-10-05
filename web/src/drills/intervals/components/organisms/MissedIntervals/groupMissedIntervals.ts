import { intervalNotation, type IntervalQuestion } from '@/drills/intervals/generator'
import type { Cell } from '@/drills/intervals/grid'

export interface MissedInterval {
  question: IntervalQuestion
  chosen: Cell
}

/** The same two notes, written the same way and misread the same way. */
export const missKey = (m: MissedInterval) =>
  `${m.question.clef}:${intervalNotation(m.question)}>${m.chosen.row}${m.chosen.size}`

/** Each miss counted once with how often; most repeated first, ties in the order they happened. */
export function groupMissedIntervals(misses: readonly MissedInterval[]) {
  const groups = new Map<string, MissedInterval & { count: number }>()
  for (const m of misses) {
    const key = missKey(m)
    const seen = groups.get(key)
    if (seen) seen.count++
    else groups.set(key, { ...m, count: 1 })
  }
  return [...groups.values()].sort((a, b) => b.count - a.count)
}
