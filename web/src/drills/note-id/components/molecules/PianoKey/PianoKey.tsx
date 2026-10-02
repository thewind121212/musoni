import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { KeyHint } from '@/drills/note-id/components/atoms'

/** What a key says after an answer: the right note, the reader's miss, or nothing. */
export type KeyMark = 'none' | 'correct' | 'wrong'

interface Props {
  label: string
  /**
   * Print the label. When off the key is bare until it is marked, so a miss
   * still names both notes; the label stays the key's accessible name.
   */
  showLabel?: boolean
  /** Shown while the key can still be pressed. */
  keyHint: string
  /** White key or black key. */
  row: 'natural' | 'accidental'
  mark: KeyMark
  disabled: boolean
  onPress: () => void
  /** Size and span, set by the pad. */
  className: string
}

function keyTone(mark: KeyMark, row: 'natural' | 'accidental') {
  if (mark === 'correct') return 'border-transparent bg-correct text-white'
  if (mark === 'wrong') return 'border-transparent bg-wrong text-white'
  return row === 'accidental'
    ? 'border-ink/80 bg-ink text-surface hover:bg-ink-soft'
    : 'border-line bg-raised text-ink hover:border-ink-faint'
}

/** One answer key. A marked key carries an icon as well as its colour. */
export function PianoKey({
  label, showLabel = true, keyHint, row, mark, disabled, onPress, className,
}: Props) {
  const labelShown = showLabel || mark !== 'none'
  return (
    <button
      disabled={disabled}
      onClick={onPress}
      aria-label={labelShown ? undefined : label}
      className={
        'relative flex items-center justify-center rounded-xl border text-[15px] font-medium ' +
        'transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.95] ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
        'md:text-xl ' + keyTone(mark, row) + ' ' + className
      }
    >
      {labelShown && label}
      {!disabled && <KeyHint hint={keyHint} />}
      {mark === 'correct' && <CheckIcon size={14} weight="bold" className="absolute top-1 right-1.5" />}
      {mark === 'wrong' && <XIcon size={14} weight="bold" className="absolute top-1 right-1.5" />}
    </button>
  )
}
