import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { PIANO_SAMPLES } from '../../config/constants'

/** A Web Audio stand-in that records which kind of voice each note used. */
class FakeAudioContext {
  static instances: FakeAudioContext[] = []
  state: 'suspended' | 'running' = 'suspended'
  currentTime = 0
  destination = {}
  oscillators: { frequency: { value: number } }[] = []
  sources: { playbackRate: { value: number }; buffer: unknown }[] = []
  resume = vi.fn(async () => { this.state = 'running' })
  decodeAudioData = vi.fn(async (data: ArrayBuffer) => ({ decodedFrom: data }))
  constructor() { FakeAudioContext.instances.push(this) }
  private node() {
    const n = { connect: () => n, start: vi.fn(), stop: vi.fn() }
    return n
  }
  private param() {
    return { value: 0, setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() }
  }
  gains: { gain: { setValueAtTime: ReturnType<typeof vi.fn> } }[] = []
  createGain() {
    const g = { ...this.node(), gain: this.param() }
    this.gains.push(g)
    return g
  }
  createOscillator() {
    const o = { ...this.node(), type: '', frequency: this.param() }
    this.oscillators.push(o)
    return o
  }
  createBufferSource() {
    const s = { ...this.node(), buffer: null as unknown, playbackRate: this.param() }
    this.sources.push(s)
    return s
  }
}

const C4 = { letter: 'C', accidental: '', octave: 4 } as const
const Cs4 = { letter: 'C', accidental: '#', octave: 4 } as const

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  // playPitch keeps its context and buffers at module level: load it fresh.
  vi.resetModules()
  FakeAudioContext.instances = []
  vi.stubGlobal('AudioContext', FakeAudioContext)
  fetchMock = vi.fn(async (url: string) => ({ ok: true, arrayBuffer: async () => new TextEncoder().encode(url).buffer }))
  vi.stubGlobal('fetch', fetchMock)
})
afterEach(() => { vi.unstubAllGlobals() })

const load = () => import('./playPitch')
const ctx = () => FakeAudioContext.instances[0]

describe('playPitch', () => {
  it('falls back to a sine tone while the samples are still loading', async () => {
    const { playPitch } = await load()
    playPitch(C4)
    expect(ctx().oscillators).toHaveLength(1)
    expect(ctx().oscillators[0].frequency.value).toBeCloseTo(261.63, 1)
    expect(ctx().sources).toHaveLength(0)
  })

  it('plays the recorded sample at its own rate once loaded', async () => {
    const { playPitch, preloadPiano } = await load()
    await preloadPiano()
    playPitch(C4)
    expect(ctx().oscillators).toHaveLength(0)
    expect(ctx().sources).toHaveLength(1)
    expect(ctx().sources[0].playbackRate.value).toBe(1)
  })

  it('pitch-shifts the nearest sample for notes between recordings', async () => {
    const { playPitch, preloadPiano } = await load()
    await preloadPiano()
    playPitch(Cs4)
    expect(ctx().sources[0].playbackRate.value).toBeCloseTo(Math.pow(2, 1 / 12))
  })

  it('fetches each sample once, however often it is asked to preload', async () => {
    const { preloadPiano } = await load()
    await Promise.all([preloadPiano(), preloadPiano()])
    await preloadPiano()
    expect(fetchMock).toHaveBeenCalledTimes(PIANO_SAMPLES.length)
    const urls = fetchMock.mock.calls.map(c => String(c[0]))
    expect(urls.every(u => /\/audio\/piano\/[A-G]s?\d\.mp3$/.test(u))).toBe(true)
    expect(urls.some(u => u.includes('#'))).toBe(false)
  })

  it('keeps notes on the sine tone when their sample fails to load', async () => {
    fetchMock.mockImplementation(async () => ({ ok: false }))
    const { playPitch, preloadPiano } = await load()
    await preloadPiano()
    playPitch(C4)
    expect(ctx().oscillators).toHaveLength(1)
    expect(ctx().sources).toHaveLength(0)
  })

  it('survives a network error without throwing', async () => {
    fetchMock.mockRejectedValue(new Error('offline'))
    const { playPitch, preloadPiano } = await load()
    await expect(preloadPiano()).resolves.toBeUndefined()
    expect(() => playPitch(C4)).not.toThrow()
  })

  it('resumes a suspended context on play (autoplay policy)', async () => {
    const { playPitch } = await load()
    playPitch(C4)
    expect(ctx().resume).toHaveBeenCalled()
  })

  it('is a silent no-op where Web Audio does not exist', async () => {
    vi.stubGlobal('AudioContext', undefined)
    const { playPitch, preloadPiano } = await load()
    await expect(preloadPiano()).resolves.toBeUndefined()
    expect(() => playPitch(C4)).not.toThrow()
  })
})

const E4 = { letter: 'E', accidental: '', octave: 4 } as const
const G4 = { letter: 'G', accidental: '', octave: 4 } as const

describe('playSequence', () => {
  it('schedules each event on the audio clock, a voice per chord note', async () => {
    const { playSequence, preloadPiano } = await load()
    await preloadPiano()
    ctx().currentTime = 10
    playSequence([{ pitches: [C4, E4, G4], at: 0, hold: 0.5 }, { pitches: [C4], at: 0.6, hold: 1 }])
    const starts = ctx().sources.map(s => (s as unknown as { start: ReturnType<typeof vi.fn> }).start.mock.calls[0][0])
    expect(starts).toEqual([10, 10, 10, 10.6])
  })

  it('shares one note\'s level across a chord, so a chord is no louder than the melody', async () => {
    const { playSequence } = await load()
    playSequence([{ pitches: [C4], at: 0, hold: 0.5 }, { pitches: [C4, E4, G4, C4], at: 1, hold: 0.5 }])
    const levels = ctx().gains.map(g => g.gain.setValueAtTime.mock.calls[0][0] as number)
    expect(levels.slice(1).every(l => l === levels[0] / 2)).toBe(true)
  })

  it('stopSounds cuts off everything still playing or scheduled', async () => {
    const { playSequence, stopSounds } = await load()
    playSequence([{ pitches: [C4], at: 0, hold: 0.5 }, { pitches: [E4], at: 2, hold: 0.5 }])
    const stops = ctx().oscillators.map(o => (o as unknown as { stop: ReturnType<typeof vi.fn> }).stop)
    stops.forEach(s => s.mockClear())
    stopSounds()
    expect(stops.every(s => s.mock.calls.length === 1)).toBe(true)
  })
})

