import { EarIcon } from '@phosphor-icons/react'
import { QuestionStaff, type StaffTone } from '@/core/components/organisms'
import type { Pitch } from '@/core/music/types'

interface Props {
  pitch: Pitch
  /** Answered: the note is shown on the staff. Until then the staff is hidden: no peeking. */
  revealed: boolean
  /** Sound is playing (the cadence or the note): the ear pulses. */
  listening: boolean
  tone: StaffTone
  /** The reader's wrong pick, drawn beside the note once revealed. */
  chosen: Pitch | null
  /** What to do, e.g. "Play the note you heard". */
  prompt: string
}

/**
 * Where the note is heard and then seen. The staff is always laid out, so
 * the screen never jumps; before the answer it is hidden under an ear that
 * pulses while sound plays, and the answer reveals the note on it, tying the
 * sound to the symbol.
 */
export function ListenStage({ pitch, revealed, listening, tone, chosen, prompt }: Props) {
  return (
    <div className="relative w-full">
      <div className={revealed ? 'animate-fade-in' : 'invisible'} aria-hidden={!revealed}>
        <QuestionStaff clef="treble" pitch={pitch} tone={tone} chosen={chosen} />
      </div>
      {!revealed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <span
            data-testid="ear"
            data-listening={listening || undefined}
            className="relative flex size-20 items-center justify-center rounded-full bg-accent/12 text-accent md:size-24"
          >
            {listening && (
              <span aria-hidden className="absolute -inset-2 animate-ping rounded-full border-2 border-accent/40 motion-reduce:hidden" />
            )}
            <EarIcon size={38} weight="duotone" aria-hidden />
          </span>
          <p className="text-[15px] font-medium text-ink-soft md:text-lg">{prompt}</p>
        </div>
      )}
    </div>
  )
}
