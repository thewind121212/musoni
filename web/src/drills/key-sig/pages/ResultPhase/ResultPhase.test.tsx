import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, session, withDrill } from '@/test/fixtures'
import { getSettings } from '@/progress/progressStore'

vi.mock('@/drills/key-sig/components/organisms/SignatureStaff', () => ({ SignatureStaff: () => <div data-testid="signature" /> }))
const { ResultPhase } = await import('./ResultPhase')
const { useKeySigStore } = await import('@/drills/key-sig/store')

const renderResult = () => render(<MemoryRouter><ResultPhase /></MemoryRouter>)
const letters = { ...getSettings(), naming: 'letters' as const }

beforeEach(() => {
  resetStores({ lang: 'en' })
  useKeySigStore.setState({ phase: 'setup', question: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null })
})

describe('Key signatures ResultPhase', () => {
  it('renders nothing without a finished session', () => {
    const { container } = renderResult()
    expect(container).toBeEmptyDOMElement()
  })

  it('names the session by its level and shows its score', () => {
    useKeySigStore.setState({ phase: 'finished', lastResult: session({ drill: 'key-sig', level: 4, practiceScore: 37 }) })
    renderResult()
    expect(screen.getByText('Major & minor session')).toBeInTheDocument()
    expect(screen.getByText('37')).toBeInTheDocument()
  })

  it('lists the missed keys by name, in the mode they were asked', () => {
    useKeySigStore.setState({
      phase: 'finished', settings: letters,
      lastResult: session({ drill: 'key-sig', level: 4 }),
      misses: [
        { fifths: 3, mode: 'minor', clef: 'bass', answer: 'F#', chosen: 'A' },
        { fifths: -7, mode: 'major', clef: 'treble', answer: 'Cb', chosen: 'B' },
      ],
    })
    renderResult()
    expect(screen.getByText('F# minor')).toBeInTheDocument()
    expect(screen.getByText('Cb major')).toBeInTheDocument()
    expect(screen.getAllByTestId('signature')).toHaveLength(2)
  })

  it('shows the time played for a session ended early', () => {
    useKeySigStore.setState({ phase: 'finished', lastResult: session({ drill: 'key-sig', partial: true, durationSec: 40 }) })
    renderResult()
    expect(screen.getByText('Ended early')).toBeInTheDocument()
  })

  it('goes again on the settings the session ran on', async () => {
    useKeySigStore.setState({ phase: 'finished', settings: withDrill('key-sig', { level: 3 }), lastResult: session({ drill: 'key-sig', level: 3 }) })
    renderResult()
    await userEvent.click(screen.getByRole('button', { name: /Again/ }))
    expect(useKeySigStore.getState()).toMatchObject({ phase: 'running', level: 3 })
  })
})
