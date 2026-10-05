import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CheckIcon, XIcon } from '@phosphor-icons/react'

interface Props {
  correct: boolean
  /** The pill: "Đúng: Mi", "Chưa đúng: đây là Mi". */
  title: string
  /** Why, in one sentence. Shown right or wrong. */
  reason: ReactNode
}

/** After a check: right or not (colour and icon), then the reason. */
export function CheckVerdict({ correct, title, reason }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      role="status"
      initial={reduce ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-2 text-center"
    >
      <span
        className={'inline-flex max-w-full items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold '
          + (correct ? 'bg-correct/12 text-correct' : 'bg-wrong/12 text-wrong')}
      >
        {correct
          ? <CheckIcon size={16} weight="bold" aria-hidden className="shrink-0" />
          : <XIcon size={16} weight="bold" aria-hidden className="shrink-0" />}
        {title}
      </span>
      <p className="max-w-prose text-[15px] leading-normal text-ink-soft">{reason}</p>
    </motion.div>
  )
}
