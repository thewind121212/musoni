import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { PlayIcon } from '@phosphor-icons/react'
import { StatStrip, type Stat } from '@/core/components/molecules'

interface Props {
  /** Route the drill lives at. */
  to: string
  icon: ReactNode
  title: string
  description: string
  /** The start button, e.g. "Practice now". */
  actionLabel: string
  /** The quieter link to the drill's setup, e.g. "Change setup". */
  setupLabel: string
  /** The drill's current setup and best score, shown under the title. */
  stats: Stat[]
}

/**
 * A drill the reader can start in one tap. The amber button starts a session
 * on the setup already shown in the stats; changing that setup is the quieter
 * link underneath, since most days the reader practises what they did last.
 */
export function PracticeCard({ to, icon, title, description, actionLabel, setupLabel, stats }: Props) {
  const reduce = useReducedMotion()
  return (
    <div className="rounded-2xl border border-line bg-raised p-5">
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-ink-faint">{description}</p>
        </div>
      </div>

      <div className="mt-4">
        <StatStrip stats={stats} />
      </div>

      <div className="mt-4 flex flex-col items-stretch gap-1 sm:flex-row-reverse sm:items-center sm:gap-4">
        <motion.div whileTap={reduce ? undefined : { scale: 0.98 }} className="sm:w-56">
          {/* The drill page reads `autostart` and opens straight into a session. */}
          <Link
            to={to}
            state={{ autostart: true }}
            className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-cta text-base font-semibold
                       text-cta-ink shadow-sm transition-[filter] duration-150 hover:brightness-95
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <PlayIcon size={18} weight="fill" aria-hidden />
            {actionLabel}
          </Link>
        </motion.div>
        {/* `setup` opens the setup phase even if a finished session is still held. */}
        <Link
          to={to}
          state={{ setup: true }}
          className="self-center rounded-lg px-3 py-2 text-sm font-medium text-ink-soft underline
                     decoration-line underline-offset-4 transition-colors duration-150 hover:text-ink
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {setupLabel}
        </Link>
      </div>
    </div>
  )
}
