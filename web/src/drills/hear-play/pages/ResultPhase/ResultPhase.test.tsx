import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, session } from '@/test/fixtures'

vi.mock('@/core/components/organisms/Staff', () => ({ Staff: () => <div data-testid="staff" /> }))
const { ResultPhase } = await import('./ResultPhase')
const { useEarStore } = await import('@/drills/hear-play/store')

const renderResult = () => render(<MemoryRouter><ResultPhase /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('Hear & play ResultPhase', () => {
  it('names the session by its Hear & play level', () => {
    useEarStore.setState({ phase: 'finished', lastResult: session({ drill: 'hear-play', level: 2, practiceScore: 18 }) })
    renderResult()
    expect(screen.getByText('Five notes session')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
  })

  it('shows the time played for a session ended early', () => {
    useEarStore.setState({ phase: 'finished', lastResult: session({ drill: 'hear-play', partial: true, durationSec: 40 }) })
    renderResult()
    expect(screen.getByText('Ended early')).toBeInTheDocument()
  })

  it('goes again at the same level', async () => {
    useEarStore.setState({ phase: 'finished', lastResult: session({ drill: 'hear-play', level: 4 }) })
    renderResult()
    await userEvent.click(screen.getByRole('button', { name: /Again/ }))
    expect(useEarStore.getState().phase).toBe('running')
    expect(useEarStore.getState().level).toBe(4)
  })
})
