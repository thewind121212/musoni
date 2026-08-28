/**
 * Resolves a keydown to an answer index by matching the key each option
 * advertises: 1..7 along the naturals, q w e r t on the accidentals above them,
 * which mirrors the two rows of the on-screen piano.
 *
 * Matching against the options rather than parsing a number also removes the
 * whole class of bug where `Number('Shift')` is NaN and slips past a range check.
 */
export function optionIndexFromKey(
  key: string,
  options: readonly { keyHint: string }[],
): number | null {
  const pressed = key.toLowerCase()
  const index = options.findIndex(o => o.keyHint === pressed)
  return index === -1 ? null : index
}
