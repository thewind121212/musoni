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
  createGain() { return { ...this.node(), gain: this.param() } }
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
