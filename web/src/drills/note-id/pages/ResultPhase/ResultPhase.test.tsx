import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ResultPhase } from './ResultPhase'
import { useDrillStore } from '@/drills/note-id/store'
import { recordSession } from '@/progress/progressStore'
import { resetStores, session } from '@/test/fixtures'

const renderResult = () => render(<MemoryRouter><ResultPhase /></MemoryRouter>)

/** Finishes a session the way the drill store does: recorded, then shown. */
function finish(overrides: Parameters<typeof session>[0] = {}) {
  const result = session(overrides)
  recordSession(result)
  useDrillStore.setState({ phase: 'finished', lastResult: result })
  return result
}

beforeEach(() => resetStores({ lang: 'en' }))

describe('ResultPhase', () => {
  it('renders nothing without a finished session', () => {
    const { container } = renderResult()
    expect(container).toBeEmptyDOMElement()
  })

  it('calls a session that matches the best a personal best', () => {
    finish({ practiceScore: 50 })
    renderResult()
    expect(screen.getByText('Personal best')).toBeInTheDocument()
    expect(screen.queryByText(/to go/)).toBeNull()
  })

  it('points to the standing best when this session fell short of it', () => {
    recordSession(session({ practiceScore: 70 }))
    finish({ practiceScore: 50 })
    renderResult()
    expect(screen.queryByText('Personal best')).toBeNull()
    expect(screen.getByText(/Best 70 · 20 to go/)).toBeInTheDocument()
  })

  it('compares against bests at the same level only', () => {
    recordSession(session({ level: 2, practiceScore: 90 }))
    finish({ level: 1, practiceScore: 50 })
    renderResult()
    expect(screen.getByText('Personal best')).toBeInTheDocument()
  })

  it('runs the same level again', async () => {
    finish({ level: 3 })
    renderResult()
    await userEvent.click(screen.getByRole('button', { name: /Again/ }))
    expect(useDrillStore.getState().phase).toBe('running')
    expect(useDrillStore.getState().level).toBe(3)
  })

  it('goes back to setup', async () => {
    finish()
    renderResult()
    await userEvent.click(screen.getByRole('button', { name: 'Change setup' }))
    expect(useDrillStore.getState().phase).toBe('setup')
  })

  it("sets the score against this week's average", () => {
    recordSession(session({ practiceScore: 40, at: new Date(Date.now() - 3600_000).toISOString() }))
    finish({ practiceScore: 50 })
    renderResult()
    expect(screen.getByText('Week average 40')).toBeInTheDocument()
    expect(screen.getByText('+10 on this week')).toBeInTheDocument()
  })

  it('lists the notes this session missed', () => {
    finish()
    useDrillStore.setState({
      misses: [{ clef: 'treble', pitch: { letter: 'G', accidental: '', octave: 4 }, answer: 'G', chosen: 'A' }],
    })
    renderResult()
    expect(screen.getByText('Notes to review')).toBeInTheDocument()
    expect(screen.getByText('you picked A')).toBeInTheDocument()
  })

  it('shows a session ended early by its time played, with no score or best', () => {
    recordSession(session({ practiceScore: 70 }))
    finish({ partial: true, practiceScore: 0, durationSec: 125 })
    renderResult()
    expect(screen.getByRole('heading', { name: 'You practised 2 min 5 sec' })).toBeInTheDocument()
    expect(screen.queryByText(/Best 70/)).toBeNull()
    expect(screen.queryByText('Personal best')).toBeNull()
    expect(screen.getByRole('button', { name: /New session/ })).toBeInTheDocument()
  })
})
