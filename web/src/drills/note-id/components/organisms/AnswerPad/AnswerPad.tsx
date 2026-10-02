import type { CSSProperties } from 'react'
import type { NoteOption } from '@/drills/note-id/generator'
import { PianoKey, type KeyMark } from '@/drills/note-id/components/molecules'
import { BLACK_KEY_BOUNDARY, blackKeyPosition } from '@/drills/note-id/keyboard'

interface Props {
  options: NoteOption[]
  feedback: { correctIndex: number; chosenIndex: number } | null
  onAnswer: (index: number) => void
  /** Print note names on the keys. Off leaves a bare keyboard; answered keys still show theirs. */
  showLabels?: boolean
}

/**
 * The answer keys, drawn as a piano: seven long white keys side by side, and
 * the five black keys laid over the gaps between them (two, none where E meets
 * F, then three).
 *
 * The black keys are always drawn, since they are how a pianist finds a note
 * on a keyboard. Without accidentals they are landmarks only, not answers.
 * Keys hold the same position on every question, so the pad is a layout to
 * learn rather than a list to re-read.
 */
export function AnswerPad({ options, feedback, onAnswer, showLabels = true }: Props) {
  const naturals = options.filter(o => o.row === 'natural')
  const accidentals = options.filter(o => o.row === 'accidental')

  const markOf = (index: number): KeyMark =>
    !feedback
      ? 'none'
      : index === feedback.correctIndex
        ? 'correct'
        : index === feedback.chosenIndex ? 'wrong' : 'none'

  const key = (option: NoteOption, className: string, style?: CSSProperties) => {
    const index = options.indexOf(option)
    return (
      <PianoKey
        key={option.label}
        label={option.label}
        showLabel={showLabels}
        keyHint={option.keyHint}
        row={option.row}
        mark={markOf(index)}
        disabled={!!feedback}
        onPress={() => onAnswer(index)}
        className={className}
        style={style}
      />
    )
  }

  return (
    <div className="relative h-[clamp(8.5rem,24dvh,10rem)] select-none md:h-[clamp(9.5rem,22dvh,11rem)]">
      <div data-testid="white-keys" className="flex h-full gap-1">
        {naturals.map(option => key(option, 'h-full min-w-0 flex-1'))}
      </div>
      <div data-testid="black-keys">
        {accidentals.length > 0
          ? accidentals.map(option =>
            key(option, 'absolute top-0 h-[58%]', blackKeyPosition(option.slot)))
          : BLACK_KEY_BOUNDARY.map((_, slot) => (
            <span
              key={slot}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 z-10 h-[58%] rounded-b-lg bg-ink shadow-md"
              style={blackKeyPosition(slot)}
            />
          ))}
      </div>
    </div>
  )
}
