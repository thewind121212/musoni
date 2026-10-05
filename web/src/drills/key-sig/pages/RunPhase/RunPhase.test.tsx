import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, withDrill } from '@/test/fixtures'
import { KEY_SIG_FEEDBACK_CORRECT_MS, KEY_SIG_FEEDBACK_WRONG_MS } from '@/config/constants'
import { keyPad } from '@/drills/key-sig/signatures'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))
vi.mock('@/drills/key-sig/components/organisms/SignatureStaff', () => ({
  SignatureStaff: ({ fifths, clef }: { fifths: number; clef: string }) => <div data-testid="signature">{clef} {fifths}</div>,
}))

const { RunPhase } = await import('./RunPhase')
const { useKeySigStore } = await import('@/drills/key-sig/store')
const { useAppStore } = await import('@/app/store')
const { playSequence } = await import('@/core/audio/playPitch')

const renderRun = () => render(<MemoryRouter initialEntries={['/train/key-sig']}><RunPhase /></MemoryRouter>)
const q = () => useKeySigStore.getState().question!
const press = (key: string) => fireEvent.keyDown(window, { key, code: `Key${key.toUpperCase()}` })
const wrong = () => (q().correctIndex === 0 ? 1 : 0)

function start(patch: Record<string, number> = {}, sound = true) {
  useAppStore.setState(s => ({ settings: { ...s.settings, sound } }))
  useKeySigStore.getState().start(withDrill('key-sig', { level: 1, ...patch }, useAppStore.getState().settings), Date.now())
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.mocked(playSequence).mockClear()
  resetStores({ lang: 'en', naming: 'letters' })
  useKeySigStore.setState({ phase: 'setup', question: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null })
})
afterEach(() => vi.useRealTimers())

describe('Key signatures RunPhase', () => {
  it('asks for the major key and shows the signature on its clef', () => {
    start()
    renderRun()
    expect(screen.getByRole('heading')).toHaveTextContent('Which major key?')
    expect(screen.getByTestId('signature')).toHaveTextContent(`treble ${q().fifths}`)
  })

  it('asks for the minor key when the question does', () => {
    start({ level: 4 })
    useKeySigStore.setState(s => ({ question: { ...s.question!, mode: 'minor' } }))
    renderRun()
    expect(screen.getByRole('heading')).toHaveTextContent('Which minor key?')
  })

  it('names the key and its rule on a right answer, plays the home chord, then moves on', () => {
    start()
    useKeySigStore.setState(s => ({ question: { ...s.question!, ...questionFor(3, 'A') } }))
    renderRun()
    fireEvent.click(screen.getByRole('button', { name: /^A(?!#)/ }))
    expect(screen.getByRole('status')).toHaveTextContent('A major: 3 sharps, last sharp G# + half step')
    expect(useKeySigStore.getState().correct).toBe(1)
    expect(vi.mocked(playSequence).mock.lastCall![0]).toHaveLength(1)
    act(() => { vi.advanceTimersByTime(KEY_SIG_FEEDBACK_CORRECT_MS) })
    expect(useKeySigStore.getState().feedback).toBeNull()
    expect(q().fifths).not.toBe(3)
  })

  it('names the rule on a miss too, plays the pick before the chord, and holds longer', () => {
    start()
    renderRun()
    press(q().options[wrong()].keyHint)
    expect(useKeySigStore.getState().wrong).toBe(1)
    expect(screen.getByRole('status')).toHaveTextContent(/major/)
    expect(vi.mocked(playSequence).mock.lastCall![0]).toHaveLength(2)
    act(() => { vi.advanceTimersByTime(KEY_SIG_FEEDBACK_CORRECT_MS) })
    expect(useKeySigStore.getState().feedback).not.toBeNull()
    act(() => { vi.advanceTimersByTime(KEY_SIG_FEEDBACK_WRONG_MS - KEY_SIG_FEEDBACK_CORRECT_MS) })
    expect(useKeySigStore.getState().feedback).toBeNull()
  })

  it('stays silent with sound off', () => {
    start({}, false)
    renderRun()
    press(q().options[q().correctIndex].keyHint)
    expect(useKeySigStore.getState().correct).toBe(1)
    expect(playSequence).not.toHaveBeenCalled()
  })

  it('takes one answer per question and none while paused', () => {
    start()
    renderRun()
    act(() => useKeySigStore.getState().pause('menu'))
    press(q().options[q().correctIndex].keyHint)
    expect(useKeySigStore.getState().correct).toBe(0)
    act(() => useKeySigStore.getState().resume())
    press(q().options[q().correctIndex].keyHint)
    press(q().options[wrong()].keyHint)
    expect(useKeySigStore.getState()).toMatchObject({ correct: 1, wrong: 0 })
  })

  it('leaves straight to setup on Esc before any answer, and pauses after one', () => {
    start()
    renderRun()
    press(q().options[q().correctIndex].keyHint)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(useKeySigStore.getState().pauseReason).toBe('menu')
    useKeySigStore.getState().start(useKeySigStore.getState().settings, Date.now())
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(useKeySigStore.getState().phase).toBe('setup')
  })
})

/** A question asking for the major key of this signature, on the letters pad. */
function questionFor(fifths: number, tonic: string) {
  const options = keyPad(fifths, 'letters')
  return { fifths, mode: 'major' as const, clef: 'treble' as const, options, correctIndex: options.findIndex(o => o.label === tonic) }
}
