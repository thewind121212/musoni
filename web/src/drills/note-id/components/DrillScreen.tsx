import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../../app/store'
import { useDrillStore } from '../store'
import { Staff } from '../../../core/components/Staff'
import { playPitch } from '../../../core/audio/playPitch'
import { FEEDBACK_MS } from '../../../config/constants'

export function DrillScreen() {
  const navigate = useNavigate()
  const sound = useAppStore(s => s.settings.sound)
  const { status, question, endsAt, correct, streak, feedback } = useDrillStore()

  const [, setNow] = useState(0)
  useEffect(() => {                       // clock: advance store + force re-render for countdown
    const id = setInterval(() => {
      useDrillStore.getState().tick()
      setNow(n => n + 1)
    }, 250)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {                       // feedback → next question
    if (!feedback) return
    const id = setTimeout(() => useDrillStore.getState().nextQuestion(), FEEDBACK_MS)
    return () => clearTimeout(id)
  }, [feedback])
  useEffect(() => { if (status === 'finished') navigate('/results') }, [status, navigate])
  useEffect(() => {                       // keys 1..8 answer options (desktop)
    const onKey = (e: KeyboardEvent) => {
      const i = Number(e.key) - 1
      const s = useDrillStore.getState()
      if (!s.question || s.feedback || i < 0 || i >= s.question.options.length) return
      s.answer(i)
      if (useAppStore.getState().settings.sound) playPitch(s.question.pitch)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (!question) return null
  const secondsLeft = endsAt ? Math.max(0, Math.ceil((endsAt - Date.now()) / 1000)) : 0

  return (
    <div className="screen">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>{secondsLeft}s</strong><span>✓ {correct}</span><span>🔥 {streak}</span>
      </div>
      <Staff clef={question.clef} pitch={question.pitch} />
      <div className="btn-grid">
        {question.options.map((o, i) => {
          const cls = feedback
            ? i === feedback.correctIndex ? 'correct' : i === feedback.chosenIndex ? 'wrong' : ''
            : ''
          return (
            <button key={o.label} className={`btn ${cls}`} disabled={!!feedback}
              onClick={() => {
                useDrillStore.getState().answer(i)
                if (sound) playPitch(useDrillStore.getState().question!.pitch)
              }}>
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
