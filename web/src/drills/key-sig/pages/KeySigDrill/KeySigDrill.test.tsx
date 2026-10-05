import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores } from '@/test/fixtures'
import { getSettings } from '@/progress/progressStore'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))
vi.mock('@/drills/key-sig/components/organisms/SignatureStaff', () => ({ SignatureStaff: () => <div data-testid="signature" /> }))

const { KeySigDrill } = await import('./KeySigDrill')
const { useKeySigStore } = await import('@/drills/key-sig/store')
const { useAppStore } = await import('@/app/store')

const open = (state: object | null = null) => render(
  <MemoryRouter initialEntries={[{ pathname: '/train/key-sig', state }]}><KeySigDrill /></MemoryRouter>,
)

beforeEach(() => {
  resetStores({ lang: 'en' })
  useKeySigStore.setState({ phase: 'setup', question: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null })
})

describe('KeySigDrill', () => {
  it('opens on setup', () => {
    open()
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('starts straight away from a tab, at its own saved level and length', () => {
    useAppStore.getState().updateDrill('key-sig', { level: 3, durationSec: 300 })
    open({ autostart: true })
    expect(screen.getByRole('button', { name: 'Quit this session' })).toBeInTheDocument()
    expect(useKeySigStore.getState().level).toBe(3)
    expect(useKeySigStore.getState().endsAt! - Date.now()).toBeGreaterThan(290_000)
  })

  it('runs a lesson preset for this session only', () => {
    open({ autostart: true, preset: { drill: 'key-sig', level: 2, durationSec: 120 } })
    expect(useKeySigStore.getState().level).toBe(2)
    expect(getSettings().drills['key-sig']).toBeUndefined()
  })

  it('ignores another drill\'s preset', () => {
    useAppStore.getState().updateDrill('key-sig', { level: 4 })
    open({ autostart: true, preset: { drill: 'note-id', level: 2, durationSec: 60 } })
    expect(useKeySigStore.getState().level).toBe(4)
  })
})
