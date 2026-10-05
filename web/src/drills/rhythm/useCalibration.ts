import { useCallback, useEffect, useRef, useState } from 'react'
import { latencyFrom, type Calibration } from './calibrate'
import { audioNow, audioTimeAt, scheduleClicks, stopClicks, wakeAudio } from './metronome'
import { RHYTHM_CALIBRATION, RHYTHM_FRAME_MS, RHYTHM_LEAD_SEC } from '@/config/constants'
import type { CalibrationStatus } from './components/organisms'

/**
 * Setup's latency calibration: plays `RHYTHM_CALIBRATION.clicks` clicks,
 * collects the taps on the audio clock, and once the last click has passed
 * works out the latency (`latencyFrom`). A good result goes to `onSaved`.
 * Space taps too while it runs.
 */
export function useCalibration(onSaved: (latencyMs: number) => void) {
  const [status, setStatus] = useState<CalibrationStatus>('idle')
  const [heard, setHeard] = useState(0)
  const [outcome, setOutcome] = useState<Calibration | null>(null)
  const run = useRef<{ clicks: number[]; taps: number[]; timer: ReturnType<typeof setInterval> } | null>(null)
  const saved = useRef(onSaved)
  useEffect(() => { saved.current = onSaved }, [onSaved])

  const stop = useCallback(() => {
    if (run.current) clearInterval(run.current.timer)
    run.current = null
    stopClicks()
  }, [])
  useEffect(() => stop, [stop])

  const start = useCallback(() => {
    stop()
    wakeAudio()
    const { clicks: count, bpm } = RHYTHM_CALIBRATION
    const gap = 60 / bpm
    const first = audioNow() + RHYTHM_LEAD_SEC + gap
    const clicks = Array.from({ length: count }, (_, i) => first + i * gap)
    scheduleClicks(clicks.map((at, i) => ({ at, accent: i === 0 })))
    // Listen as long as a tap may still count for the last click.
    const end = clicks[count - 1] + RHYTHM_CALIBRATION.maxMs / 1000
    const timer = setInterval(() => {
      const r = run.current
      if (!r) return
      const t = audioTimeAt(performance.now())
      setHeard(clicks.filter(c => c <= t).length)
      if (t < end) return
      const result = latencyFrom(r.clicks.map(c => c * 1000), r.taps)
      stop()
      setOutcome(result)
      setStatus('done')
      if (result.ok) saved.current(result.latencyMs)
    }, RHYTHM_FRAME_MS)
    run.current = { clicks, taps: [], timer }
    setHeard(0)
    setOutcome(null)
    setStatus('running')
  }, [stop])

  const tap = useCallback((timeStamp: number) => {
    wakeAudio()
    run.current?.taps.push(audioTimeAt(timeStamp) * 1000)
  }, [])

  const reset = useCallback(() => {
    stop()
    setStatus('idle')
    setOutcome(null)
    setHeard(0)
  }, [stop])

  useEffect(() => {
    if (status !== 'running') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== ' ' || e.repeat) return
      e.preventDefault()
      tap(e.timeStamp)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status, tap])

  return { status, heard, total: RHYTHM_CALIBRATION.clicks, outcome, start, tap, reset }
}
