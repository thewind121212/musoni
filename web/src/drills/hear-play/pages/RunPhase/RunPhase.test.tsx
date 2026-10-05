import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, withDrill } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))
vi.mock('@/core/components/organisms/Staff', () => ({ Staff: () => <div data-testid="staff" /> }))

const { RunPhase } = await import('./RunPhase')
const { useEarStore } = await import('@/drills/hear-play/store')
const { useAppStore } = await import('@/app/store')
const { playSequence, stopSounds } = await import('@/core/audio/playPitch')

const renderRun = () => render(<MemoryRouter initialEntries={['/train/hear-play']}><RunPhase /></MemoryRouter>)
const q = () => useEarStore.getState().question!
const press = (key: string) => fireEvent.keyDown(window, { key, code: /^[a-z]$/.test(key) ? `Key${key.toUpperCase()}` : key })
/** How many sound events the last playSequence call had: 5 = cadence + note, 1 = note only. */
const lastPlayed = () => vi.mocked(playSequence).mock.calls.at(-1)![0].length
const stageHidden = () => screen.getByTestId('staff').parentElement!.parentElement!.classList.contains('invisible')

beforeEach(() => {
  vi.useFakeTimers()
  vi.mocked(playSequence).mockClear()
  vi.mocked(stopSounds).mockClear()
  resetStores({ lang: 'en', naming: 'letters' })
  useEarStore.getState().start(withDrill('hear-play', { level: 2 }, useAppStore.getState().settings), Date.now())
})
afterEach(() => vi.useRealTimers())

describe('Hear & play RunPhase', () => {
  it('plays the cadence before every note when asked', () => {
    useEarStore.getState().start(withDrill('hear-play', { level: 2, cadenceEach: true }, useAppStore.getState().settings), Date.now())
    renderRun()
    press(q().options[q().correctIndex].keyHint)
    vi.mocked(playSequence).mockClear()
    act(() => { vi.advanceTimersByTime(2000) })
    expect(q().newKey).toBe(false)
    expect(lastPlayed()).toBe(5)
  })

  it('shows "New key" only when the key really changed', () => {
    useEarStore.setState(s => ({ question: { ...s.question!, newKey: true, keyChanged: false } }))
    renderRun()
    expect(screen.queryByText('New key')).toBeNull()
  })

  it('opens with the cadence, then the note, and keeps the staff hidden until answered', () => {
    renderRun()
    expect(lastPlayed()).toBe(5)
    expect(stageHidden()).toBe(true)
    expect(screen.getByText('Play the note you heard')).toBeInTheDocument()
  })

  it('dots the key\'s home note on the pad', () => {
    renderRun()
    expect(screen.getByTestId('home-dot').closest('button')).toHaveTextContent(q().options[q().tonicIndex].label)
  })

  it('reveals the note and walks it home on a right answer', () => {
    renderRun()
    press(q().options[q().correctIndex].keyHint)
    expect(stageHidden()).toBe(false)
    expect(screen.getByRole('status')).toHaveTextContent(`That was ${q().options[q().correctIndex].label}`)
    expect(useEarStore.getState().correct).toBe(1)
  })

  it('plays the pick then the note on a miss, and names both', () => {
    renderRun()
    const wrong = q().options.findIndex((_, i) => i !== q().correctIndex)
    press(q().options[wrong].keyHint)
    expect(lastPlayed()).toBe(2)
    expect(screen.getByRole('status')).toHaveTextContent(`you played ${q().options[wrong].label}`)
  })

  it('replays the cadence and note on Space, before the answer only', () => {
    renderRun()
    vi.mocked(playSequence).mockClear()
    press(' ')
    expect(lastPlayed()).toBe(5)
    press(q().options[q().correctIndex].keyHint)
    vi.mocked(playSequence).mockClear()
    press(' ')
    expect(playSequence).not.toHaveBeenCalled()
  })

  it('plays only the note for the next question in the same key', () => {
    renderRun()
    press(q().options[q().correctIndex].keyHint)
    vi.mocked(playSequence).mockClear()
    act(() => { vi.advanceTimersByTime(2000) })
    expect(q().newKey).toBe(false)
    expect(lastPlayed()).toBe(1)
  })

  it('silences on pause and plays the cadence again on resume', () => {
    renderRun()
    press(q().options[q().correctIndex].keyHint)
    act(() => { vi.advanceTimersByTime(2000) })
    vi.mocked(stopSounds).mockClear()
    act(() => useEarStore.getState().pause('menu'))
    expect(stopSounds).toHaveBeenCalled()
    vi.mocked(playSequence).mockClear()
    act(() => useEarStore.getState().resume())
    expect(lastPlayed()).toBe(5)
  })
})
