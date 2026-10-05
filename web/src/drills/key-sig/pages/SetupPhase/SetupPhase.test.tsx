import { beforeEach, describe, it, expect, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, session } from '@/test/fixtures'
import { getSettings, recordSession } from '@/progress/progressStore'

vi.mock('@/drills/key-sig/components/organisms/SignatureStaff', () => ({ SignatureStaff: () => <div data-testid="signature" /> }))
const { SetupPhase } = await import('./SetupPhase')
const { useKeySigStore } = await import('@/drills/key-sig/store')
const { useAppStore } = await import('@/app/store')

const renderSetup = () => render(<MemoryRouter><SetupPhase /></MemoryRouter>)

beforeEach(() => {
  resetStores({ lang: 'en' })
  useKeySigStore.setState({ phase: 'setup', question: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null })
})

describe('Key signatures SetupPhase', () => {
  it('renders with default settings, a signature picture per level', () => {
    resetStores()
    renderSetup()
    expect(screen.getByRole('button', { name: /Bắt đầu/ })).toBeInTheDocument()
    expect(screen.getAllByTestId('signature')).toHaveLength(4)
  })

  it('saves the level as this drill\'s own and sums the session up', async () => {
    renderSetup()
    await userEvent.click(screen.getByRole('radio', { name: /15 keys/ }))
    expect(getSettings().drills['key-sig'].level).toBe(3)
    expect(screen.getByText('15 keys · 1 min')).toBeInTheDocument()
  })

  it('shows the best for the chosen level only', () => {
    recordSession(session({ drill: 'key-sig', level: 1, practiceScore: 44 }))
    renderSetup()
    expect(screen.getByText('44')).toBeInTheDocument()
    act(() => useAppStore.getState().updateDrill('key-sig', { level: 2 }))
    expect(screen.queryByText('44')).toBeNull()
  })

  it('starts a session on the chosen level and length', async () => {
    useAppStore.getState().updateDrill('key-sig', { level: 4, durationSec: 120 })
    renderSetup()
    await userEvent.click(screen.getByRole('button', { name: /Start/ }))
    expect(useKeySigStore.getState()).toMatchObject({ phase: 'running', level: 4 })
    expect(useKeySigStore.getState().endsAt! - Date.now()).toBeGreaterThan(110_000)
  })

  it('turns the sound off from its switch', async () => {
    renderSetup()
    const before = getSettings().sound
    await userEvent.click(screen.getByRole('switch', { name: 'Sound' }))
    expect(getSettings().sound).toBe(!before)
  })
})
