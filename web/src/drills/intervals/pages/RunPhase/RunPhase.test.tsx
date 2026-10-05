import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, withDrill } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))
vi.mock('@/core/components/organisms/Staff', () => ({
  Staff: () => <div data-testid="staff" />, NoteStaff: () => <div data-testid="staff" />,
}))

const { RunPhase } = await import('./RunPhase')
const { useIntervalsStore } = await import('@/drills/intervals/store')
const { useAppStore } = await import('@/app/store')
const { playSequence, stopSounds } = await import('@/core/audio/playPitch')
const { keyHint, rowOf } = await import('@/drills/intervals/grid')
const { cellName, capitalize } = await import('@/drills/intervals/names')
const { t } = await import('@/test/i18n')
const { INTERVAL_FEEDBACK_WRONG_MS, INTERVAL_LEVELS } = await import('@/config/constants')
type Cell = import('@/drills/intervals/grid').Cell

const renderRun = () => render(<MemoryRouter initialEntries={['/train/intervals']}><RunPhase /></MemoryRouter>)
const q = () => useIntervalsStore.getState().question!
const rows = () => INTERVAL_LEVELS[useIntervalsStore.getState().level].rows
const right = (): Cell => ({ row: rowOf(q().interval, rows()), size: q().interval.size })
/** Another size on the same row: wrong, and always on the grid. */
const wrong = (): Cell => {
  const r = right()
  return { row: r.row === 'size' ? 'size' : 'MP', size: (r.size === 8 ? 7 : r.size + 1) as Cell['size'] }
}
const button = (cell: Cell) => screen.getByRole('button', { name: capitalize(cellName(cell, t)) })
const start = (level: number, options: Record<string, boolean> = {}) =>
  useIntervalsStore.getState().start(withDrill('intervals', { level, ...options }, useAppStore.getState().settings), Date.now())

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true })
  vi.mocked(playSequence).mockClear()
  vi.mocked(stopSounds).mockClear()
  resetStores({ lang: 'en', naming: 'letters' })
  useIntervalsStore.setState({ phase: 'setup', question: null, feedback: null, misses: [], pausedAt: null, pauseReason: null })
  start(2)
})
afterEach(() => vi.useRealTimers())

describe('Intervals RunPhase', () => {
  it('asks for the size at level 1 and the full name above it', () => {
    renderRun()
    expect(screen.getByRole('heading', { name: 'What interval?' })).toBeInTheDocument()
    act(() => start(1))
    expect(screen.getByRole('heading', { name: 'What size?' })).toBeInTheDocument()
  })

  it('names the interval and plays it on a right answer', async () => {
    renderRun()
    const asked = q()
    await userEvent.click(button(right()))
    expect(useIntervalsStore.getState().correct).toBe(1)
    expect(screen.getByRole('status')).toHaveTextContent(capitalize(cellName(right(), t)))
    expect(vi.mocked(playSequence).mock.calls.at(-1)![0].flatMap(e => e.pitches)).toEqual([asked.lower, asked.upper])
  })

  it('names the interval and the pick on a miss, and keeps it for the result', async () => {
    renderRun()
    const pick = wrong()
    await userEvent.click(button(pick))
    expect(screen.getByRole('status')).toHaveTextContent(`you picked ${cellName(pick, t)}`)
    expect(useIntervalsStore.getState().misses).toHaveLength(1)
    expect(button(right())).toHaveClass('bg-correct')
  })

  it('stays silent when hearing is off', async () => {
    start(2, { hear: false })
    renderRun()
    await userEvent.click(button(right()))
    expect(playSequence).not.toHaveBeenCalled()
  })

  it('answers from the computer keyboard, one key per cell', () => {
    renderRun()
    const hint = keyHint(right())
    fireEvent.keyDown(window, { key: hint, code: /\d/.test(hint) ? `Digit${hint}` : hint === ',' ? 'Comma' : `Key${hint.toUpperCase()}` })
    expect(useIntervalsStore.getState().correct).toBe(1)
  })

  it('moves on to a new interval after the verdict', async () => {
    renderRun()
    const asked = q()
    await userEvent.click(button(wrong()))
    act(() => { vi.advanceTimersByTime(INTERVAL_FEEDBACK_WRONG_MS + 50) })
    expect(useIntervalsStore.getState().feedback).toBeNull()
    expect(q()).not.toBe(asked)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('leaves at once on Esc before any answer, and pauses on Esc after one', async () => {
    renderRun()
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' })
    expect(useIntervalsStore.getState().phase).toBe('setup')
    act(() => start(2))
    await userEvent.click(button(right()))
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' })
    expect(useIntervalsStore.getState()).toMatchObject({ phase: 'running', pauseReason: 'menu' })
  })

  it('takes no key while the verdict shows or the session is paused', async () => {
    renderRun()
    await userEvent.click(button(wrong()))
    const press = (cell: Cell) => {
      const hint = keyHint(cell)
      fireEvent.keyDown(window, { key: hint, code: /\d/.test(hint) ? `Digit${hint}` : hint === ',' ? 'Comma' : `Key${hint.toUpperCase()}` })
    }
    press(right())
    expect(useIntervalsStore.getState()).toMatchObject({ correct: 0, wrong: 1 })
    act(() => { vi.advanceTimersByTime(INTERVAL_FEEDBACK_WRONG_MS + 50) })
    act(() => useIntervalsStore.getState().pause('menu'))
    press(right())
    expect(useIntervalsStore.getState()).toMatchObject({ correct: 0, wrong: 1, feedback: null })
  })

  it('stops the sound and the pending next question when the screen goes', async () => {
    const view = renderRun()
    await userEvent.click(button(right()))
    const asked = q()
    vi.mocked(stopSounds).mockClear()
    view.unmount()
    expect(stopSounds).toHaveBeenCalled()
    act(() => { vi.advanceTimersByTime(INTERVAL_FEEDBACK_WRONG_MS + 50) })
    expect(q()).toBe(asked)
  })

  it('silences the sound on pause', async () => {
    renderRun()
    await userEvent.click(button(right()))
    vi.mocked(stopSounds).mockClear()
    act(() => useIntervalsStore.getState().pause('menu'))
    expect(stopSounds).toHaveBeenCalled()
  })
})
