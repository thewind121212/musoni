import { useMemo } from 'react'
import { NoteStaff, type StaffTone } from '@/core/components/organisms'
import { parseNotation } from '@/core/music/notation'
import { intervalNotation, type IntervalQuestion } from '@/drills/intervals/generator'
import { INTERVAL_STAFF_ROOM, INTERVAL_STAFF_WIDTH } from '@/config/constants'

interface Props {
  question: Pick<IntervalQuestion, 'clef' | 'lower' | 'upper' | 'layout'>
  /** `correct` once answered: the printed notes are always the answer, so they turn green either way. */
  tone: StaffTone
}

/**
 * The two notes to name, large, on the page itself like note reading's staff.
 * Side by side (melodic) or stacked (harmonic). The box is pinned to the
 * staff lines plus room for a ledger line and an accidental, so the staff
 * keeps its size and place from one question to the next.
 */
export function IntervalStaff({ question, tone }: Props) {
  const notation = intervalNotation(question)
  // Parsed once per question: the run screen re-renders on every clock tick,
  // and new events would redraw the staff each time.
  const events = useMemo(() => parseNotation(notation), [notation])
  return (
    <div className="mx-auto w-full max-w-md md:max-w-xl [@media(max-height:900px)]:max-w-sm [@media(max-height:900px)]:md:max-w-md">
      <NoteStaff
        clef={question.clef}
        events={events}
        tone={tone}
        width={INTERVAL_STAFF_WIDTH}
        room={INTERVAL_STAFF_ROOM}
      />
    </div>
  )
}
