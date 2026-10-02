import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { CaretRightIcon } from '@phosphor-icons/react'
import { StatStrip, type Stat } from '@/core/components/molecules'

interface Props {
  /** Route the card opens. */
  to: string
  icon: ReactNode
  title: string
  description: string
  /** The drill's current setup and best score, shown under the title. */
  stats: Stat[]
}

/** A drill the reader can start: the whole card is one link, with its setup at a glance. */
export function PracticeCard({ to, icon, title, description, stats }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div whileTap={reduce ? undefined : { scale: 0.98 }}>
      <Link
        to={to}
        className="group block rounded-2xl border border-line bg-raised p-5
                   transition-colors duration-150 hover:border-accent
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
            {icon}
          </span>
          <span className="flex-1">
            <span className="block font-medium">{title}</span>
            <span className="block text-sm text-ink-faint">{description}</span>
          </span>
          <CaretRightIcon
            size={18}
            className="text-ink-faint transition-transform duration-150 group-hover:translate-x-1"
          />
        </span>

        <span className="mt-4 block">
          <StatStrip stats={stats} />
        </span>
      </Link>
    </motion.div>
  )
}
