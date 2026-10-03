import { Suspense } from 'react'
import { Routes, Route, Navigate, NavigationType, useLocation, useNavigationType } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { HomeScreen } from '@/app/pages/HomeScreen'
import { DrillLoading } from '@/app/pages/DrillLoading'
import { PageTransition } from '@/app/components/templates'
// VexFlow is the heaviest dependency in the app and only the drills need it,
// so each drill route is split out and the home screen paints without it.
import { HearPlayDrillPage, NoteIdDrillPage } from '@/app/routes'

/**
 * App-level routes only. Each drill owns one route and runs its own phases
 * internally, so training never changes the URL. Account and library
 * routes join this table later.
 */
export default function App() {
  const location = useLocation()
  // Back and forward (the browser buttons, a phone's edge-swipe, the in-app
  // back links) swap routes with no motion: going back lands on the page as it
  // was. Only moving forward slides in.
  const instant = useNavigationType() === NavigationType.Pop
  return (
    <AnimatePresence mode="wait" initial={false} custom={instant}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition instant={instant}><HomeScreen /></PageTransition>} />
        <Route
          path="/train/note-id"
          element={
            <PageTransition instant={instant}>
              <Suspense fallback={<DrillLoading />}>
                <NoteIdDrillPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/train/hear-play"
          element={
            <PageTransition instant={instant}>
              <Suspense fallback={<DrillLoading />}>
                <HearPlayDrillPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
