import type { ReactNode } from 'react'

export interface Stat {
  icon: ReactNode
  label: string
  value: string
}

/**
 * Labelled figures side by side in one bordered strip, split by hairlines.
 * Numbers on their own read as noise, so every stat carries its mark and its
 * name above the value.
 *
 * Columns share the width equally and labels and values wrap instead of pushing the strip
 * wider: three separate chips that refused to shrink used to run past the card
 * edge on a 375px phone.
 */
export function StatStrip({ stats }: { stats: Stat[] }) {
  return (
    <div
      className="grid divide-x divide-line rounded-xl border border-line"
      style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
    >
      {stats.map(s => (
        <div key={s.label} className="flex min-w-0 flex-col gap-1 px-3 py-2.5">
          <span className="flex items-start gap-1 text-[10px] leading-tight font-semibold tracking-wide text-ink-faint uppercase">
            <span className="flex shrink-0">{s.icon}</span>
            <span className="min-w-0">{s.label}</span>
          </span>
          <span className="text-sm leading-tight font-semibold break-words text-ink">{s.value}</span>
        </div>
      ))}
    </div>
  )
}
