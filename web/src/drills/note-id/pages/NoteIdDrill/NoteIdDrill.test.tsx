import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, session } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({ playPitch: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()) }))

const { NoteIdDrill } = await import('./NoteIdDrill')
const { useDrillStore } = await import('@/drills/note-id/store')
const { useAppStore } = await import('@/app/store')

const renderDrill = () => render(<MemoryRouter><NoteIdDrill /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('NoteIdDrill', () => {
  it('opens on setup', () => {
    renderDrill()
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('shows the sprint while running', () => {
    useDrillStore.getState().start(1, useAppStore.getState().settings)
    renderDrill()
    expect(screen.getByRole('button', { name: 'Quit this session' })).toBeInTheDocument()
  })

  it('shows the result once finished', () => {
    useDrillStore.setState({ phase: 'finished', lastResult: session({ practiceScore: 33 }) })
    renderDrill()
    expect(screen.getByRole('button', { name: /Again/ })).toBeInTheDocument()
  })

  it('opens straight into a session on the saved setup when asked to autostart', () => {
    useAppStore.getState().updateSettings({ level: 3, durationSec: 120 })
    render(
      <MemoryRouter initialEntries={[{ pathname: '/train/note-id', state: { autostart: true } }]}>
        <NoteIdDrill />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: 'Quit this session' })).toBeInTheDocument()
    expect(useDrillStore.getState().level).toBe(3)
    expect(useDrillStore.getState().settings.durationSec).toBe(120)
  })

  it('opens setup from the change-setup link even after a finished session', () => {
    useDrillStore.setState({ phase: 'finished', lastResult: session() })
    render(
      <MemoryRouter initialEntries={[{ pathname: '/train/note-id', state: { setup: true } }]}>
        <NoteIdDrill />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('carries on a paused session from home\'s notice, and clears the notice', () => {
    useDrillStore.getState().start(1, useAppStore.getState().settings, 1_000)
    useDrillStore.getState().pause('away', 2_000)
    useAppStore.setState({ pausedSession: { to: '/train/note-id', secondsLeft: 59, correct: 1, wrong: 0 } })
    render(
      <MemoryRouter initialEntries={[{ pathname: '/train/note-id', state: { resume: true } }]}>
        <NoteIdDrill />
      </MemoryRouter>,
    )
    expect(useDrillStore.getState().pausedAt).toBeNull()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(useAppStore.getState().pausedSession).toBeNull()
  })
})
