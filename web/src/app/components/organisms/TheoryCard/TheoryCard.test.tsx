import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TheoryCard } from './TheoryCard'

const base = { title: 'Music theory', doneLabel: 'All done', allLabel: 'See all lessons', allTo: '/theory' }

describe('TheoryCard', () => {
  it('offers the next lesson with its chapter progress', () => {
    render(
      <MemoryRouter>
        <TheoryCard
          {...base}
          next={{ label: 'Next lesson', title: 'The staff', to: '/theory/a/b', action: 'Continue · 4 min' }}
          chapter={{ label: 'Chapter 1 · Pitch', progress: '1/5 lessons', fraction: 0.2 }}
        />
      </MemoryRouter>,
    )
    expect(screen.getByText('The staff')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Continue · 4 min' })).toHaveAttribute('href', '/theory/a/b')
    expect(screen.getByRole('link', { name: 'See all lessons' })).toHaveAttribute('href', '/theory')
  })

  it('says so once everything is done, with no start button', () => {
    render(<MemoryRouter><TheoryCard {...base} next={null} chapter={null} /></MemoryRouter>)
    expect(screen.getByText('All done')).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(1)
  })
})
