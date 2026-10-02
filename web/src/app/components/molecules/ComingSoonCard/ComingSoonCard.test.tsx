import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComingSoonCard } from './ComingSoonCard'

describe('ComingSoonCard', () => {
  it('renders its title and description and offers nothing to press', () => {
    render(<ComingSoonCard icon={<svg />} title="Complete the measure" description="Coming soon" />)
    expect(screen.getByText('Complete the measure')).toBeInTheDocument()
    expect(screen.getByText('Coming soon')).toBeInTheDocument()
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.queryByRole('button')).toBeNull()
  })
})
