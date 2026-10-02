import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { StatStrip, type Stat } from '@/core/components/molecules'

const ARROW = 'transition-transform duration-150 group-hover:translate-x-0.5'

interface Props {
  /** Route the card opens. */
  to: string
  icon: ReactNode
  title: string
  description: string
  /** The call to action in the corner, e.g. "Practice". */
  actionLabel: string
  /** The drill's current setup and best score, shown under the title. */
  stats: Stat[]
}

/** A drill the reader can start: the whole card is one link, with its setup at a glance. */
export function PracticeCard({ to, icon, title, description, actionLabel, stats }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div whileTap={reduce ? undefined : { scale: 0.98 }}>
      <Link
        to={to}
        className="group block rounded-2xl border border-line bg-raised p-5
                   transition-colors duration-150 hover:border-accent
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {/* The call to action is neutral ink rather than the accent, so it
            does not compete with the blue icon tile. Phones get small text on
            the title row, so the description keeps the full width below;
            wider screens get a pill on the right. Only one shows at a time. */}
        <span className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
            {icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-baseline justify-between gap-2">
              <span className="font-medium">{title}</span>
              <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-ink sm:hidden">
                {actionLabel}
                <ArrowRightIcon size={12} weight="bold" aria-hidden className={ARROW} />
              </span>
            </span>
            <span className="block text-sm text-ink-faint">{description}</span>
          </span>
          <span
            className="hidden shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold
                       text-surface transition-colors duration-150 group-hover:bg-ink-soft sm:flex"
          >
            {actionLabel}
            <ArrowRightIcon size={14} weight="bold" aria-hidden className={ARROW} />
          </span>
        </span>

        <span className="mt-4 block">
          <StatStrip stats={stats} />
        </span>
      </Link>
    </motion.div>
  )
}
