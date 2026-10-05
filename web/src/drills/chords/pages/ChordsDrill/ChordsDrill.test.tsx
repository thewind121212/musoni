import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))
vi.mock('@/core/components/organisms/Staff', () => ({ NoteStaff: () => <div data-testid="note-staff" /> }))

const { ChordsDrill } = await import('./ChordsDrill')
const { useChordStore } = await import('@/drills/chords/store')
const { useAppStore } = await import('@/app/store')

beforeEach(() => {
  resetStores({ lang: 'en' })
  useChordStore.setState({ phase: 'setup', question: null, feedback: null })
})

const open = (state?: object) => render(
  <MemoryRouter initialEntries={[{ pathname: '/train/chords', state }]}><ChordsDrill /></MemoryRouter>,
)

describe('ChordsDrill', () => {
  it('opens on setup', () => {
    open()
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('starts a lesson preset in the Roman numeral mode, for that session only', () => {
    open({ autostart: true, preset: { drill: 'chords', level: 5, durationSec: 60, mode: 'roman' } })
    expect(screen.getByRole('button', { name: 'Quit this session' })).toBeInTheDocument()
    expect(useChordStore.getState().level).toBe(5)
    expect(useAppStore.getState().settings.drills.chords).toBeUndefined()
  })

  it("ignores another drill's preset and starts on the saved setup", () => {
    useAppStore.getState().updateDrill('chords', { level: 3 })
    open({ autostart: true, preset: { drill: 'note-id', level: 4, durationSec: 60 } })
    expect(useChordStore.getState().level).toBe(3)
  })
})
