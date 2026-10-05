import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, session } from '@/test/fixtures'
import { getSettings, recordSession } from '@/progress/progressStore'
import { RHYTHM_CALIBRATION, RHYTHM_FRAME_MS } from '@/config/constants'

const clock = vi.hoisted(() => ({ now: 5 }))
vi.mock('@/drills/rhythm/metronome', () => ({
  wakeAudio: vi.fn(),
  audioReady: () => true,
  audioNow: () => clock.now,
  audioTimeAt: () => clock.now,
  scheduleClicks: vi.fn(),
  stopClicks: vi.fn(),
}))
vi.mock('@/core/components/organisms/Staff', () => ({
  Staff: () => <div data-testid="staff" />,
  NoteStaff: () => <div data-testid="staff" />,
}))

const { SetupPhase } = await import('./SetupPhase')
const { useAppStore } = await import('@/app/store')
const { useRhythmStore } = await import('@/drills/rhythm/store')
const { scheduleClicks, wakeAudio } = await import('@/drills/rhythm/metronome')

const renderSetup = () => render(<MemoryRouter><SetupPhase /></MemoryRouter>)
const own = () => useAppStore.getState().settings.drills.rhythm

beforeEach(() => {
  vi.useFakeTimers()
  clock.now = 5
  vi.mocked(scheduleClicks).mockClear()
  vi.mocked(wakeAudio).mockClear()
  resetStores({ lang: 'en' })
  useRhythmStore.setState({ phase: 'setup', question: null, feedback: null, lastResult: null, pausedAt: null })
})
afterEach(() => vi.useRealTimers())

describe('Rhythm SetupPhase', () => {
  it('renders with default settings', () => {
    renderSetup()
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
    expect(screen.getByText('♩ = 80')).toBeInTheDocument()
    expect(screen.getByText('Not calibrated yet')).toBeInTheDocument()
  })

  it('saves level, tempo and click to the drill settings', () => {
    renderSetup()
    fireEvent.click(screen.getByRole('radio', { name: /Dots and ties/ }))
    fireEvent.click(screen.getByRole('radio', { name: '100' }))
    fireEvent.click(screen.getByRole('switch', { name: 'Click during the measure' }))
    expect(own()).toMatchObject({ level: 3, tempo: 100, click: false })
    expect(getSettings().drills.rhythm).toMatchObject({ level: 3, tempo: 100, click: false })
  })

  it('shows the best score for the chosen level', () => {
    recordSession(session({ drill: 'rhythm', level: 1, practiceScore: 37 }))
    renderSetup()
    expect(screen.getByText('37')).toBeInTheDocument()
  })

  it('wakes the sound and starts the session with the saved setup', () => {
    act(() => useAppStore.getState().updateDrill('rhythm', { level: 4, tempo: 60 }))
    renderSetup()
    fireEvent.click(screen.getByRole('button', { name: /Start/ }))
    expect(wakeAudio).toHaveBeenCalled()
    const s = useRhythmStore.getState()
    expect(s.phase).toBe('running')
    expect(s.level).toBe(4)
    expect(s.settings.drills.rhythm.tempo).toBe(60)
  })

  it('calibrates from taps along with the clicks and saves the delay', () => {
    renderSetup()
    fireEvent.click(screen.getByRole('button', { name: 'Calibrate' }))
    expect(screen.getByText('Tap along with 8 clicks')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /Play the clicks/ }))
    const clicks = vi.mocked(scheduleClicks).mock.calls[0][0]
    expect(clicks).toHaveLength(RHYTHM_CALIBRATION.clicks)
    // Every tap lands 60 ms after its click.
    for (const c of clicks) {
      clock.now = c.at + 0.06
      fireEvent.keyDown(window, { key: ' ' })
    }
    clock.now = clicks[clicks.length - 1].at + 2
    act(() => vi.advanceTimersByTime(RHYTHM_FRAME_MS * 2))
    expect(own().latencyMs).toBe(60)
    expect(screen.getByText('Saved: 60 ms')).toBeInTheDocument()
    expect(screen.getByText('60 ms taken off each tap')).toBeInTheDocument()
  })

  it('keeps the old delay when too few taps came', () => {
    act(() => useAppStore.getState().updateDrill('rhythm', { latencyMs: 30 }))
    renderSetup()
    fireEvent.click(screen.getByRole('button', { name: 'Calibrate' }))
    fireEvent.click(screen.getByRole('button', { name: /Play the clicks/ }))
    const clicks = vi.mocked(scheduleClicks).mock.calls[0][0]
    clock.now = clicks[0].at
    fireEvent.keyDown(window, { key: ' ' })
    clock.now = clicks[clicks.length - 1].at + 2
    act(() => vi.advanceTimersByTime(RHYTHM_FRAME_MS * 2))
    expect(screen.getByText('Too few taps landed near the clicks. Try again.')).toBeInTheDocument()
    expect(own().latencyMs).toBe(30)
  })
})
