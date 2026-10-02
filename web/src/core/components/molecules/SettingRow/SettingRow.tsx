import type { ReactNode } from 'react'

interface Props {
  label: string
  /** One short line under the label. */
  hint?: string
  /** The control on the right: a Switch or a compact SegmentedControl. */
  children: ReactNode
}

/**
 * One setting as a row: what it is on the left, its control on the right.
 * Rows stack inside a Panel-like list, so preferences that need no picture
 * take a line each instead of a pair of cards.
 */
export function SettingRow({ label, hint, children }: Props) {
  return (
    <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-2.5">
      <div className="min-w-0">
        <div className="text-[15px] leading-snug font-medium text-ink">{label}</div>
        {hint && <div className="text-xs leading-snug text-ink-faint">{hint}</div>}
      </div>
      {children}
    </div>
  )
}
