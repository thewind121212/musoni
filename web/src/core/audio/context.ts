/*
 * Web Audio contexts that also sound in Safari.
 *
 * Safari differs from Chrome in four ways that each leave the page silent:
 * - before 14.1 it only has the prefixed `webkitAudioContext`;
 * - a context starts suspended and only a resume() made inside a tap, click or
 *   key press starts it (on iOS a touch start does not count, a touch end does);
 * - on iOS a context that was running drops to `interrupted` (not `suspended`)
 *   after a call, a lock or an app switch, and waits for another gesture;
 * - on iOS, Web Audio follows the ringer switch unless the page asks for
 *   playback audio, so a phone on silent plays nothing.
 *
 * So every context is made here, and the first gesture anywhere on the page
 * (and every later one, while a context is not running) resumes them all.
 */

type Ctor = typeof AudioContext

function ctor(): Ctor | undefined {
  const g = globalThis as { AudioContext?: Ctor; webkitAudioContext?: Ctor }
  return g.AudioContext ?? g.webkitAudioContext
}

const contexts = new Set<AudioContext>()
const primed = new WeakSet<AudioContext>()

/**
 * Asks iOS (Safari 17+) to treat the page's sound as playback, so it plays
 * with the ringer switch on silent, like a music app.
 */
function playbackSession() {
  const session = (globalThis.navigator as { audioSession?: { type: string } } | undefined)?.audioSession
  try {
    if (session && session.type !== 'playback') session.type = 'playback'
  } catch { /* read-only in this browser */ }
}

/** Resumes the context if it is not running: `suspended`, or Safari's `interrupted`. */
export function wake(ctx: AudioContext): Promise<void> {
  if (ctx.state === 'running') return Promise.resolve()
  try {
    return ctx.resume().catch(() => {})
  } catch {
    return Promise.resolve()
  }
}

/**
 * Older iOS only counts a context unlocked once a sound has started inside the
 * gesture, so the first gesture plays one silent frame on each context.
 */
function prime(ctx: AudioContext) {
  if (primed.has(ctx)) return
  try {
    const src = ctx.createBufferSource()
    src.buffer = ctx.createBuffer(1, 1, ctx.sampleRate)
    src.connect(ctx.destination)
    src.start(0)
    primed.add(ctx)
  } catch { /* not this browser's problem */ }
}

function onGesture() {
  for (const ctx of contexts) {
    if (ctx.state === 'running' && primed.has(ctx)) continue
    playbackSession()
    void wake(ctx)
    prime(ctx)
  }
}

// Touch end and click are what iOS accepts; pointer down and key down are
// enough elsewhere and come first, so the first note is not late.
const GESTURES = ['pointerdown', 'touchend', 'click', 'keydown'] as const
let listening = false

function listen() {
  if (listening || typeof window === 'undefined') return
  listening = true
  for (const type of GESTURES) window.addEventListener(type, onGesture, { capture: true, passive: true })
}

/**
 * A new audio context, resumed by the next user gesture. Null without Web
 * Audio. Safe to call before any gesture: decoding works on a suspended context.
 */
export function createAudioContext(options?: AudioContextOptions): AudioContext | null {
  const C = ctor()
  if (!C) return null
  let ctx: AudioContext
  try {
    ctx = new C(options)
  } catch {
    return null
  }
  playbackSession()
  contexts.add(ctx)
  listen()
  return ctx
}
