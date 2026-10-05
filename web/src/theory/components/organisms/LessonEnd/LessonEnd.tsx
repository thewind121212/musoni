import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { LessonDot } from '../../atoms'

export interface EndLink {
  to: string
  label: string
  state?: unknown
  replace?: boolean
  /** Handles the tap itself (e.g. stepping back in history) instead of following `to`. */
  onClick?: (e: MouseEvent) => void
}

interface Props {
  /** "Xong bài 1.2". */
  eyebrow: string
  title: string
  recapHeading: string
  recap: ReactNode[]
  /** "Kiểm tra:" and "3/4 đúng"; omitted when the lesson had no checks. */
  score?: { label: string; value: string }
  /** The practice card, or nothing when no drill fits the lesson. */
  practice?: ReactNode
  /** Where to go next: the next lesson, or back to the list after the last one. */
  next: EndLink
  /** A quieter second link (the chapter review when no drill fits). */
  also?: EndLink
  /** The credit line, at the foot. */
  source: ReactNode
}

/**
 * The end of a lesson: what it taught, how the checks went, the drill that
 * trains it (amber, one tap), the way on, and the credit to the book. With no
 * drill to offer, the next lesson becomes the main action.
 */
export function LessonEnd({ eyebrow, title, recapHeading, recap, score, practice, next, also, source }: Props) {
  const reduce = useReducedMotion()
  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] as const },
  })
  const quiet = 'self-start rounded-lg py-1 text-sm font-semibold text-ink-soft underline decoration-line underline-offset-4 '
    + 'transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
  return (
    <div className="flex flex-1 flex-col gap-4">
      <motion.div {...enter(0)} className="flex items-center gap-3">
        <LessonDot state="done" mark="" size="lg" />
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{eyebrow}</p>
          <h1 className="text-xl leading-snug font-semibold tracking-tight md:text-2xl">{title}</h1>
        </div>
      </motion.div>

      <motion.section {...enter(0.05)} className="flex flex-col gap-2.5 rounded-2xl border border-line bg-raised p-5">
        <h2 className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{recapHeading}</h2>
        {recap.length > 0 && (
          <ul className="flex flex-col gap-1.5 text-[15px] leading-normal">
            {recap.map((item, i) => (
              <li key={i} className="flex gap-2"><span aria-hidden className="text-ink-faint">•</span><span className="min-w-0">{item}</span></li>
            ))}
          </ul>
        )}
        {score && (
          <p className="text-sm text-ink-soft">{score.label} <b className="font-semibold text-ink">{score.value}</b></p>
        )}
      </motion.section>

      {practice && <motion.div {...enter(0.1)}>{practice}</motion.div>}

      <motion.div {...enter(0.14)} className="flex flex-col gap-2">
        {practice ? (
          <Link to={next.to} state={next.state} replace={next.replace} onClick={next.onClick} className={quiet + ' inline-flex items-center gap-1.5'}>
            {next.label} <ArrowRightIcon size={14} weight="bold" aria-hidden />
          </Link>
        ) : (
          <Link
            to={next.to} state={next.state} replace={next.replace} onClick={next.onClick}
            className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-accent px-4 text-base font-semibold
                       text-accent-ink transition-[filter] duration-150 hover:brightness-110
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span className="truncate">{next.label}</span> <ArrowRightIcon size={16} weight="bold" aria-hidden className="shrink-0" />
          </Link>
        )}
        {also && <Link to={also.to} state={also.state} replace={also.replace} onClick={also.onClick} className={quiet}>{also.label}</Link>}
      </motion.div>

      <div className="mt-auto pt-8">{source}</div>
    </div>
  )
}
