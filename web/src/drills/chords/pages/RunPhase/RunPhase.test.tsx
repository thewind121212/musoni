import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act } from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, withDrill } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))
vi.mock('@/core/components/organisms/Staff', () => ({ NoteStaff: () => <div data-testid="note-staff" /> }))

const { RunPhase } = await import('./RunPhase')
const { useChordStore } = await import('@/drills/chords/store')
const { useAppStore } = await import('@/app/store')
const { nameQuestion, romanQuestion } = await import('@/drills/chords/generator')
const { playSequence, stopSounds } = await import('@/core/audio/playPitch')
const { CHORD_FEEDBACK_CORRECT_MS } = await import('@/config/constants')

const renderRun = () => render(<MemoryRouter initialEntries={['/train/chords']}><RunPhase /></MemoryRouter>)
const press = (key: string, code = /^[a-z]$/.test(key) ? `Key${key.toUpperCase()}` : `Digit${key}`) =>
  fireEvent.keyDown(window, { key, code })
/** Am/C at level 4, in letters. A pad key's name ends in its computer key: 'Ah' is A. */
const amOverC = () => nameQuestion(4, 'letters', { root: { letter: 'A', accidental: '' }, quality: 'minor', inversion: 1, weight: 1 })

function startAt(level: number, options: Record<string, string | boolean> = {}) {
  useChordStore.getState().start(withDrill('chords', { level, ...options }, useAppStore.getState().settings), Date.now())
}

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  vi.mocked(playSequence).mockClear()
  resetStores({ lang: 'en', naming: 'letters' })
  useChordStore.setState({ phase: 'setup', question: null, feedback: null, pickedRoot: null, pickedQuality: null, misses: [] })
})
afterEach(() => vi.useRealTimers())

describe('Chords RunPhase, by name', () => {
  it('asks the chord and offers the root pad and the quality chips', () => {
    startAt(4)
    renderRun()
    expect(screen.getByRole('heading', { name: 'Which chord?' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: '2 · Quality' })).toBeInTheDocument()
    expect(screen.getByTestId('note-staff')).toBeInTheDocument()
  })

  it('takes the root, then the quality, then shows the symbol and name and plays the chord', async () => {
    startAt(4)
    useChordStore.setState({ question: amOverC() })
    renderRun()
    await userEvent.click(screen.getByRole('button', { name: 'Ah' }))
    expect(screen.getByRole('button', { name: 'Ah' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByRole('status')).toBeNull()
    await userEvent.click(screen.getByRole('button', { name: /Minor/ }))
    expect(screen.getByRole('status')).toHaveTextContent('Am/C · A minor, first inversion')
    expect(vi.mocked(playSequence).mock.calls.at(-1)![0]).toHaveLength(1)
    expect(useChordStore.getState().correct).toBe(1)
  })

  it('names the pick on a miss and plays it before the chord', async () => {
    startAt(4)
    useChordStore.setState({ question: amOverC() })
    renderRun()
    await userEvent.click(screen.getByRole('button', { name: /Major/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Ca' }))
    expect(screen.getByRole('status')).toHaveTextContent('you picked C major')
    expect(vi.mocked(playSequence).mock.calls.at(-1)![0]).toHaveLength(2)
  })

  it('stays quiet with listening off', async () => {
    startAt(4, { listen: false })
    useChordStore.setState({ question: amOverC() })
    renderRun()
    await userEvent.click(screen.getByRole('button', { name: 'Ah' }))
    await userEvent.click(screen.getByRole('button', { name: /Minor/ }))
    expect(playSequence).not.toHaveBeenCalled()
  })

  it('greys out the qualities the level does not ask', () => {
    startAt(2)
    renderRun()
    const chips = within(screen.getByRole('group', { name: '2 · Quality' }))
    expect(chips.getByRole('button', { name: /Dim/ })).toBeDisabled()
    expect(chips.getByRole('button', { name: /Aug/ })).toBeDisabled()
    expect(chips.getByRole('button', { name: /Minor/ })).toBeEnabled()
  })

  it('answers from the computer keyboard: a piano key for the root, a digit for the quality', () => {
    startAt(4)
    useChordStore.setState({ question: amOverC() })
    renderRun()
    press('h')
    expect(useChordStore.getState().pickedRoot).toBe(amOverC().correctIndex)
    press('2')
    expect(useChordStore.getState().feedback?.correct).toBe(true)
  })

  it('takes nothing more while the answer shows: no second count, no second sound', async () => {
    startAt(4)
    useChordStore.setState({ question: amOverC() })
    renderRun()
    press('h')
    press('2')
    expect(playSequence).toHaveBeenCalledTimes(1)
    press('a')
    press('1')
    await userEvent.click(screen.getByRole('button', { name: /Major/ }))
    expect(useChordStore.getState()).toMatchObject({ correct: 1, wrong: 0, pickedRoot: null, pickedQuality: null })
    expect(playSequence).toHaveBeenCalledTimes(1)
  })

  it('ignores the digit of a quality the level does not ask', () => {
    startAt(2)
    renderRun()
    press('3')
    press('4')
    expect(useChordStore.getState().pickedQuality).toBeNull()
    press('1')
    expect(useChordStore.getState().pickedQuality).toBe('major')
  })

  it('silences the chord when the session pauses and when the run screen goes', () => {
    startAt(4)
    useChordStore.setState({ question: amOverC() })
    const { unmount } = renderRun()
    press('h')
    press('2')
    vi.mocked(stopSounds).mockClear()
    act(() => useChordStore.getState().pause('menu'))
    expect(stopSounds).toHaveBeenCalled()
    vi.mocked(stopSounds).mockClear()
    unmount()
    expect(stopSounds).toHaveBeenCalled()
  })

  it('moves on to the next chord after the feedback hold', () => {
    startAt(4)
    useChordStore.setState({ question: amOverC() })
    renderRun()
    press('h')
    press('2')
    act(() => { vi.advanceTimersByTime(CHORD_FEEDBACK_CORRECT_MS + 10) })
    expect(useChordStore.getState().feedback).toBeNull()
    expect(screen.queryByRole('status')).toBeNull()
  })
})

describe('Chords RunPhase, Roman numerals', () => {
  it('names the key and answers with one of seven numerals, by tap or digit', async () => {
    startAt(5, { mode: 'roman' })
    useChordStore.setState({ question: romanQuestion('G', 4, 1) })
    renderRun()
    expect(screen.getByText('G major')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Which numeral?' })).toBeInTheDocument()
    const numerals = within(screen.getByRole('group', { name: 'Numeral' })).getAllByRole('button')
    expect(numerals).toHaveLength(7)
    expect(screen.queryByRole('group', { name: '2 · Quality' })).toBeNull()
    press('5')
    expect(screen.getByRole('status')).toHaveTextContent('V · D · D major')
  })

  it('names the numeral picked on a miss, in the minor key\'s numerals', async () => {
    startAt(7, { mode: 'roman' })
    useChordStore.setState({ question: romanQuestion('a', 4, 1) })
    renderRun()
    expect(screen.getByText('A minor')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /^VI/ }))
    expect(screen.getByRole('status')).toHaveTextContent('V · E · E major')
    expect(screen.getByRole('status')).toHaveTextContent('you picked VI')
  })
})
