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
})
