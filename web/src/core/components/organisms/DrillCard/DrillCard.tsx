import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PlayIcon } from '@phosphor-icons/react'
import { StatStrip, type Stat } from '@/core/components/molecules'

interface Props {
  icon: ReactNode
  title: string
  /** One line under the title. Shown until the drill has stats to show instead. */
  description: string
  /** Where tapping the card goes: the drill's setup. */
  to: string
  toState?: unknown
  /** Played: its level, length and best, under the title. */
  stats?: Stat[]
  /** Played: one start button on the right ("Luyện"). */
  action?: { label: string; to: string; state?: unknown }
  /** Not played yet: a chip instead of empty stats ("Chưa tập", "Mới mở"). `new` is the blue one. */
  chip?: { label: string; tone?: 'plain' | 'new' }
}

/**
 * One drill on a list. A drill not played yet says so in a chip, with no
 * empty figures; once played it shows its setup and best, and a start button
 * that opens straight into a session. Anywhere else on the card opens its
 * setup. Set `data-drill` on a wrapper for the drill's own button colour.
 */
export function DrillCard({ icon, title, description, to, toState, stats, action, chip }: Props) {
  return (
    <div className="relative rounded-2xl border border-line bg-raised p-4 transition-colors duration-150 hover:border-ink-faint md:p-5">
      <div className="flex items-center gap-3 md:gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink md:size-12">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          {/* The title's link covers the card, so a tap anywhere opens setup; the button sits above it. */}
          <Link
            to={to}
            state={toState}
            className="font-semibold leading-snug outline-none after:absolute after:inset-0 after:rounded-2xl
                       focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {title}
          </Link>
          {!stats && <p className="text-sm leading-snug text-ink-faint">{description}</p>}
        </div>
        {chip && (
          <span
            className={
              'shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ' +
              (chip.tone === 'new' ? 'bg-accent/12 text-accent' : 'border border-line text-ink-soft')
            }
          >
            {chip.label}
          </span>
        )}
        {action && (
          <Link
            to={action.to}
            state={action.state}
            className="relative z-10 flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-cta px-4 text-[15px]
                       font-semibold text-cta-ink shadow-sm transition-[filter] duration-150 hover:brightness-95
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <PlayIcon size={15} weight="fill" aria-hidden />
            {action.label}
          </Link>
        )}
      </div>
      {stats && (
        <div className="mt-3">
          <StatStrip stats={stats} />
        </div>
      )}
    </div>
  )
}
