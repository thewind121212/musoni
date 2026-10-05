import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MissedChecks } from './MissedChecks'

describe('MissedChecks', () => {
  it('lists each missed question with a link to its lesson', () => {
    render(
      <MemoryRouter>
        <MissedChecks
          heading="Nên xem lại" countLabel="3 câu sai"
          misses={[{ id: 'a/b/2', prompt: 'Nốt này là nốt gì?', lesson: 'Bài 1.2 · Khuông nhạc', to: '/theory/a/b', count: 2 }]}
        />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /Nốt này là nốt gì\?.*Bài 1.2/ })).toHaveAttribute('href', '/theory/a/b')
    expect(screen.getByText('×2')).toBeInTheDocument()
  })

  it('shows nothing for a session with no misses', () => {
    const { container } = render(<MemoryRouter><MissedChecks heading="" countLabel="" misses={[]} /></MemoryRouter>)
    expect(container).toBeEmptyDOMElement()
  })
})
