import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PracticeCard } from './PracticeCard'

describe('PracticeCard', () => {
  it('is one link to its drill, carrying the title, description and stats', () => {
    render(
      <MemoryRouter>
        <PracticeCard
          to="/train/note-id" icon={<svg />} title="Note reading" description="Name the note"
          stats={[{ icon: null, label: 'Best', value: '42' }]}
        />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/train/note-id')
    expect(link).toHaveTextContent('Note reading')
    expect(link).toHaveTextContent('Name the note')
    expect(link).toHaveTextContent('Best')
    expect(link).toHaveTextContent('42')
  })
})
