import type { CSSProperties } from 'react'
import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { KeyHint } from '@/core/components/atoms'

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
  /** A key of a drawn piano, or a free-standing box. */
  shape?: 'piano' | 'box'
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

// A piano's white key is long with its name at the foot; its black key is
// short, sits on top of the white keys and carries a smaller name. A box is a
// plain button with the name in the middle.
const SHAPE = {
  piano: {
    natural: 'flex-col justify-end gap-1 rounded-b-xl rounded-t-sm pb-2.5 text-[15px] md:text-lg',
    accidental: 'z-10 flex-col justify-end gap-0.5 rounded-b-lg rounded-t-none pb-1.5 text-[11px] shadow-md md:text-[13px]',
  },
  box: {
    natural: 'relative justify-center rounded-xl text-[15px] md:text-xl',
    accidental: 'relative justify-center rounded-xl text-[15px] md:text-xl',
  },
}

/** One answer key. A marked key carries an icon as well as its colour. */
export function PianoKey({
  label, showLabel = true, keyHint, row, shape = 'piano', mark, disabled, onPress, className, style,
}: Props) {
  const labelShown = showLabel || mark !== 'none'
  const box = shape === 'box'
  const iconClass = box ? 'absolute top-1 right-1.5' : undefined
  return (
    <button
      disabled={disabled}
      onClick={onPress}
      aria-label={labelShown ? undefined : label}
      style={style}
      className={
        'flex items-center border font-medium ' +
        'transition-[background-color,border-color,color,transform] duration-150 ' +
        (box ? 'active:scale-[0.95] ' : 'active:scale-y-[0.98] ') +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
        SHAPE[shape][row] + ' ' + keyTone(mark, row) + ' ' + className
      }
    >
      {mark === 'correct' && <CheckIcon size={14} weight="bold" className={iconClass} />}
      {mark === 'wrong' && <XIcon size={14} weight="bold" className={iconClass} />}
      {labelShown && <span>{label}</span>}
      {!disabled && <KeyHint hint={keyHint} corner={box} />}
    </button>
  )
}
