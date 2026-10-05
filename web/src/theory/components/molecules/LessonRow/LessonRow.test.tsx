import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LessonRow } from './LessonRow'

describe('LessonRow', () => {
  it('links to its lesson and names its state for screen readers', () => {
    render(
      <MemoryRouter>
        <LessonRow to="/theory/a/b" title="The staff" state="current" mark="2" stateLabel="Up next" tag="3 min" />
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: /The staff/ })
    expect(link).toHaveAttribute('href', '/theory/a/b')
    expect(link).toHaveTextContent('Up next')
  })
})
