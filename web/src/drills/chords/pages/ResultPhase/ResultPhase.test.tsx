import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { resetStores, session, withDrill } from '@/test/fixtures'

vi.mock('@/core/components/organisms/Staff', () => ({ NoteStaff: () => <div data-testid="note-staff" /> }))
const { ResultPhase } = await import('./ResultPhase')
const { useChordStore } = await import('@/drills/chords/store')
const { nameQuestion, romanQuestion } = await import('@/drills/chords/generator')

const renderResult = () => render(<MemoryRouter><ResultPhase /></MemoryRouter>)

beforeEach(() => {
  resetStores({ lang: 'en' })
  useChordStore.setState({ phase: 'finished', misses: [], lastResult: null })
})

describe('Chords ResultPhase', () => {
  it('names the session by its level', () => {
    useChordStore.setState({ lastResult: session({ drill: 'chords', level: 6, practiceScore: 18 }) })
    renderResult()
    expect(screen.getByText('Numerals · 4 ♯/♭ session')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
  })

  it('lists the chords missed, with the symbol and the pick', () => {
    const am = nameQuestion(4, 'letters', { root: { letter: 'A', accidental: '' }, quality: 'minor', inversion: 1, weight: 1 })
    const v = romanQuestion('G', 4, 1)
    useChordStore.setState({
      lastResult: session({ drill: 'chords', level: 4 }),
      misses: [{ question: am, answer: { root: am.correctIndex, quality: 'major' } }, { question: v, answer: { degree: 0 } }],
    })
    renderResult()
    expect(screen.getByRole('heading', { name: 'Chords to review' })).toBeInTheDocument()
    expect(screen.getByText('Am/C')).toBeInTheDocument()
    expect(screen.getByText('you picked A major')).toBeInTheDocument()
    expect(screen.getByText('V · D')).toBeInTheDocument()
    expect(screen.getByText('you picked I')).toBeInTheDocument()
  })

  it('shows the time played for a session ended early', () => {
    useChordStore.setState({ lastResult: session({ drill: 'chords', partial: true, durationSec: 40 }) })
    renderResult()
    expect(screen.getByText('Ended early')).toBeInTheDocument()
  })

  it('goes again on the same settings', async () => {
    useChordStore.setState({
      settings: withDrill('chords', { level: 5, mode: 'roman' }),
      lastResult: session({ drill: 'chords', level: 5 }),
    })
    renderResult()
    await userEvent.click(screen.getByRole('button', { name: /Again/ }))
    expect(useChordStore.getState().phase).toBe('running')
    expect(useChordStore.getState().level).toBe(5)
  })
})
