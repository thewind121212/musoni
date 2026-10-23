import { Suspense, useLayoutEffect, type ReactNode } from 'react'
import { Routes, Route, Navigate, NavigationType, useLocation, useNavigationType } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { PracticeTab } from '@/app/pages/PracticeTab'
import { TabChrome } from '@/app/pages/TabChrome'
import { DrillRoute } from '@/app/pages/DrillRoute'
import { DrillLoading } from '@/app/pages/DrillLoading'
import { PageTransition } from '@/app/components/templates'
import { allDrills, drillColourCss } from '@/app/drills'
import { fromTab, modeAt, TAB_ROUTE } from '@/app/useTabs'
// VexFlow is the heaviest dependency in the app and only the drills and
// lessons need it, so each of those routes is split out and Luyện paints without it.
import { ChapterListPage, LearnTabPage, LessonPlayerPage, TheoryAboutPage } from '@/app/routes'

/**
 * App-level routes. Two tabs, Luyện (`/`) and Học (`/learn`). Each registered drill owns one route,
 * `/train/<id>`, and runs its phases internally, so training never changes the
 * URL. Theory lessons have three: the chapter list, one lesson (its steps are
 * store state), and the content's licence notice.
 */
export default function App() {
  const location = useLocation()
  // Practice is amber, learning blue: the mode's colour sits on <html> so the
  // tab bar, every action button and sheets portalled to <body> follow it.
  // Layout effect: a page never paints in the other mode's colour first.
  const mode = modeAt(location.pathname)
  useLayoutEffect(() => { document.documentElement.dataset.mode = mode }, [mode])
  // Back and forward (the browser buttons, a phone's edge-swipe, the in-app
  // back links) swap routes with no motion: going back lands on the page as it
  // was. Only moving forward slides in; switching tabs is instant too.
  const instant = useNavigationType() === NavigationType.Pop || fromTab(location.state)
  const page = (children: ReactNode) => <PageTransition instant={instant}>{children}</PageTransition>
  const lazyPage = (children: ReactNode) => page(<Suspense fallback={<DrillLoading what="lesson" />}>{children}</Suspense>)
  return (
    <>
      {/* Each drill's own action colour, from its registry entry. */}
      <style>{drillColourCss()}</style>
      <TabChrome />
      <AnimatePresence mode="wait" initial={false} custom={instant}>
        <Routes location={location} key={location.pathname}>
          <Route path={TAB_ROUTE.practice} element={page(<PracticeTab />)} />
          <Route path={TAB_ROUTE.learn} element={lazyPage(<LearnTabPage />)} />
          {allDrills().map(drill => (
            <Route key={drill.id} path={drill.route} element={page(<DrillRoute drill={drill} />)} />
          ))}
          <Route path="/theory" element={lazyPage(<ChapterListPage />)} />
          <Route path="/theory/about" element={lazyPage(<TheoryAboutPage />)} />
          <Route path="/theory/:chapter/:lesson" element={lazyPage(<LessonPlayerPage />)} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
