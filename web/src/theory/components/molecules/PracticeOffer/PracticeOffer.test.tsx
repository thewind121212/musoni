import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PracticeOffer } from './PracticeOffer'

describe('PracticeOffer', () => {
  it('links to the drill with its summary', () => {
    render(
      <MemoryRouter>
        <PracticeOffer
          heading="Practice what you just read" icon={null} drill="Note reading" summary="Treble · 1 min"
          actionLabel="Practice now" to="/train/note-id" linkState={{ autostart: true }}
        />
      </MemoryRouter>,
    )
    expect(screen.getByText('Treble · 1 min')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Practice now' })).toHaveAttribute('href', '/train/note-id')
  })
})
