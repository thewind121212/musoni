import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LessonEnd } from './LessonEnd'

const base = {
  eyebrow: 'Lesson 1.2 done', title: 'The staff and clefs', recapHeading: 'What you learned',
  recap: ['Five lines, four spaces'], next: { to: '/theory/a/c', label: 'Next: C clefs' }, source: 'credit',
}

describe('LessonEnd', () => {
  it('shows the recap and score, and keeps the next lesson quiet beside a practice card', () => {
    render(<MemoryRouter><LessonEnd {...base} score={{ label: 'Checks:', value: '3/4 right' }} practice={<p>practice card</p>} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: 'The staff and clefs' })).toBeInTheDocument()
    expect(screen.getByText('3/4 right')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Next: C clefs' })).not.toHaveClass('bg-accent')
  })

  it('makes the next lesson the main action when no drill fits, with a second link', () => {
    render(<MemoryRouter><LessonEnd {...base} also={{ to: '/theory/a/r', label: 'Review the chapter' }} /></MemoryRouter>)
    expect(screen.getByRole('link', { name: 'Next: C clefs' })).toHaveClass('bg-accent')
    expect(screen.getByRole('link', { name: 'Review the chapter' })).toHaveAttribute('href', '/theory/a/r')
  })
})
