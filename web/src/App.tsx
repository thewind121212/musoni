import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { HomeScreen } from './app/HomeScreen'
import { PageTransition } from './app/PageTransition'

// VexFlow is the heaviest dependency in the app and only the drill needs it,
// so the drill route is split out and the home screen paints without it.
const NoteIdDrill = lazy(() =>
  import('./drills/note-id/NoteIdDrill').then(m => ({ default: m.NoteIdDrill })),
)

/**
 * App-level routes only. Each drill owns one route and runs its own phases
 * internally, so training never pushes history entries. Account and library
 * routes join this table later.
 */
export default function App() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomeScreen /></PageTransition>} />
        <Route
          path="/train/note-id"
          element={
            <PageTransition>
              <Suspense fallback={<div className="mx-auto max-w-md px-4 pt-10 text-ink-faint" />}>
                <NoteIdDrill />
              </Suspense>
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}
