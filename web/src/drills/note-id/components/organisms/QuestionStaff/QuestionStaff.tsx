import { Staff, type StaffTone } from '@/core/components/organisms'
import type { Clef, Pitch } from '@/core/music/types'
import { QUESTION_STAFF_WIDTH } from '@/config/constants'

interface Props {
  clef: Clef
  pitch: Pitch
  tone: StaffTone
  /** The reader's wrong pick, drawn beside the printed note. */
  chosen: Pitch | null
}

/**
 * The note to read, large and on the page itself rather than in a card: the
 * card left most of its area empty and shrank the note on a phone. The staff
 * holds still between questions; only the note changes (see core Staff).
 */
export function QuestionStaff({ clef, pitch, tone, chosen }: Props) {
  return (
    <div className="mx-auto w-full max-w-md md:max-w-xl">
      <Staff clef={clef} pitch={pitch} tone={tone} chosen={chosen} width={QUESTION_STAFF_WIDTH} />
    </div>
  )
}

