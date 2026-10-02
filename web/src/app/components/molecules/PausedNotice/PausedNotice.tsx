import { Link } from 'react-router-dom'
import { PlayIcon } from '@phosphor-icons/react'

interface Props {
  title: string
  detail: string
  actionLabel: string
  /** The drill route holding the paused session. */
  to: string
}

/**
 * A session left mid-way (back, swipe) waits paused in its drill. This bar
 * says so on home and takes the reader straight back into it, so leaving by
 * accident costs nothing and the session is not silently lost.
 */
export function PausedNotice({ title, detail, actionLabel, to }: Props) {
  return (
    <div
      role="status"
      className="fixed inset-x-3 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-md
                 items-center gap-3 rounded-2xl bg-ink py-3 pr-3 pl-4 text-raised shadow-xl"
    >
      <div className="min-w-0 flex-1 text-sm leading-snug">
        <div className="font-semibold">{title}</div>
        <div className="opacity-75">{detail}</div>
      </div>
      {/* The drill page reads `resume` and carries on where the reader left off. */}
      <Link
        to={to}
        state={{ resume: true }}
        className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-cta px-4 text-sm font-semibold
                   text-cta-ink transition-[filter] duration-150 hover:brightness-95
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta"
      >
        <PlayIcon size={14} weight="fill" aria-hidden />
        {actionLabel}
      </Link>
    </div>
  )
}
