import { CheckIcon, XIcon } from '@phosphor-icons/react'
import type { NoteOption } from '../generator'

/**
 * Answer keys, laid out in rows of at most four that each stretch to the full
 * width. With eight options that reads as a clean 4 + 4 block; with the seven
 * natural names it reads as 4 + 3 with no empty cell, so the pad never looks
 * like it is missing a key.
 */
function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size))
  return rows
}

interface Props {
  options: NoteOption[]
  feedback: { correctIndex: number; chosenIndex: number } | null
  onAnswer: (index: number) => void
}

export function AnswerGrid({ options, feedback, onAnswer }: Props) {
  const rows = chunk(options.map((option, index) => ({ option, index })), 4)

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map(({ option, index }) => {
            const isCorrect = !!feedback && index === feedback.correctIndex
            const isWrongPick = !!feedback && index === feedback.chosenIndex && !isCorrect
            const tone = isCorrect
              ? 'border-transparent bg-correct text-white'
              : isWrongPick
                ? 'border-transparent bg-wrong text-white'
                : 'border-line bg-raised text-ink hover:border-ink-faint'
            return (
              <button
                key={option.label}
                disabled={!!feedback}
                onClick={() => onAnswer(index)}
                className={
                  'relative flex min-h-16 flex-1 items-center justify-center rounded-2xl border ' +
                  'text-xl font-medium transition-[background-color,border-color,color,transform] ' +
                  'duration-150 active:scale-[0.96] focus-visible:outline-2 ' +
                  'focus-visible:outline-offset-2 focus-visible:outline-accent ' + tone
                }
              >
                {option.label}
                {isCorrect && <CheckIcon size={15} weight="bold" className="absolute top-1.5 right-1.5" />}
                {isWrongPick && <XIcon size={15} weight="bold" className="absolute top-1.5 right-1.5" />}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
