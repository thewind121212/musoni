import type { ReactNode } from 'react'
import { LightbulbIcon } from '@phosphor-icons/react'

/** A practical hint in a soft blue box. */
export function TipBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2.5 rounded-2xl bg-accent/10 px-4 py-3 text-[15px] leading-normal text-ink">
      <LightbulbIcon size={18} weight="fill" aria-hidden className="mt-0.5 shrink-0 text-accent" />
      <p className="min-w-0">{children}</p>
    </div>
  )
}
