import type { NoteOption } from '@/drills/note-id/generator'
import { PianoKey, type KeyMark } from '@/drills/note-id/components/molecules'

// Columns in a 14-wide grid, so each white key spans two and each black key
// straddles the boundary between its neighbours.
const BLACK_KEY_COLUMN = [2, 4, 8, 10, 12]

interface Props {
  options: NoteOption[]
  feedback: { correctIndex: number; chosenIndex: number } | null
  onAnswer: (index: number) => void
  /** Print note names on the keys. Off leaves a bare keyboard; answered keys still show theirs. */
  showLabels?: boolean
}

/**
 * The answer keys, laid out as a piano: the five accidentals sit above the gaps
 * between white keys (two, a space where E meets F, then three), the seven
 * naturals run along the bottom.
 *
 * Keys hold the same position on every question, so the pad is a layout to
 * learn rather than a list to re-read, and the shape matches the instrument the
 * notation is being read for.
 */
export function AnswerPad({ options, feedback, onAnswer, showLabels = true }: Props) {
  const naturals = options.filter(o => o.row === 'natural')
  const accidentals = options.filter(o => o.row === 'accidental')

  const key = (option: NoteOption, index: number, size: string) => {
    const mark: KeyMark = !feedback
      ? 'none'
      : index === feedback.correctIndex
        ? 'correct'
        : index === feedback.chosenIndex ? 'wrong' : 'none'
    return (
      <PianoKey
        key={option.label}
        label={option.label}
        showLabel={showLabels}
        keyHint={option.keyHint}
        row={option.row}
        mark={mark}
        disabled={!!feedback}
        onPress={() => onAnswer(index)}
        className={size}
      />
    )
  }

  return (
    <div className="select-none">
      {accidentals.length > 0 && (
        <div className="grid grid-cols-14 gap-1.5 md:gap-2">
          {accidentals.map(option => (
            <div
              key={option.label}
              className="col-span-2 flex"
              style={{ gridColumnStart: BLACK_KEY_COLUMN[option.slot] }}
            >
              {key(option, options.indexOf(option), 'h-14 w-full md:h-16')}
            </div>
          ))}
        </div>
      )}
      <div
        className={
          'grid grid-cols-7 gap-1.5 md:gap-2 ' + (accidentals.length > 0 ? 'mt-1.5 md:mt-2' : '')
        }
      >
        {naturals.map(option => key(option, options.indexOf(option), 'h-16 w-full md:h-20'))}
      </div>
    </div>
  )
}
