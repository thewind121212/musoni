import { CheckIcon, XIcon } from '@phosphor-icons/react'
import type { NoteOption } from '../generator'

/**
 * The answer keys, laid out as a piano: the five accidentals sit above the gaps
 * between white keys (two, a space where E meets F, then three), the seven
 * naturals run along the bottom.
 *
 * Keys hold the same position on every question, so the pad is a layout to
 * learn rather than a list to re-read, and the shape matches the instrument the
 * notation is being read for.
 */

// Columns in a 14-wide grid, so each white key spans two and each black key
// straddles the boundary between its neighbours.
const BLACK_KEY_COLUMN = [2, 4, 8, 10, 12]

interface Props {
  options: NoteOption[]
  feedback: { correctIndex: number; chosenIndex: number } | null
  onAnswer: (index: number) => void
}

function keyTone(isCorrect: boolean, isWrongPick: boolean, row: 'natural' | 'accidental') {
  if (isCorrect) return 'border-transparent bg-correct text-white'
  if (isWrongPick) return 'border-transparent bg-wrong text-white'
  return row === 'accidental'
    ? 'border-ink/80 bg-ink text-surface hover:bg-ink-soft'
    : 'border-line bg-raised text-ink hover:border-ink-faint'
}

export function AnswerGrid({ options, feedback, onAnswer }: Props) {
  const naturals = options.filter(o => o.row === 'natural')
  const accidentals = options.filter(o => o.row === 'accidental')

  const key = (option: NoteOption, index: number, extra: string) => {
    const isCorrect = !!feedback && index === feedback.correctIndex
    const isWrongPick = !!feedback && index === feedback.chosenIndex && !isCorrect
    return (
      <button
        key={option.label}
        disabled={!!feedback}
        onClick={() => onAnswer(index)}
        className={
          'relative flex items-center justify-center rounded-xl border text-[15px] font-medium ' +
          'transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.95] ' +
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
          'md:text-xl ' + keyTone(isCorrect, isWrongPick, option.row) + ' ' + extra
        }
      >
        {option.label}
        {!feedback && (
          <span className="absolute top-1 left-1.5 hidden text-[10px] opacity-50 md:block">
            {option.keyHint}
          </span>
        )}
        {isCorrect && <CheckIcon size={14} weight="bold" className="absolute top-1 right-1.5" />}
        {isWrongPick && <XIcon size={14} weight="bold" className="absolute top-1 right-1.5" />}
      </button>
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
