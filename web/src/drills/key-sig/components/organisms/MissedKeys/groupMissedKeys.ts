import type { Clef } from '@/core/music/types'

export interface MissedKey {
  fifths: number
  clef: Clef
  /** "La trưởng": the key asked for, in the reader's naming. */
  keyName: string
  /** The key on the pad the reader picked instead ("Re"). */
  chosen: string
}

/** The same signature, clef, key and wrong pick counted once with how often; most repeated first. */
export function groupMissedKeys(misses: readonly MissedKey[]) {
  const groups = new Map<string, MissedKey & { count: number }>()
  for (const m of misses) {
    const key = `${m.fifths}${m.clef}${m.keyName}>${m.chosen}`
    const seen = groups.get(key)
    if (seen) seen.count++
    else groups.set(key, { ...m, count: 1 })
  }
  // Ties keep the order they happened in.
  return [...groups.values()].sort((a, b) => b.count - a.count)
}
