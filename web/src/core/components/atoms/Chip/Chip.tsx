import type { ReactNode } from 'react'

/** A small outlined label for a secondary fact, such as a score multiplier. */
export function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-line px-2 py-0.5 text-xs">{children}</span>
}
