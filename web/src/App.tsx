import { Suspense, type ReactNode } from 'react'
import { Routes, Route, Navigate, NavigationType, useLocation, useNavigationType } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { PracticeTab } from '@/app/pages/PracticeTab'
import { FirstOpen } from '@/app/pages/FirstOpen'
import { TabChrome } from '@/app/pages/TabChrome'
import { DrillRoute } from '@/app/pages/DrillRoute'
import { DrillLoading } from '@/app/pages/DrillLoading'
import { PageTransition } from '@/app/components/templates'
import { useAppStore } from '@/app/store'
import { allDrills, drillColourCss } from '@/app/drills'
import { fromTab, TAB_ROUTE } from '@/app/useTabs'
import { needsFirstOpen, WELCOME_ROUTE } from '@/app/firstOpen'
import { hasHistory } from '@/progress/progressStore'
// VexFlow is the heaviest dependency in the app and only the drills and
// lessons need it, so each of those routes is split out and Luyện paints without it.
import { ChapterListPage, LearnTabPage, LessonPlayerPage, TheoryAboutPage } from '@/app/routes'

/** A tab: the first-open question comes first for a reader who has not answered it and has done nothing yet. */
function TabRoute({ children }: { children: ReactNode }) {
  const startPoint = useAppStore(s => s.settings.startPoint)
  if (needsFirstOpen(startPoint, hasHistory())) return <Navigate to={WELCOME_ROUTE} replace />
  return children
}

/**
 * App-level routes. Two tabs, Luyện (`/`) and Học (`/learn`), and the
 * first-open question (`/welcome`). Each registered drill owns one route,
 * `/train/<id>`, and runs its phases internally, so training never changes the
 * URL. Theory lessons have three: the chapter list, one lesson (its steps are
 * store state), and the content's licence notice.
 */
export default function App() {
  const location = useLocation()
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
          <Route path={TAB_ROUTE.practice} element={<TabRoute>{page(<PracticeTab />)}</TabRoute>} />
          <Route path={TAB_ROUTE.learn} element={<TabRoute>{lazyPage(<LearnTabPage />)}</TabRoute>} />
          <Route path={WELCOME_ROUTE} element={page(<FirstOpen />)} />
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
