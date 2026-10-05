import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, withDrill } from '@/test/fixtures'
import {
  RHYTHM_COUNT_IN, RHYTHM_FEEDBACK_CORRECT_MS, RHYTHM_FRAME_MS, RHYTHM_LEAD_SEC, RHYTHM_READ_MS,
} from '@/config/constants'

// One audio clock the test moves by hand: taps land at whatever it reads.
const clock = vi.hoisted(() => ({ now: 10 }))
vi.mock('@/drills/rhythm/metronome', () => ({
  wakeAudio: vi.fn(),
  audioReady: vi.fn(() => true),
  audioNow: () => clock.now,
  audioTimeAt: () => clock.now,
  scheduleClicks: vi.fn(),
  stopClicks: vi.fn(),
}))
// jsdom has no canvas: the staff is covered by its own tests.
vi.mock('@/core/components/organisms/Staff', () => ({
  Staff: () => <div data-testid="staff" />,
  NoteStaff: () => <div data-testid="staff" />,
}))

const { RunPhase } = await import('./RunPhase')
const { useRhythmStore, measureTiming } = await import('@/drills/rhythm/store')
const { allMeasures } = await import('@/drills/rhythm/generator')
const { scheduleClicks, audioReady } = await import('@/drills/rhythm/metronome')

const settings = (patch = {}) => withDrill('rhythm', { level: 2, tempo: 80, click: true, latencyMs: null, durationSec: 60, ...patch })
// q q 8 8 q at L2: four quarter beats, five onsets.
const measure = allMeasures(2).find(m => m.notation === 'B4:q B4:q B4:8 B4:8 B4:q')!

const renderRun = () => render(<MemoryRouter initialEntries={['/train/rhythm']}><RunPhase /></MemoryRouter>)
const press = (init: KeyboardEventInit) => fireEvent.keyDown(window, init)

/** Lets the measure be read and counted in; returns its downbeat on the audio clock. */
function countIn(): number {
  const first = clock.now + RHYTHM_LEAD_SEC
  act(() => vi.advanceTimersByTime(RHYTHM_READ_MS))
  return first + (RHYTHM_COUNT_IN * 60) / 80
}

/** Taps at these times (ms from the downbeat), then lets the bar close. */
function play(downbeat: number, taps: readonly number[], key = ' ') {
  for (const ms of taps) {
    clock.now = downbeat + ms / 1000
    press({ key })
  }
  clock.now = downbeat + 10
  act(() => vi.advanceTimersByTime(RHYTHM_FRAME_MS * 2))
}

function begin(patch = {}) {
  const s = settings(patch)
  useRhythmStore.getState().start(s, Date.now())
  useRhythmStore.setState({ question: measure })
  renderRun()
}

beforeEach(() => {
  vi.useFakeTimers()
  clock.now = 10
  vi.mocked(scheduleClicks).mockClear()
  vi.mocked(audioReady).mockReturnValue(true)
  resetStores({ lang: 'en' })
  useRhythmStore.setState({ phase: 'setup', question: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null, takeAt: null })
})
afterEach(() => vi.useRealTimers())

