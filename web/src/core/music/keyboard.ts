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

// Where each black key sits, as the white-key boundary it straddles: C#
// between the 1st and 2nd white key, D# between the 2nd and 3rd, none where E
// meets F, then three.
export const BLACK_KEY_BOUNDARY = [1, 2, 4, 5, 6]
const WHITE_KEYS = 7
/** Black key width as a share of a white key's, close to a real keyboard. */
const BLACK_KEY_WIDTH = 0.6

/** Inline position for the black key in `slot`, as percentages of the pad. */
export function blackKeyPosition(slot: number) {
  const width = (BLACK_KEY_WIDTH / WHITE_KEYS) * 100
  const centre = (BLACK_KEY_BOUNDARY[slot] / WHITE_KEYS) * 100
  return { left: `${(centre - width / 2).toFixed(3)}%`, width: `${width.toFixed(3)}%` }
}
