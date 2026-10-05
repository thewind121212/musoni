import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores } from '@/test/fixtures'

vi.mock('@/drills/rhythm/metronome', () => ({
  wakeAudio: vi.fn(), audioReady: () => true, audioNow: () => 0, audioTimeAt: () => 0,
  scheduleClicks: vi.fn(), stopClicks: vi.fn(),
}))
vi.mock('@/core/components/organisms/Staff', () => ({
  Staff: () => <div data-testid="staff" />,
  NoteStaff: () => <div data-testid="staff" />,
}))

const { RhythmDrill } = await import('./RhythmDrill')
const { useRhythmStore } = await import('@/drills/rhythm/store')
const { useAppStore } = await import('@/app/store')
const { default: rhythm } = await import('@/drills/rhythm/drill')

beforeEach(() => {
  resetStores({ lang: 'en' })
  useRhythmStore.setState({ phase: 'setup', question: null, feedback: null, lastResult: null, pausedAt: null })
})

const open = (state?: object) => render(
  <MemoryRouter initialEntries={[{ pathname: '/train/rhythm', state }]}>
    <RhythmDrill />
  </MemoryRouter>,
)

describe('RhythmDrill', () => {
  it('opens on setup', () => {
    open()
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('starts straight away on one tap, at the saved setup', () => {
    useAppStore.getState().updateDrill('rhythm', { level: 3, tempo: 100 })
    open({ autostart: true })
    expect(screen.getByRole('button', { name: 'Quit this session' })).toBeInTheDocument()
    expect(useRhythmStore.getState().level).toBe(3)
    expect(useRhythmStore.getState().settings.drills.rhythm.tempo).toBe(100)
  })

  it("plays a lesson's preset for this session only", () => {
    open({ autostart: true, preset: { drill: 'rhythm', level: 2, durationSec: 60, tempo: 60 } })
    const s = useRhythmStore.getState()
    expect(s.level).toBe(2)
    expect(s.settings.drills.rhythm.tempo).toBe(60)
    expect(rhythm.of(useAppStore.getState().settings).tempo).toBe(80)
  })
})
