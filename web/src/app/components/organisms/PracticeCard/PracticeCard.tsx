import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { StatStrip, type Stat } from '@/core/components/molecules'

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
        {/* Phones put the label on its own line under the title: beside it, the
            title and description were squeezed into a narrow, many-line column. */}
        <span className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
            {icon}
          </span>
          <span>
            <span className="block font-medium">{title}</span>
            <span className="block text-sm text-ink-faint">{description}</span>
          </span>
          <span
            className="col-start-2 justify-self-start rounded-full bg-accent/10 px-3 py-1.5 text-sm font-semibold
                       text-accent transition-colors duration-150 group-hover:bg-accent group-hover:text-accent-ink
                       sm:col-start-3 sm:justify-self-end"
          >
            {actionLabel}
          </span>
        </span>

        <span className="mt-4 block">
          <StatStrip stats={stats} />
        </span>
      </Link>
    </motion.div>
  )
}
