import { afterEach, describe, it, expect, vi } from 'vitest'

/** A stand-in AudioContext: a clock and the parts the metronome uses. */
function fakeContext(over: Record<string, unknown> = {}) {
  const started: { at: number; hz: number }[] = []
  const stopped: number[] = []
  class Fake {
    state = 'running'
    currentTime = 10
    outputLatency = 0.04
    baseLatency = 0.01
    destination = {}
    resume = vi.fn(() => Promise.resolve())
    getOutputTimestamp: (() => { contextTime: number; performanceTime: number }) | undefined =
      () => ({ contextTime: 9.95, performanceTime: 5000 })
    createGain() {
      const param = { setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} }
      return { gain: param, connect: (n: unknown) => n }
    }
    createOscillator() {
      const osc = {
        type: '', frequency: { value: 0 }, onended: null,
        connect: (n: unknown) => n,
        start: (at: number) => started.push({ at, hz: osc.frequency.value }),
        stop: (at?: number) => { if (at === undefined) stopped.push(1) },
      }
      return osc
    }
    constructor() { Object.assign(this, over) }
  }
  vi.stubGlobal('AudioContext', Fake)
  return { started, stopped }
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.resetModules()
})

describe('metronome', () => {
  it('turns a tap time into the audio time heard then, through the output timestamp', async () => {
    fakeContext()
    const m = await import('./metronome')
    // 120 ms after the stamp's page time: 120 ms after its audio time.
    expect(m.audioTimeAt(5120)).toBeCloseTo(10.07)
  })

  it('falls back to the current time less the output latency without a timestamp', async () => {
    fakeContext({ getOutputTimestamp: undefined })
    vi.spyOn(performance, 'now').mockReturnValue(8000)
    const m = await import('./metronome')
    expect(m.audioTimeAt(8000)).toBeCloseTo(10 - 0.04)
  })

  it('accents the downbeat, and silences scheduled clicks', async () => {
    const { started, stopped } = fakeContext()
    const m = await import('./metronome')
    m.scheduleClicks([{ at: 11, accent: true }, { at: 11.5, accent: false }])
    expect(started.map(s => s.at)).toEqual([11, 11.5])
    expect(started[0].hz).toBeGreaterThan(started[1].hz)
    m.stopClicks()
    expect(stopped).toHaveLength(2)
  })

  it('waits for a suspended clock, and runs on the page clock without Web Audio', async () => {
    fakeContext({ state: 'suspended' })
    let m = await import('./metronome')
    expect(m.audioReady()).toBe(false)
    vi.unstubAllGlobals()
    vi.resetModules()
    vi.stubGlobal('AudioContext', undefined)
    m = await import('./metronome')
    expect(m.audioReady()).toBe(true)
    expect(m.audioTimeAt(2500)).toBe(2.5)
  })
})
