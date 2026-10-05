import type { ReactNode } from 'react'
import { XIcon } from '@phosphor-icons/react'
import { StepBar } from '../../atoms'

interface Props {
  closeLabel: string
  onClose: () => void
  total: number
  filled: number
  progressLabel: string
  /** The sticky bar at the bottom ("Tiếp"); none on the end screen. */
  footer?: ReactNode
  children: ReactNode
}

/**
 * The lesson's shell: ✕ and the step bar on top, the step in the middle, and
 * a sticky bar with the next button at the bottom, in the thumb zone. One
 * column, a little wider on desktop.
 */
export function LessonFrame({ closeLabel, onClose, total, filled, progressLabel, footer, children }: Props) {
  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col md:max-w-xl">
      <header className="flex h-14 shrink-0 items-center gap-3 pr-4 pl-2">
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-ink-soft transition-colors
                     duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
        >
          <XIcon size={20} weight="bold" />
        </button>
        <StepBar total={total} filled={filled} label={progressLabel} />
      </header>
      <main className="flex flex-1 flex-col px-4 pt-2 pb-6 md:pt-6">{children}</main>
      {footer && (
        <div className="sticky bottom-0 z-10 border-t border-line bg-surface px-4 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          {footer}
        </div>
      )}
    </div>
  )
}
