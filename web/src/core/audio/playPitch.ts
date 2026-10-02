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

/** A note or chord scheduled `at` seconds from now, ringing for `hold` seconds before it releases. */
export interface SoundEvent {
  pitches: Pitch[]
  at: number
  hold: number
}

/** Every voice started or scheduled and not yet stopped, so a new question can cut them off. */
const live = new Set<{ stop: (when?: number) => void }>()

function track(node: AudioScheduledSourceNode) {
  live.add(node)
  node.onended = () => live.delete(node)
}

function playSine(audio: AudioContext, p: Pitch, start: number, durationSec: number, level = AUDIO_GAIN) {
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq(p)
  gain.gain.setValueAtTime(level, start)
  gain.gain.exponentialRampToValueAtTime(0.001, start + durationSec)
  osc.connect(gain).connect(audio.destination)
  osc.start(start)
  osc.stop(start + durationSec)
  track(osc)
}

function playSample(
  audio: AudioContext, buffer: AudioBuffer, rate: number, start: number, hold = PIANO_HOLD_SEC, level = PIANO_GAIN,
) {
  const end = start + hold + PIANO_RELEASE_SEC
  const src = audio.createBufferSource()
  const gain = audio.createGain()
  src.buffer = buffer
  src.playbackRate.value = rate
  gain.gain.setValueAtTime(level, start)
  gain.gain.setValueAtTime(level, start + hold)
  gain.gain.exponentialRampToValueAtTime(0.001, end)
  src.connect(gain).connect(audio.destination)
  src.start(start)
  src.stop(end)
  track(src)
}

/** One voice on the piano, or on the sine fallback for a sample not loaded (yet). */
function voice(audio: AudioContext, p: Pitch, start: number, hold: number | undefined, share: number) {
  const { sample, rate } = nearestSample(midi(p), samples)
  const buffer = buffers.get(sample.midi)
  if (buffer) playSample(audio, buffer, rate, start, hold, PIANO_GAIN * share)
  else playSine(audio, p, start, hold ?? AUDIO_DURATION_SEC, AUDIO_GAIN * share)
}

function ready(): AudioContext {
  const audio = context()
  if (audio.state === 'suspended') void audio.resume()
  void preloadPiano()
  return audio
}

/**
 * Plays a note on the sampled piano, or as a sine tone while the samples are
 * still loading (or could not load).
 */
export function playPitch(p: Pitch): void {
  try {
    const audio = ready()
    voice(audio, p, audio.currentTime, undefined, 1)
  } catch { /* no audio available — silent no-op */ }
}

/**
 * Schedules notes and chords on the audio clock, so a cadence or a phrase
 * keeps its rhythm whatever the main thread is doing. A chord's voices share
 * the level of one note, so a chord is not louder than the melody after it.
 */
export function playSequence(events: readonly SoundEvent[]): void {
  try {
    const audio = ready()
    const now = audio.currentTime
    for (const e of events) {
      const share = 1 / Math.sqrt(Math.max(1, e.pitches.length))
      for (const p of e.pitches) voice(audio, p, now + e.at, e.hold, share)
    }
  } catch { /* no audio available — silent no-op */ }
}

/** Silences everything playing or scheduled: a replay or the next question starts clean. */
export function stopSounds(): void {
  for (const node of live) {
    try { node.stop() } catch { /* already stopped */ }
  }
  live.clear()
}
