import type { Pitch } from '@/core/music/types'

export interface MissedChord {
  notes: readonly Pitch[]
  /** The key signature it was read in (Roman numeral mode). */
  keySignature: string | null
  /** "Am/C", or "V · E" in a key. */
  answer: string
  /** What was picked, in words: "C major", "vii°". */
  chosen: string
}

/** The same chord missed the same way counts once, with how often; most repeated first. */
export function groupMissedChords(misses: readonly MissedChord[]) {
  const groups = new Map<string, MissedChord & { count: number }>()
  for (const m of misses) {
    const key = `${m.keySignature}|${m.notes.map(n => n.letter + n.accidental + n.octave).join()}>${m.chosen}`
    const seen = groups.get(key)
    if (seen) seen.count++
    else groups.set(key, { ...m, count: 1 })
  }
  return [...groups.values()].sort((a, b) => b.count - a.count)
}
