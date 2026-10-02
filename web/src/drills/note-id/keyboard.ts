/** The parts of a KeyboardEvent the answer mapping reads. */
export interface KeyPress {
  key: string
  code?: string
  ctrlKey?: boolean
  metaKey?: boolean
  altKey?: boolean
}

/**
 * Resolves a keydown to an answer index by matching the key each option
 * advertises: A S D F G H J along the naturals, W E T Y U on the black keys
 * above them, the same shape as the on-screen piano.
 *
 * The physical key (`code`) wins over the character it types, so the piano
 * shape survives Caps Lock, Shift and non-Latin input modes (a Vietnamese
 * Telex composition still reports `KeyA`). Shortcut chords such as Cmd+R are
 * left to the browser rather than answered.
 *
 * Matching against the options rather than parsing a number also removes the
 * whole class of bug where `Number('Shift')` is NaN and slips past a range check.
 */
export function optionIndexFromKey(
  press: KeyPress,
  options: readonly { keyHint: string }[],
): number | null {
  if (press.ctrlKey || press.metaKey || press.altKey) return null
  const physical = press.code && /^Key[A-Z]$/.test(press.code) ? press.code.slice(3) : null
  const pressed = (physical ?? press.key).toLowerCase()
  const index = options.findIndex(o => o.keyHint === pressed)
  return index === -1 ? null : index
}
