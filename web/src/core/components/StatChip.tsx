import type { ReactNode } from 'react'

/**
 * A single labelled figure. Numbers on their own read as noise, so every stat
 * carries its mark and its name alongside the value.
 */
export function StatChip({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-line px-3 py-2">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface text-ink-soft">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
          {label}
        </span>
        <span className="tnum truncate text-sm leading-tight font-semibold text-ink">{value}</span>
      </span>
    </div>
  )
}
