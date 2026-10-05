import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SourceLine } from './SourceLine'

describe('SourceLine', () => {
  it('links each section to the book and the licence to the about page', () => {
    render(
      <MemoryRouter>
        <SourceLine
          adapted="Adapted from" sectionWord="sections" aboutTo="/theory/about"
          sources={[{ section: '1.2', url: 'https://x.test/a' }, { section: '1.3', url: 'https://x.test/b' }]}
        />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: '1.3' })).toHaveAttribute('href', 'https://x.test/b')
    expect(screen.getByRole('link', { name: 'GNU FDL 1.3' })).toHaveAttribute('href', '/theory/about')
    expect(screen.getByText(/1\.2/).closest('p')).toHaveTextContent('Adapted from Music Theory for the 21st-Century Classroom, R. Hutchinson, sections 1.2, 1.3 · GNU FDL 1.3')
  })
})
