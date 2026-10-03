import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, session } from '@/test/fixtures'
import { recordSession } from '@/progress/progressStore'

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

  it('says an aided session does not count toward the best, and claims no best', () => {
    recordSession(session({ drill: 'hear-play', level: 1, practiceScore: 25 }))
    useEarStore.setState({ phase: 'finished', lastResult: session({ drill: 'hear-play', practiceScore: 25, aids: true }) })
    renderResult()
    expect(screen.getByText("Listening aids on — doesn't count toward your best")).toBeInTheDocument()
    expect(screen.queryByText('Personal best')).toBeNull()
  })

  it('draws no best bar from an aided score when there is no plain best yet', () => {
    useEarStore.setState({ phase: 'finished', lastResult: session({ drill: 'hear-play', practiceScore: 25, aids: true }) })
    renderResult()
    expect(screen.queryByText('Best 25')).toBeNull()
  })

  it('shows no aids line for a plain session', () => {
    useEarStore.setState({ phase: 'finished', lastResult: session({ drill: 'hear-play', practiceScore: 25 }) })
    renderResult()
    expect(screen.queryByText(/Listening aids on/)).toBeNull()
  })
})
