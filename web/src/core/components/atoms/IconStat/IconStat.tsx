import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  label: string
  value: string
}

/** A figure with its mark beside it and its name above it. Shares a row equally with its siblings. */
export function IconStat({ icon, label, value }: Props) {
  return (
    <div className="flex flex-1 items-center gap-2">
      <span className="shrink-0 text-ink-faint">{icon}</span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[10px] tracking-wide text-ink-faint uppercase">{label}</span>
        <span className="tnum text-sm font-semibold">{value}</span>
      </span>
    </div>
  )
}
