import { CheckIcon, XIcon } from '@phosphor-icons/react'
import type { CSSProperties } from 'react'
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
  /** Size and position, set by the pad. */
  className: string
  style?: CSSProperties
}

function keyTone(mark: KeyMark, row: 'natural' | 'accidental') {
  if (mark === 'correct') return 'border-transparent bg-correct text-white'
  if (mark === 'wrong') return 'border-transparent bg-wrong text-white'
  return row === 'accidental'
    ? 'border-ink bg-ink text-surface hover:bg-ink-soft'
    : 'border-line bg-raised text-ink hover:border-ink-faint'
}

// A white key is long with its name at the foot, as on a piano; a black key is
// short, sits on top of the white keys and carries a smaller name.
const SHAPE = {
  natural: 'gap-1 rounded-b-xl rounded-t-sm pb-2.5 text-[15px] md:text-lg',
  accidental: 'z-10 gap-0.5 rounded-b-lg rounded-t-none pb-1.5 text-[11px] shadow-md md:text-[13px]',
}

/** One answer key. A marked key carries an icon as well as its colour. */
export function PianoKey({
  label, showLabel = true, keyHint, row, mark, disabled, onPress, className, style,
}: Props) {
  const labelShown = showLabel || mark !== 'none'
  return (
    <button
      disabled={disabled}
      onClick={onPress}
      aria-label={labelShown ? undefined : label}
      style={style}
      className={
        'flex flex-col items-center justify-end border font-medium ' +
        'transition-[background-color,border-color,color,transform] duration-150 active:scale-y-[0.98] ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
        SHAPE[row] + ' ' + keyTone(mark, row) + ' ' + className
      }
    >
      {mark === 'correct' && <CheckIcon size={14} weight="bold" />}
      {mark === 'wrong' && <XIcon size={14} weight="bold" />}
      {labelShown && <span>{label}</span>}
      {!disabled && <KeyHint hint={keyHint} />}
    </button>
  )
}
