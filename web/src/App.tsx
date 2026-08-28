import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomeScreen } from './app/HomeScreen'

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
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route
        path="/train/note-id"
        element={
          <Suspense fallback={<div className="mx-auto max-w-md px-4 pt-10 text-ink-faint">Loading drill</div>}>
            <NoteIdDrill />
          </Suspense>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
