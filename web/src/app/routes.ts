/**
 * Code-split route loaders. Each drill route carries VexFlow and its music
 * font, the heaviest part of the app, so it loads on its own; home starts
 * fetching it once idle, so by the time the reader taps Practice it is
 * usually already in the cache.
 */
export const loadNoteIdDrill = () =>
  import('@/drills/note-id/pages/NoteIdDrill').then(m => ({ default: m.NoteIdDrill }))
export const loadHearPlayDrill = () =>
  import('@/drills/hear-play/pages/HearPlayDrill').then(m => ({ default: m.HearPlayDrill }))

/** Fetch a route's code when the browser is idle. Errors are left to the real load. */
export function prefetchWhenIdle(load: () => Promise<unknown>) {
  const run = () => { load().catch(() => {}) }
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 2000 })
  else setTimeout(run, 500)
}
