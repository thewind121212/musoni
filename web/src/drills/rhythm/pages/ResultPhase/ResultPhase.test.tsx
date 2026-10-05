import { beforeEach, describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, session, withDrill } from '@/test/fixtures'

vi.mock('@/core/components/organisms/Staff', () => ({
  Staff: () => <div data-testid="staff" />,
  NoteStaff: () => <div data-testid="staff" />,
}))

const { ResultPhase } = await import('./ResultPhase')
const { useRhythmStore } = await import('@/drills/rhythm/store')
const { allMeasures } = await import('@/drills/rhythm/generator')
const { judgeTaps } = await import('@/drills/rhythm/judge')

const renderResult = () => render(<MemoryRouter><ResultPhase /></MemoryRouter>)
const rhythmSession = (o = {}) => session({ drill: 'rhythm', level: 2, avgMs: 34, practiceScore: 21, ...o })

beforeEach(() => {
  resetStores({ lang: 'en' })
  useRhythmStore.setState({ phase: 'finished', misses: [], settings: withDrill('rhythm', { level: 2, tempo: 80 }) })
})

describe('Rhythm ResultPhase', () => {
  it('shows the score, the level and the average offset', () => {
    useRhythmStore.setState({ lastResult: rhythmSession() })
    renderResult()
    expect(screen.getByText('Eighths and rests session')).toBeInTheDocument()
    expect(screen.getByText('21')).toBeInTheDocument()
    expect(screen.getByText('34 ms')).toBeInTheDocument()
    expect(screen.getByText('Avg off')).toBeInTheDocument()
  })

  it('shows a dash for the offset when no measure was played', () => {
    useRhythmStore.setState({ lastResult: rhythmSession({ correct: 0, wrong: 0, avgMs: 0, partial: true }) })
    renderResult()
    expect(screen.getByText('Ended early')).toBeInTheDocument()
    expect(screen.getByText('–')).toBeInTheDocument()
  })

  it('lists the measures missed, each on its staff', () => {
    const [a, b] = allMeasures(2)
    const miss = (m: typeof a) => ({ measure: m, judgement: judgeTaps([0, 750], [], 100, 3000) })
    useRhythmStore.setState({ lastResult: rhythmSession(), misses: [miss(a), miss(b)] })
    renderResult()
    expect(screen.getByText('Measures to review')).toBeInTheDocument()
    expect(screen.getByText('2 measures')).toBeInTheDocument()
    expect(screen.getAllByTestId('rhythm-staff')).toHaveLength(2)
  })

  it('goes again on the same settings', () => {
    useRhythmStore.setState({ lastResult: rhythmSession() })
    renderResult()
    fireEvent.click(screen.getByRole('button', { name: /Again/ }))
    expect(useRhythmStore.getState().phase).toBe('running')
    expect(useRhythmStore.getState().level).toBe(2)
  })
})
