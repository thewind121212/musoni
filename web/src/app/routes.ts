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
const chapterList = splitPage(() => import('@/theory/pages/ChapterList').then(m => m.ChapterList))
const lessonPlayer = splitPage(() => import('@/theory/pages/LessonPlayer').then(m => m.LessonPlayer))
const theoryAbout = splitPage(() => import('@/theory/pages/TheoryAbout').then(m => m.TheoryAbout))
export const NoteIdDrillPage = noteId.Page
export const HearPlayDrillPage = hearPlay.Page
export const loadNoteIdDrill = noteId.prefetch
export const loadHearPlayDrill = hearPlay.prefetch
export const ChapterListPage = chapterList.Page
export const LessonPlayerPage = lessonPlayer.Page
export const TheoryAboutPage = theoryAbout.Page
export const loadChapterList = chapterList.prefetch
export const loadLessonPlayer = lessonPlayer.prefetch

type TheoryRegistry = typeof import('@/theory/registry')
let theory: TheoryRegistry | undefined
/**
 * The theory chapters (every lesson's text), for home's theory card. Split out
 * like the pages, so home's first paint does not carry the lesson text; once
 * loaded, `loadedTheory` hands it over without waiting.
 */
export function loadTheory(): Promise<TheoryRegistry> {
  return import('@/theory/registry').then(m => (theory = m))
}
export const loadedTheory = () => theory

/** Fetch a route's code when the browser is idle. Errors are left to the real load. */
export function prefetchWhenIdle(load: () => Promise<unknown>) {
  const run = () => { load().catch(() => {}) }
  if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 2000 })
  else setTimeout(run, 500)
}
