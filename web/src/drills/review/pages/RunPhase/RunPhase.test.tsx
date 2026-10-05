import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { RunPhase } from './RunPhase'
import { useReviewStore } from '@/drills/review/store'
import { getSettings, markLessonDone } from '@/progress/progressStore'
import { resetStores } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))

beforeEach(() => {
  resetStores({ lang: 'en', naming: 'letters' })
  markLessonDone('pitch-staff/pitch-names', { correct: 3, total: 3 })
  const now = Date.now()
  useReviewStore.setState({
    phase: 'running', settings: getSettings(), checkId: 'pitch-staff/pitch-names/3', feedback: null, recent: [],
    endsAt: now + 90_000, askedAt: now, correct: 2, wrong: 1, pausedAt: null, pauseReason: null,
  })
})

describe('Review RunPhase', () => {
  it('asks the check with its lesson above, under the clock and the counts', () => {
    render(<MemoryRouter><RunPhase /></MemoryRouter>)
    expect(screen.getByText('Lesson 1.1 · Pitch and note names')).toBeInTheDocument()
    expect(screen.getByText(/Which note is the coloured key/)).toBeInTheDocument()
    expect(screen.getByText('1:30')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled()
  })

  it('pauses to ask on ✕ once something was answered', async () => {
    render(<MemoryRouter><RunPhase /></MemoryRouter>)
    await userEvent.click(screen.getByRole('button', { name: 'Quit this session' }))
    expect(useReviewStore.getState().pauseReason).toBe('menu')
  })
})
