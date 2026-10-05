import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ResultPhase } from './ResultPhase'
import { useReviewStore } from '@/drills/review/store'
import { resetStores, session } from '@/test/fixtures'

beforeEach(() => resetStores({ lang: 'en', naming: 'letters' }))

describe('Review ResultPhase', () => {
  it('shows the score, and each missed question once with its count and the way to its lesson', () => {
    useReviewStore.setState({
      lastResult: session({ drill: 'review', practiceScore: 18, durationSec: 120, correct: 5, wrong: 3 }),
      misses: ['pitch-staff/pitch-names/4', 'pitch-staff/pitch-names/4', 'pitch-staff/pitch-names/5'],
    })
    render(<MemoryRouter><ResultPhase /></MemoryRouter>)
    expect(screen.getByText('18')).toBeInTheDocument()
    expect(screen.getByText('3 missed')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Tap the white key.*×2/ })).toHaveAttribute('href', '/theory/pitch-staff/pitch-names')
    expect(screen.getAllByRole('link', { name: /Lesson 1.1/ })).toHaveLength(2)
    expect(screen.getByRole('link', { name: 'Lessons' })).toHaveAttribute('href', '/learn')
  })
})
