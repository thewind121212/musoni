import { useMemo } from 'react'
import { NoteStaff } from '@/core/components/organisms'
import type { Pitch } from '@/core/music/types'
import { CHORD_STAFF_WIDTH } from '@/config/constants'
import { chordEvents } from '../../../staff'

interface Props {
  /** "Hợp âm gì?" */
  prompt: string
  /** Roman numeral mode: the key in words, over the prompt. */
  keyLine?: string | null
  notes: readonly Pitch[]
  /** Roman numeral mode: the key signature the chord is read in. */
  keySignature?: string | null
  /** Turns the chord green once answered (it is always the right answer). */
  answered: boolean
}

/**
 * The chord to read: the question, then the chord on a treble staff, large.
 *
 * The staff box is cropped to its ink, so it is held in a frame of fixed
 * shape with the staff pinned to its top. Chords never reach above the top
 * line (see `theory.voice`), so the lines stay put between questions and only
 * the room below them changes.
 */
export function ChordStage({ prompt, keyLine = null, notes, keySignature = null, answered }: Props) {
  const events = useMemo(() => chordEvents(notes), [notes])
  return (
    <div className="flex w-full flex-col items-center">
      {keyLine && <p className="text-sm font-medium text-ink-soft md:text-base">{keyLine}</p>}
      <h2 className="text-lg font-semibold md:text-xl">{prompt}</h2>
      <div
        className="mt-2 aspect-[200/84] w-full max-w-sm overflow-hidden md:max-w-md
                   [@media(max-height:640px)]:max-w-[16rem] [@media(max-height:900px)]:md:max-w-sm"
      >
        <NoteStaff
          clef="treble"
          events={events}
          keySignature={keySignature ?? undefined}
          tone={answered ? 'correct' : 'neutral'}
          width={CHORD_STAFF_WIDTH}
        />
      </div>
    </div>
  )
}