describe('Rhythm RunPhase', () => {
  it('renders the measure, the tempo and the pad', () => {
    begin()
    expect(screen.getByTestId('staff')).toBeInTheDocument()
    expect(screen.getByText('♩ = 80')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Tap/ })).toBeInTheDocument()
  })

  it('counts in four clicks and clicks through the measure when the click is on', () => {
    begin()
    countIn()
    const clicks = vi.mocked(scheduleClicks).mock.calls[0][0]
    expect(clicks).toHaveLength(RHYTHM_COUNT_IN + 4)
    expect(clicks.filter(c => c.accent)).toHaveLength(2)
  })

  it('counts in only when the click is off', () => {
    begin({ click: false })
    countIn()
    expect(vi.mocked(scheduleClicks).mock.calls[0][0]).toHaveLength(RHYTHM_COUNT_IN)
  })

  it('judges taps on the notes as in time', () => {
    begin()
    const downbeat = countIn()
    const { onsetsMs } = measureTiming(measure, useRhythmStore.getState().settings, 2)
    play(downbeat, onsetsMs, 'j')
    expect(useRhythmStore.getState().correct).toBe(1)
    expect(screen.getByRole('status')).toHaveTextContent('In time')
  })

  it('names the first note that was late', () => {
    begin()
    const downbeat = countIn()
    const { onsetsMs, toleranceMs } = measureTiming(measure, useRhythmStore.getState().settings, 2)
    play(downbeat, onsetsMs.map((ms, i) => (i === 1 ? ms + toleranceMs + 30 : ms)))
    expect(useRhythmStore.getState().wrong).toBe(1)
    expect(screen.getByText(`Note 2 late by ${toleranceMs + 30} ms`)).toBeInTheDocument()
  })

  it('takes no tap from other keys, chords or held keys', () => {
    begin()
    const downbeat = countIn()
    clock.now = downbeat
    press({ key: 'Enter' })
    press({ key: 'a', ctrlKey: true })
    press({ key: '1' })
    press({ key: ' ', repeat: true })
    play(downbeat, [])
    expect(screen.getByText('Note 1 missed')).toBeInTheDocument()
  })

  it('ignores taps while the measure is still being read', () => {
    begin()
    press({ key: ' ' })
    const downbeat = countIn()
    play(downbeat, [])
    const j = useRhythmStore.getState().feedback!
    expect(j.extras).toHaveLength(0)
    expect(j.notes.every(n => n.mark === 'missed')).toBe(true)
  })

  it('waits for the sound before counting in, and counts in once it runs', () => {
    vi.mocked(audioReady).mockReturnValue(false)
    begin()
    countIn()
    expect(screen.getByText('Tap the pad to turn the sound on')).toBeInTheDocument()
    expect(scheduleClicks).not.toHaveBeenCalled()
    vi.mocked(audioReady).mockReturnValue(true)
    act(() => vi.advanceTimersByTime(1000))
    expect(scheduleClicks).toHaveBeenCalledTimes(1)
  })

  it('Esc before any measure goes back to setup', () => {
    begin()
    press({ key: 'Escape' })
    expect(useRhythmStore.getState().phase).toBe('setup')
  })

  it('a pause mid-measure drops it uncounted, and resuming plays it again', () => {
    begin()
    let downbeat = countIn()
    const { onsetsMs } = measureTiming(measure, useRhythmStore.getState().settings, 2)
    play(downbeat, onsetsMs)
    // The marks hold, then the next measure comes.
    act(() => vi.advanceTimersByTime(RHYTHM_FEEDBACK_CORRECT_MS))
    const next = useRhythmStore.getState().question!
    expect(next).not.toBe(measure)
    expect(useRhythmStore.getState().takeAt).toBeNull()
    downbeat = countIn()
    expect(useRhythmStore.getState().takeAt).not.toBeNull()
    clock.now = downbeat
    press({ key: ' ' })
    press({ key: 'Escape' })
    expect(useRhythmStore.getState().takeAt).toBeNull()
    expect(useRhythmStore.getState().pausedAt).not.toBeNull()
    // The bar would have closed by now, but a paused take is never judged.
    clock.now = downbeat + 10
    act(() => vi.advanceTimersByTime(1000))
    expect(useRhythmStore.getState().feedback).toBeNull()
    expect(useRhythmStore.getState().correct + useRhythmStore.getState().wrong).toBe(1)

    act(() => useRhythmStore.getState().resume())
    expect(useRhythmStore.getState().question).toBe(next)
    const calls = vi.mocked(scheduleClicks).mock.calls.length
    countIn()
    expect(scheduleClicks).toHaveBeenCalledTimes(calls + 1)
  })
})
