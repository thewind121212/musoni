import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))
vi.mock('@/core/components/organisms/Staff', () => ({
  Staff: () => <div data-testid="staff" />, NoteStaff: () => <div data-testid="staff" />,
}))

const { IntervalsDrill } = await import('./IntervalsDrill')
const { useIntervalsStore } = await import('@/drills/intervals/store')
const { useAppStore } = await import('@/app/store')

const open = (state?: object) => render(
  <MemoryRouter initialEntries={[{ pathname: '/train/intervals', state }]}>
    <IntervalsDrill />
  </MemoryRouter>,
)

beforeEach(() => {
  resetStores({ lang: 'en' })
  useIntervalsStore.setState({ phase: 'setup', question: null, feedback: null, misses: [], pausedAt: null, pauseReason: null })
})

describe('IntervalsDrill', () => {
  it('opens on setup', () => {
    open()
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('starts straight away from a tab, at its own saved level', () => {
    useAppStore.getState().updateDrill('intervals', { level: 3 })
    open({ autostart: true })
    expect(screen.getByRole('button', { name: 'Quit this session' })).toBeInTheDocument()
    expect(useIntervalsStore.getState().level).toBe(3)
  })

  it("runs a lesson's preset for this session only", () => {
    open({ autostart: true, preset: { drill: 'intervals', level: 4, durationSec: 120 } })
    expect(useIntervalsStore.getState().level).toBe(4)
    expect(useAppStore.getState().settings.drills.intervals).toBeUndefined()
  })

  it("ignores another drill's preset", () => {
    open({ autostart: true, preset: { drill: 'note-id', level: 4, durationSec: 120 } })
    expect(useIntervalsStore.getState().level).toBe(1)
  })
})
