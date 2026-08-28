import type { Pitch } from '../music/types'
import { freq } from '../music/pitch'
import { AUDIO_GAIN, AUDIO_DURATION_SEC } from '../../config/constants'

let ctx: AudioContext | null = null

export function playPitch(p: Pitch, durationSec = AUDIO_DURATION_SEC): void {
  try {
    ctx ??= new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq(p)
    gain.gain.setValueAtTime(AUDIO_GAIN, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + durationSec)
    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + durationSec)
  } catch { /* no audio available — silent no-op */ }
}
