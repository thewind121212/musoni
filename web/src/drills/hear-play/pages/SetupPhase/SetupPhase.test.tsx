import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { SetupPhase } from './SetupPhase'
import { useAppStore } from '@/app/store'
import { useEarStore } from '@/drills/hear-play/store'
import { getSettings, recordSession } from '@/progress/progressStore'
import { resetStores, session } from '@/test/fixtures'

const renderSetup = () => render(<MemoryRouter><SetupPhase /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('Hear & play SetupPhase', () => {
  it('renders with default settings', () => {
    resetStores()
    renderSetup()
    expect(screen.getByRole('button', { name: /Bắt đầu/ })).toBeInTheDocument()
  })

  it("saves its own level, leaving note reading's alone", async () => {
    renderSetup()
    await userEvent.click(screen.getByRole('radio', { name: /Full scale/ }))
    expect(getSettings().earLevel).toBe(3)
    expect(getSettings().level).toBe(1)
  })

  it('shows the best Hear & play score at the level, not a note-reading one', () => {
    recordSession(session({ level: 1, practiceScore: 44 }))
    recordSession(session({ drill: 'hear-play', level: 1, practiceScore: 21 }))
    renderSetup()
    expect(screen.getByText('21')).toBeInTheDocument()
    expect(screen.queryByText('44')).toBeNull()
  })

  it('starts a session at the chosen level and length', async () => {
    useAppStore.getState().updateSettings({ earLevel: 2, earDurationSec: 60 })
    renderSetup()
    await userEvent.click(screen.getByRole('button', { name: /Start/ }))
    expect(useEarStore.getState().phase).toBe('running')
    expect(useEarStore.getState().level).toBe(2)
    expect(useEarStore.getState().settings.earDurationSec).toBe(60)
  })

  it('saves the listening aids, and greys out one key at level 1', async () => {
    renderSetup()
    await userEvent.click(screen.getByRole('switch', { name: 'Key before every note' }))
    expect(getSettings().earCadenceEach).toBe(true)
    expect(screen.getByRole('switch', { name: 'Stay in one key (C)' })).toBeDisabled()
    expect(screen.getByText('This level is already in C')).toBeInTheDocument()
  })

  it('lets one key be switched on from level 2', async () => {
    useAppStore.getState().updateSettings({ earLevel: 2 })
    renderSetup()
    await userEvent.click(screen.getByRole('switch', { name: 'Stay in one key (C)' }))
    expect(getSettings().earOneKey).toBe(true)
  })

  it('shows a stored one-key setting as off at level 1', () => {
    useAppStore.getState().updateSettings({ earLevel: 1, earOneKey: true })
    renderSetup()
    expect(screen.getByRole('switch', { name: 'Stay in one key (C)' })).toHaveAttribute('aria-checked', 'false')
    expect(screen.queryByText(/One key/)).toBeNull()
  })

  it('tags the summary with the aids in use', () => {
    useAppStore.getState().updateSettings({ earLevel: 3, earOneKey: true, earCadenceEach: true })
    renderSetup()
    expect(screen.getByText(/Key every note · One key/)).toBeInTheDocument()
  })
})
