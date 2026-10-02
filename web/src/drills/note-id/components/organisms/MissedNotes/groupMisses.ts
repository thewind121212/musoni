import type { Clef, Pitch } from '@/core/music/types'

export interface MissedNote {
  clef: Clef
  pitch: Pitch
  answer: string
  chosen: string
}

/** Same note read the same wrong way, counted once with how often. */
export function groupMisses(misses: MissedNote[]) {
  const groups = new Map<string, MissedNote & { count: number }>()
  for (const m of misses) {
    const key = `${m.clef}${m.pitch.letter}${m.pitch.accidental}${m.pitch.octave}>${m.chosen}`
    const seen = groups.get(key)
    if (seen) seen.count++
    else groups.set(key, { ...m, count: 1 })
  }
  // Most repeated first; ties keep the order they happened in.
  return [...groups.values()].sort((a, b) => b.count - a.count)
}
