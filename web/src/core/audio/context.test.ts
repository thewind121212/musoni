import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'

class FakeAudioContext {
  static instances: FakeAudioContext[] = []
  state: 'suspended' | 'running' | 'interrupted' = 'suspended'
  sampleRate = 44100
  destination = {}
  started = 0
  resume = vi.fn(async () => { this.state = 'running' })
  createBuffer = vi.fn(() => ({}))
  createBufferSource() {
    return { buffer: null as unknown, connect: () => {}, start: () => { this.started++ } }
  }
  constructor() { FakeAudioContext.instances.push(this) }
}

beforeEach(() => {
  vi.resetModules()
  FakeAudioContext.instances = []
  vi.stubGlobal('AudioContext', FakeAudioContext)
})
afterEach(() => { vi.unstubAllGlobals() })

const load = () => import('./context')

describe('createAudioContext', () => {
  it('lets the next tap resume the context and play one silent frame (iOS unlock)', async () => {
    const { createAudioContext } = await load()
    const ctx = createAudioContext() as unknown as FakeAudioContext
    window.dispatchEvent(new Event('touchend'))
    expect(ctx.resume).toHaveBeenCalledTimes(1)
    expect(ctx.started).toBe(1)
    await Promise.resolve()
    window.dispatchEvent(new Event('click'))
    expect(ctx.resume).toHaveBeenCalledTimes(1)
    expect(ctx.started).toBe(1)
  })

  it('resumes again on a later tap once Safari has interrupted it', async () => {
    const { createAudioContext } = await load()
    const ctx = createAudioContext() as unknown as FakeAudioContext
    window.dispatchEvent(new Event('keydown'))
    await Promise.resolve()
    ctx.state = 'interrupted'
    window.dispatchEvent(new Event('pointerdown'))
    expect(ctx.resume).toHaveBeenCalledTimes(2)
  })

  it('asks iOS for playback audio, so the ringer switch does not mute it', async () => {
    const session = { type: 'auto' }
    vi.stubGlobal('navigator', { ...navigator, audioSession: session })
    const { createAudioContext } = await load()
    createAudioContext()
    expect(session.type).toBe('playback')
  })

  it('is null where Web Audio does not exist', async () => {
    vi.stubGlobal('AudioContext', undefined)
    const { createAudioContext } = await load()
    expect(createAudioContext()).toBeNull()
  })
})
