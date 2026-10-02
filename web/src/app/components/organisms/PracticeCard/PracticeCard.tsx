import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { StatStrip, type Stat } from '@/core/components/molecules'

const ARROW = 'transition-transform duration-150 group-hover:translate-x-0.5'
const PILL = 'flex shrink-0 items-center rounded-full bg-cta font-semibold text-cta-ink shadow-sm '
  + 'transition-[filter] duration-150 group-hover:brightness-95'

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
        {/* The call to action is a filled amber pill, a colour reserved for
            "start" buttons, so it reads as something to tap at a glance and
            stays apart from the blue icon tile. Phones get a compact pill on
            the title row, so the description keeps the full width below;
            wider screens get a larger one on the right. Only one shows. */}
        <span className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
            {icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-start justify-between gap-2">
              <span className="font-medium">{title}</span>
              <span className={`${PILL} gap-1 px-2.5 py-1 text-xs sm:hidden`}>
                {actionLabel}
                <ArrowRightIcon size={12} weight="bold" aria-hidden className={ARROW} />
              </span>
            </span>
            <span className="block text-sm text-ink-faint">{description}</span>
          </span>
          <span className={`${PILL} hidden gap-1.5 px-4 py-2 text-sm sm:flex`}>
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
