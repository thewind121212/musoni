import { createElement, lazy, useState, type ComponentType } from 'react'

/**
 * A code-split page. Each drill route carries VexFlow and its music font, the
 * heaviest part of the app, so it loads on its own; home starts fetching it
 * once idle, so by the time the reader taps Practice it is usually already in.
 *
 * Once loaded, `Page` renders it directly. A lazy component suspends for a
 * tick even on cached code, and React then holds the Suspense fallback for
 * ~300 ms: a blank page, then the drill snapping in after the slide.
 */
function splitPage(load: () => Promise<ComponentType>) {
  let loaded: ComponentType | undefined
  const prefetch = () => load().then(c => (loaded = c))
  const Lazy = lazy(() => prefetch().then(c => ({ default: c })))
  function Page() {
    // Picked once per mount: switching type later would remount the drill.
    const [C] = useState<ComponentType>(() => loaded ?? Lazy)
    return createElement(C)
  }
  return { Page, prefetch }
}

const noteId = splitPage(() => import('@/drills/note-id/pages/NoteIdDrill').then(m => m.NoteIdDrill))
const hearPlay = splitPage(() => import('@/drills/hear-play/pages/HearPlayDrill').then(m => m.HearPlayDrill))
export const NoteIdDrillPage = noteId.Page
export const HearPlayDrillPage = hearPlay.Page
export const loadNoteIdDrill = noteId.prefetch
export const loadHearPlayDrill = hearPlay.prefetch

/** Fetch a route's code when the browser is idle. Errors are left to the real load. */
export function prefetchWhenIdle(load: () => Promise<unknown>) {
  const run = () => { load().catch(() => {}) }
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 2000 })
  else setTimeout(run, 500)
}
