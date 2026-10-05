import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LearnTab } from './LearnTab'
import { markLessonDone, recordSession } from '@/progress/progressStore'
import { resetStores, session } from '@/test/fixtures'

const renderTab = () => render(<MemoryRouter><LearnTab /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en', naming: 'letters', startPoint: 'beginner' }))

describe('LearnTab', () => {
  it('opens a new reader on the first lesson and the first chapter only, with no review yet', () => {
    renderTab()
    expect(screen.getByText('First lesson')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Pitch and note names' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Learn · 3 min' })).toHaveAttribute('href', '/theory/pitch-staff/pitch-names')
    expect(screen.getByText(/Chapter 1 · Pitch and the staff/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Octaves and middle C/ })).toHaveAttribute('href', '/theory/pitch-staff/octaves')
    expect(screen.queryByText('Review')).toBeNull()
    expect(screen.getByRole('link', { name: 'Change where you start' })).toHaveAttribute('href', '/welcome')
  })

  it('carries on with the next lesson and offers the review once a lesson is finished', () => {
    markLessonDone('pitch-staff/pitch-names', { correct: 3, total: 3 })
    renderTab()
    expect(screen.getByText('Next lesson')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Learn · 4 min' })).toHaveAttribute('href', '/theory/pitch-staff/staff-clefs')
    expect(screen.getByRole('link', { name: 'Review' })).toHaveAttribute('href', '/train/review')
    expect(screen.getByText('Not tried')).toBeInTheDocument()
  })

  it("shows the review's length and best once it has been played", () => {
    markLessonDone('pitch-staff/pitch-names', { correct: 3, total: 3 })
    recordSession(session({ drill: 'review', practiceScore: 23, durationSec: 120 }))
    renderTab()
    expect(screen.getByText('23')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Practice' })).toHaveAttribute('href', '/train/review')
  })
})
