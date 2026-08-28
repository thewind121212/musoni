import type { ReactNode } from 'react'

/** A raised surface. Radius lock: every surface in the app is rounded-2xl. */
export function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-raised p-5 ${className}`}>
      {children}
    </section>
  )
}
