import { RHYTHM_CLICK } from '@/config/constants'

/*
 * The metronome and the clock taps are judged on. Clicks are scheduled on the
 * Web Audio clock, so they keep time whatever the page is doing, and a tap's
 * event time is turned into the audio-clock time the reader was hearing at
 * that moment (`audioTimeAt`), so a tap and the click it follows compare on
 * one clock. The drill's own context: core's piano context is private to it,
 * and this drill plays no piano.
 *
 * Without Web Audio (tests, very old browsers) the page clock stands in and
 * nothing sounds.
 */

let ctx: AudioContext | null | undefined

function context(): AudioContext | null {
  if (ctx !== undefined) return ctx
  try {
    ctx = typeof AudioContext === 'undefined' ? null : new AudioContext({ latencyHint: 'interactive' })
  } catch {
    ctx = null
  }
  return ctx
}

/** Starts the audio clock if the browser holds it (call from a tap or a click: a user gesture). */
export function wakeAudio(): void {
  const a = context()
  if (a?.state === 'suspended') void a.resume().catch(() => {})
}

/** Whether the audio clock runs, so a measure can be timed on it. True without Web Audio (the page clock stands in). */
export function audioReady(): boolean {
  const a = context()
  return !a || a.state === 'running'
}

/** Now on the audio clock, in seconds. */
export function audioNow(): number {
  const a = context()
  return a ? a.currentTime : performance.now() / 1000
}

/**
 * The audio-clock time (s) of what the listener was hearing at page time
 * `perfMs` (an event's `timeStamp`). The output timestamp pairs the two clocks
 * at the speaker, so output latency is already accounted for; without it,
 * the reported output latency is taken off by hand.
 */
export function audioTimeAt(perfMs: number): number {
  const a = context()
  if (!a) return perfMs / 1000
  const stamp = typeof a.getOutputTimestamp === 'function' ? a.getOutputTimestamp() : null
  if (stamp?.contextTime && stamp.performanceTime) {
    return stamp.contextTime + (perfMs - stamp.performanceTime) / 1000
  }
  const latency = a.outputLatency || a.baseLatency || 0
  return a.currentTime - latency + (perfMs - performance.now()) / 1000
}

/** A click at audio time `at` (s), accented on a downbeat. */
export interface Click {
  at: number
  accent: boolean
}

const live = new Set<OscillatorNode>()

/** Schedules metronome clicks on the audio clock. */
export function scheduleClicks(clicks: readonly Click[]): void {
  const a = context()
  if (!a) return
  try {
    for (const c of clicks) {
      const osc = a.createOscillator()
      const gain = a.createGain()
      osc.type = 'triangle'
      osc.frequency.value = c.accent ? RHYTHM_CLICK.accentHz : RHYTHM_CLICK.hz
      gain.gain.setValueAtTime(0.0001, c.at)
      gain.gain.linearRampToValueAtTime(RHYTHM_CLICK.gain, c.at + 0.002)
      gain.gain.exponentialRampToValueAtTime(0.0001, c.at + RHYTHM_CLICK.decaySec)
      osc.connect(gain).connect(a.destination)
      osc.start(c.at)
      osc.stop(c.at + RHYTHM_CLICK.decaySec + 0.01)
      live.add(osc)
      osc.onended = () => live.delete(osc)
    }
  } catch { /* audio unavailable: silent */ }
}

/** Silences every click playing or scheduled: a pause or the next measure starts clean. */
export function stopClicks(): void {
  for (const osc of live) {
    try { osc.stop() } catch { /* already stopped */ }
  }
  live.clear()
}
