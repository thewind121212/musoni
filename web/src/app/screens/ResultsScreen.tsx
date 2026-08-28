import { Navigate, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'
import { useDrillStore } from '../../drills/note-id/store'
import { getBest } from '../../progress/progressStore'

export function ResultsScreen() {
  const { settings, level, setLevel } = useAppStore()
  const navigate = useNavigate()
  const result = useDrillStore(s => s.lastResult)
  if (!result) return <Navigate to="/" replace />
  const best = getBest('note-id', result.level)
  const isNewBest = best !== null && best.practiceScore === result.practiceScore
  const again = (l: 1 | 2 | 3 | 4) => {
    setLevel(l)
    useDrillStore.getState().start(l, settings)
    navigate('/drill')
  }
  return (
    <div className="screen">
      <h2>{isNewBest ? '🏆 New best!' : 'Session done'}</h2>
      <div className="card">
        <p><strong>{result.practiceScore}</strong> practice score (weight ×{result.weight})</p>
        <p>✓ {result.correct} correct · {Math.round(result.accuracy * 100)}% accuracy</p>
        <p>⏱ {(result.avgMs / 1000).toFixed(1)}s avg answer · 🔥 {result.bestStreak} best streak</p>
        {!isNewBest && best && <p>Your best at L{result.level}: {best.practiceScore}</p>}
      </div>
      <div className="btn-row">
        <button className="btn active" onClick={() => again(level)}>Again</button>
        {level < 4 && (
          <button className="btn" onClick={() => again((level + 1) as 1 | 2 | 3 | 4)}>
            Next level →
          </button>
        )}
        <button className="btn" onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  )
}
