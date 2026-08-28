/**
 * Maps a keydown's `key` to a zero-based answer-option index, or null when the
 * key isn't one. Guards against `Number('Shift') - 1` being NaN, which slips
 * through naive range checks and would score a wrong answer.
 */
export function optionIndexFromKey(key: string, optionCount: number): number | null {
  const i = Number(key) - 1
  if (!Number.isInteger(i) || i < 0 || i >= optionCount) return null
  return i
}
