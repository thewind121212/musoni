import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, session, withDrill } from '@/test/fixtures'

vi.mock('@/core/components/organisms/Staff', () => ({
  Staff: () => <div data-testid="staff" />, NoteStaff: () => <div data-testid="staff" />,
}))
const { ResultPhase } = await import('./ResultPhase')
const { useIntervalsStore } = await import('@/drills/intervals/store')

const renderResult = () => render(<MemoryRouter><ResultPhase /></MemoryRouter>)
const E4 = { letter: 'E', accidental: '', octave: 4 } as const
const C5 = { letter: 'C', accidental: '', octave: 5 } as const

beforeEach(() => {
  resetStores({ lang: 'en' })
  useIntervalsStore.setState({ phase: 'setup', question: null, feedback: null, misses: [], pausedAt: null, pauseReason: null })
})

describe('Intervals ResultPhase', () => {
  it('names the session by its level and lists the intervals missed', () => {
    useIntervalsStore.setState({
      phase: 'finished',
      lastResult: session({ drill: 'intervals', level: 2, practiceScore: 18 }),
      misses: [{
        question: { clef: 'treble', lower: E4, upper: C5, interval: { size: 6, quality: 'm' }, layout: 'melodic' },
        chosen: { row: 'MP', size: 6 },
      }],
    })
    renderResult()
    expect(screen.getByText('Major, minor, perfect session')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
    expect(screen.getByText('Intervals to review')).toBeInTheDocument()
    expect(screen.getByText('you picked M6')).toBeInTheDocument()
  })

  it('shows the time played for a session ended early', () => {
    useIntervalsStore.setState({ phase: 'finished', lastResult: session({ drill: 'intervals', partial: true, durationSec: 40 }) })
    renderResult()
    expect(screen.getByText('Ended early')).toBeInTheDocument()
  })

  it('goes again on the same settings', async () => {
    useIntervalsStore.setState({
      phase: 'finished', settings: withDrill('intervals', { level: 4 }), lastResult: session({ drill: 'intervals', level: 4 }),
    })
    renderResult()
    await userEvent.click(screen.getByRole('button', { name: /Again/ }))
    expect(useIntervalsStore.getState()).toMatchObject({ phase: 'running', level: 4 })
  })
})
