import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { KeyHint } from '@/core/components/atoms'

export interface AnswerChip {
  label: string
  /** Computer key that picks it (desktop only). */
  keyHint: string
  /** Not asked at this level: drawn dashed, never pressable. */
  disabled?: boolean
  /** Screen-reader words after the label, for a disabled chip ("not at this level"). */
  note?: string
}

interface Props {
  chips: readonly AnswerChip[]
  /** Accessible name of the group ("Quality", "Numeral"). */
  label: string
  /** A pick waiting for the other half of the answer. */
  selected?: number | null
  /** Once answered: the right chip and the reader's. */
  feedback: { correctIndex: number; chosenIndex: number | null } | null
  onPick: (index: number) => void
  /** Line height: `tall` when the chips are the whole answer (Roman numerals). */
  size?: 'regular' | 'tall'
}

/**
 * A row of answer buttons for one part of a chord's answer: its quality
 * (Trưởng, Thứ, Giảm, Tăng) or its Roman numeral. A pick waiting for the root
 * is filled blue; once answered the right chip turns green with a tick and a
 * wrong pick red with a cross, and the row locks. Chips a level does not ask
 * stay on screen, dashed, so the row keeps its shape across levels.
 */
export function AnswerChips({ chips, label, selected = null, feedback, onPick, size = 'regular' }: Props) {
  return (
    <div
      role="group"
      aria-label={label}
      className={'grid md:gap-2 ' + (size === 'tall' ? 'gap-1' : 'gap-1.5')}
      style={{ gridTemplateColumns: `repeat(${chips.length}, minmax(0, 1fr))` }}
    >
      {chips.map((chip, i) => {
        const right = feedback !== null && i === feedback.correctIndex
        const wrong = feedback !== null && i === feedback.chosenIndex && !right
        const picked = feedback === null && i === selected
        return (
          <button
            key={chip.label}
            type="button"
            disabled={chip.disabled || feedback !== null}
            aria-pressed={feedback === null && !chip.disabled ? picked : undefined}
            onClick={() => onPick(i)}
            className={
              'relative flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-2xl border-[1.5px] '
              + 'font-semibold transition-[background-color,border-color,color,transform] duration-150 '
              + 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent '
              + (size === 'tall' ? 'h-16 px-0.5 text-base min-[400px]:text-lg md:h-20 md:text-xl ' : 'h-12 px-1 text-[15px] md:h-14 md:text-base [@media(max-height:640px)]:h-11 ')
              + (right
                ? 'border-transparent bg-correct text-white'
                : wrong
                  ? 'border-transparent bg-wrong text-white'
                  : picked
                    ? 'border-transparent bg-accent text-accent-ink'
                    : chip.disabled
                      ? 'border-dashed border-line bg-transparent text-ink-faint'
                      : feedback !== null
                        ? 'border-line bg-raised text-ink-faint'
                        : 'border-line bg-raised text-ink hover:border-ink-faint active:scale-[0.97]')
            }
          >
            {/* In the corner, so a long word ("Trưởng") keeps its room. */}
            {right && <CheckIcon size={12} weight="bold" aria-hidden className="absolute top-1 right-1.5" />}
            {wrong && <XIcon size={12} weight="bold" aria-hidden className="absolute top-1 right-1.5" />}
            <span className="max-w-full truncate">{chip.label}</span>
            {chip.note && <span className="sr-only">, {chip.note}</span>}
            {!chip.disabled && feedback === null && <KeyHint hint={chip.keyHint} />}
          </button>
        )
      })}
    </div>
  )
}
