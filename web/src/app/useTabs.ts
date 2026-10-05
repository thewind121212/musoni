import { useLocation, useNavigate } from 'react-router-dom'

/*
 * The two tabs, Luyện (`/`, the default) and Học (`/learn`). Rules
 * (docs/fe/screens.md, "Tabs"): switching is instant, with no slide. Học
 * opened from Luyện's tab bar sits one history entry above it, so back (and
 * the Luyện tab) returns to Luyện; tapping Luyện from a Học opened any other
 * way replaces it, so tab switching never piles up history.
 */

export type Tab = 'practice' | 'learn'

export const TAB_ROUTE: Record<Tab, string> = { practice: '/', learn: '/learn' }

/** The tab a path shows, or null off the tabs (drills, lessons, first open). */
export function tabAt(path: string): Tab | null {
  return path === TAB_ROUTE.practice ? 'practice' : path === TAB_ROUTE.learn ? 'learn' : null
}

/** Route state of a tab opened from the tab bar. */
export const FROM_TAB = { tab: true } as const

/** Whether a route's state says the tab bar opened it: shown at once, with no slide. */
export function fromTab(state: unknown): boolean {
  return typeof state === 'object' && state !== null && (state as { tab?: unknown }).tab === true
}

/** The tab on screen, and the way to another one, by the rules above. */
export function useTabNav() {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const current = tabAt(pathname)
  const go = (tab: Tab) => {
    if (tab === current) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (tab === 'learn') {
      navigate(TAB_ROUTE.learn, { state: FROM_TAB })
    } else if (fromTab(state)) {
      navigate(-1)
    } else {
      navigate(TAB_ROUTE.practice, { replace: true, state: FROM_TAB })
    }
  }
  return { current, go }
}
