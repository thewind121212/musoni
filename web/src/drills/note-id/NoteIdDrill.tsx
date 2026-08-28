import { useDrillStore } from './store'
import { SetupPhase } from './phases/SetupPhase'
import { RunPhase } from './phases/RunPhase'
import { ResultPhase } from './phases/ResultPhase'

/**
 * One route, three phases. Training never changes the URL: starting, finishing
 * and retrying a session are store transitions, so the back button belongs to
 * the app (home, and later account pages) rather than to the drill.
 */
export function NoteIdDrill() {
  const phase = useDrillStore(s => s.phase)
  if (phase === 'running') return <RunPhase />
  if (phase === 'finished') return <ResultPhase />
  return <SetupPhase />
}
