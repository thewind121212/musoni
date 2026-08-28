import type { Pitch } from '../music/types'
import { freq } from '../music/pitch'

let ctx: AudioContext | null = null

export function playPitch(p: Pitch, durationSec = 0.4): void {
  try {
    ctx ??= new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq(p)
    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + durationSec)
  } catch { /* no audio available — silent no-op */ }
}
