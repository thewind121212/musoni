import type { HTMLAttributes } from 'react'
import { CheckIcon, XIcon } from '@phosphor-icons/react'

type Tone = 'correct' | 'wrong'

const TONES: Record<Tone, string> = {
  correct: 'bg-correct/12 text-correct',
  wrong: 'bg-wrong/12 text-wrong',
}

interface Props extends HTMLAttributes<HTMLSpanElement> {
  tone: Tone
  count: number
  /** Spoken in place of the bare number, e.g. "3 correct". */
  label: string
}

/**
 * A running tally in a pill. The tone picks the icon as well as the colour, so
 * right and wrong are never told apart by colour alone. Screen readers get the
 * label instead of the icon and the bare number.
 */
export function CountPill({ tone, count, label, className = '', ...rest }: Props) {
  const Icon = tone === 'correct' ? CheckIcon : XIcon
  return (
    <span
      {...rest}
      className={
        `tnum flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-semibold md:text-base ${TONES[tone]} ${className}`
      }
    >
      <Icon size={14} weight="bold" aria-hidden />
      <span aria-hidden>{count}</span>
      <span className="sr-only">{label}</span>
    </span>
  )
}
