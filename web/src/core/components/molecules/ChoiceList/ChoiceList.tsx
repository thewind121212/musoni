import type { ReactNode } from 'react'
import { CheckIcon, XIcon } from '@phosphor-icons/react'

interface Props {
  options: ReactNode[]
  /** Which option is right; shown only once answered. */
  correctIndex: number
  /** The reader's pick, or null before answering. */
  chosen: number | null
  onChoose: (index: number) => void
}

/**
 * A check's 2 to 4 answers as full-width buttons. Once one is picked the right
 * answer turns green with a tick and a wrong pick red with a cross, and the
 * buttons lock: one answer per check, no retries, no penalty.
 */
export function ChoiceList({ options, correctIndex, chosen, onChoose }: Props) {
  const answered = chosen !== null
  return (
    <div className="flex flex-col gap-2.5">
      {options.map((option, i) => {
        const right = answered && i === correctIndex
        const wrong = answered && i === chosen && i !== correctIndex
        return (
          <button
            key={i}
            type="button"
            disabled={answered}
            aria-pressed={answered ? i === chosen : undefined}
            onClick={() => onChoose(i)}
            className={'flex min-h-13 items-center justify-between gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-left '
              + 'text-base font-medium transition-[border-color,background-color,transform] duration-150 '
              + 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent '
              + (right
                ? 'border-correct bg-correct/10 text-ink'
                : wrong
                  ? 'border-wrong bg-wrong/10 text-ink'
                  : answered
                    ? 'border-line bg-raised text-ink-faint'
                    : 'border-line bg-raised text-ink hover:border-ink-faint active:scale-[0.99]')}
          >
            <span className="min-w-0">{option}</span>
            {right && <CheckIcon size={18} weight="bold" className="shrink-0 text-correct" aria-hidden />}
            {wrong && <XIcon size={18} weight="bold" className="shrink-0 text-wrong" aria-hidden />}
          </button>
        )
      })}
    </div>
  )
}
