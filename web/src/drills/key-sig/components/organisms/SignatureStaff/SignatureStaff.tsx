import { NoteStaff } from '@/core/components/organisms'
import type { StaffEvent } from '@/core/music/notation'
import type { Clef } from '@/core/music/types'
import { vexKeyName } from '@/drills/key-sig/signatures'

interface Props {
  /** Sharps (1 to 7), flats (-1 to -7), or 0 for none. */
  fifths: number
  clef: Clef
  /** Notation units across; the drawing scales to its container. */
  width: number
}

// One empty list for every signature: the staff redraws when its events change.
const NO_NOTES: readonly StaffEvent[] = []

/**
 * A clef and a key signature on a staff, no notes: the question, a level's
 * picture in setup, a missed key on the result screen. Drawn by the core
 * NoteStaff, so VexFlow places each sharp and flat for the clef.
 */
export function SignatureStaff({ fifths, clef, width }: Props) {
  // NoteStaff crops to the staff lines and the notes; with no notes, the
  // treble clef's tail hangs below that box. Let it draw past the box, into
  // room kept under the staff.
  return (
    <div className="w-full pb-[7%] [&_svg]:overflow-visible">
      <NoteStaff clef={clef} events={NO_NOTES} keySignature={vexKeyName(fifths)} width={width} />
    </div>
  )
}
