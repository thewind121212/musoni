import type { Pitch } from '../music/types'
import { freq, midi } from '../music/pitch'
import { nearestSample, sampleFromName, type PianoSample } from './piano'
import {
  AUDIO_GAIN, AUDIO_DURATION_SEC,
  PIANO_SAMPLE_URL, PIANO_SAMPLES, PIANO_GAIN, PIANO_HOLD_SEC, PIANO_RELEASE_SEC,
} from '../../config/constants'

let ctx: AudioContext | null = null
const samples: PianoSample[] = PIANO_SAMPLES.map(sampleFromName)
const buffers = new Map<number, AudioBuffer>()
let loading: Promise<void> | null = null

function context(): AudioContext {
  ctx ??= new AudioContext()
  return ctx
}

/**
 * Fetches and decodes the piano samples once. Safe to call repeatedly and
 * before any user gesture: decoding works on a suspended context. A sample
 * that fails to load just leaves its notes on the sine fallback.
 */
export function preloadPiano(): Promise<void> {
  if (loading) return loading
  try {
    const audio = context()
    loading = Promise.all(samples.map(async s => {
      try {
        const res = await fetch(PIANO_SAMPLE_URL + s.file)
        if (!res.ok) return
        buffers.set(s.midi, await audio.decodeAudioData(await res.arrayBuffer()))
      } catch { /* offline or undecodable: this sample stays on the fallback */ }
    })).then(() => undefined)
  } catch {
    loading = Promise.resolve() // no audio available
  }
  return loading
}

function playSine(audio: AudioContext, p: Pitch, durationSec: number) {
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq(p)
  gain.gain.setValueAtTime(AUDIO_GAIN, audio.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + durationSec)
  osc.connect(gain).connect(audio.destination)
  osc.start()
  osc.stop(audio.currentTime + durationSec)
}

function playSample(audio: AudioContext, buffer: AudioBuffer, rate: number) {
  const now = audio.currentTime
  const end = now + PIANO_HOLD_SEC + PIANO_RELEASE_SEC
  const src = audio.createBufferSource()
  const gain = audio.createGain()
  src.buffer = buffer
  src.playbackRate.value = rate
  gain.gain.setValueAtTime(PIANO_GAIN, now)
  gain.gain.setValueAtTime(PIANO_GAIN, now + PIANO_HOLD_SEC)
  gain.gain.exponentialRampToValueAtTime(0.001, end)
  src.connect(gain).connect(audio.destination)
  src.start(now)
  src.stop(end)
}

/**
 * Plays a note on the sampled piano, or as a sine tone while the samples are
 * still loading (or could not load).
 */
export function playPitch(p: Pitch, durationSec = AUDIO_DURATION_SEC): void {
  try {
    const audio = context()
    if (audio.state === 'suspended') void audio.resume()
    void preloadPiano()
    const { sample, rate } = nearestSample(midi(p), samples)
    const buffer = buffers.get(sample.midi)
    if (buffer) playSample(audio, buffer, rate)
    else playSine(audio, p, durationSec)
  } catch { /* no audio available — silent no-op */ }
}
