import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store'
import { useDrillStore } from '../../drills/note-id/store'
import { getBest } from '../../progress/progressStore'
import { WeekStrip } from '../WeekStrip'

export function HomeScreen() {
  const { settings, level, setLevel } = useAppStore()
  const navigate = useNavigate()
  const best = getBest('note-id', level)
  const startDrill = () => {
    useDrillStore.getState().start(level, settings)
    navigate('/drill')
  }
  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>musoni</h1>
        <button className="btn" onClick={() => navigate('/settings')}>⚙</button>
      </div>
      <div className="card">
        <h2>Note Identification</h2>
        <div className="btn-row">
          {([1, 2, 3, 4] as const).map(l => (
            <button key={l} className={`btn ${level === l ? 'active' : ''}`}
              onClick={() => setLevel(l)}>L{l}</button>
          ))}
        </div>
        <p>{best
          ? `Best: ${best.practiceScore} · ${Math.round(best.accuracy * 100)}%`
          : 'Not played yet'}</p>
        <button className="btn active" style={{ width: '100%' }} onClick={startDrill}>
          Start (60s)
        </button>
      </div>
      <WeekStrip />
    </div>
  )
}
