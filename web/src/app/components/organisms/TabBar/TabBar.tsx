import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface TabItem<T extends string = string> {
  id: T
  label: string
  /** Drawn filled when the tab is on screen, outlined otherwise. */
  icon: (active: boolean) => ReactNode
  to: string
}

interface Props<T extends string> {
  tabs: TabItem<T>[]
  current: T
  /** The page decides how a tab opens (push, step back or replace). */
  onSelect: (tab: T) => void
  label: string
  /** The app's name, beside the tabs on a wide screen. */
  brand: string
}

/**
 * The app's tabs. On a phone, a bar pinned to the bottom within thumb reach;
 * from `md` up, the same tabs as a segmented control in a bar at the top,
 * beside the app's name. Each tab is a real link, so it can open in a new tab.
 */
export function TabBar<T extends string>({ tabs, current, onSelect, label, brand }: Props<T>) {
  const select = (e: MouseEvent, tab: T) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onSelect(tab)
  }
  return (
    <nav
      aria-label={label}
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-raised/95 pb-[env(safe-area-inset-bottom)]
                 backdrop-blur-md md:sticky md:top-0 md:bottom-auto md:border-t-0 md:border-b md:bg-surface/90 md:pb-0"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 md:flex md:max-w-4xl md:items-center md:gap-1 md:px-8 md:py-2.5">
        <span className="hidden text-lg font-semibold tracking-tight md:mr-auto md:block">{brand}</span>
        {tabs.map(tab => {
          const active = tab.id === current
          return (
            <Link
              key={tab.id}
              to={tab.to}
              onClick={e => select(e, tab.id)}
              aria-current={active ? 'page' : undefined}
              className={
                'flex h-16 flex-col items-center justify-center gap-0.5 text-xs font-semibold transition-colors duration-150 ' +
                'focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent ' +
                'md:h-10 md:flex-row md:gap-2 md:rounded-full md:px-4 md:text-sm ' +
                (active ? 'text-accent md:bg-accent/10' : 'text-ink-faint hover:text-ink')
              }
            >
              {tab.icon(active)}
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
