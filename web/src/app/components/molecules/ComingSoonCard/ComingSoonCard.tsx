import type { ReactNode } from 'react'
import { LockSimpleIcon } from '@phosphor-icons/react'

interface Props {
  icon: ReactNode
  title: string
  description: string
}

/** A drill that is not open yet: dashed, muted and locked, so it reads as a promise rather than a button. */
export function ComingSoonCard({ icon, title, description }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-dashed border-line p-5">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line text-ink-faint">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-medium text-ink-soft">{title}</span>
        <span className="block text-sm text-ink-faint">{description}</span>
      </span>
      <LockSimpleIcon size={16} className="text-ink-faint" />
    </div>
  )
}
