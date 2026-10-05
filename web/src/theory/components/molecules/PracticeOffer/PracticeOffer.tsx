import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { PlayIcon } from '@phosphor-icons/react'

interface Props {
  /** "Luyện ngay điều vừa học". */
  heading: string
  icon: ReactNode
  /** The drill's name. */
  drill: string
  /** The session it starts: "Khóa Sol · 1 phút". */
  summary: string
  actionLabel: string
  to: string
  /** Route state the drill reads: `{ autostart, preset }`. */
  linkState: unknown
}

/**
 * The end of a lesson: the drill that trains what was just read, set up and
 * one tap away. Amber, because it starts practice; the card is ringed in the
 * same colour so it reads as the next thing to do.
 */
export function PracticeOffer({ heading, icon, drill, summary, actionLabel, to, linkState }: Props) {
  const reduce = useReducedMotion()
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-cta bg-raised p-5">
      <h2 className="text-xs font-semibold tracking-wide text-ink-soft uppercase">{heading}</h2>
      <div className="flex items-center gap-3.5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">{icon}</span>
        <div className="min-w-0">
          <p className="font-semibold">{drill}</p>
          <p className="text-sm text-ink-soft">{summary}</p>
        </div>
      </div>
      <motion.div whileTap={reduce ? undefined : { scale: 0.98 }}>
        <Link
          to={to}
          state={linkState}
          className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-cta text-base font-semibold
                     text-cta-ink shadow-sm transition-[filter] duration-150 hover:brightness-95
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <PlayIcon size={18} weight="fill" aria-hidden />
          {actionLabel}
        </Link>
      </motion.div>
    </section>
  )
}
