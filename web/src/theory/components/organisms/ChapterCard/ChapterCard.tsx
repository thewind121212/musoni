import type { ReactNode } from 'react'
import { CaretDownIcon } from '@phosphor-icons/react'

interface Props {
  number: number
  title: string
  /** "1/4 bài", or "4 bài" before any is done. */
  detail: string
  /** The chapter the reader is in: its number tile is filled. */
  current: boolean
  open: boolean
  onToggle: () => void
  /** The lesson rows, shown while open. */
  children: ReactNode
}

/**
 * A chapter on the theory list: its number, title and progress, opening to its
 * lessons. The chapter holding the next lesson opens by default.
 */
export function ChapterCard({ number, title, detail, current, open, onToggle, children }: Props) {
  const id = `chapter-${number}`
  return (
    <section className="rounded-2xl border border-line bg-raised">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span
          className={'tnum flex size-8 shrink-0 items-center justify-center rounded-[10px] border text-sm font-semibold '
            + (current ? 'border-accent bg-accent text-accent-ink' : 'border-line bg-surface text-ink-soft')}
        >
          {number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold">{title}</span>
          <span className="block text-[13px] text-ink-faint">{detail}</span>
        </span>
        <CaretDownIcon
          size={16} weight="bold" aria-hidden
          className={'shrink-0 text-ink-faint transition-transform duration-200 ' + (open ? 'rotate-180' : '')}
        />
      </button>
      {open && <div id={id} className="px-4 pb-1.5">{children}</div>}
    </section>
  )
}
