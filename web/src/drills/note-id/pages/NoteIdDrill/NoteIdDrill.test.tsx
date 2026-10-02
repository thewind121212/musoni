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
})
