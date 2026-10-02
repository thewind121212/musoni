import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatTile } from './StatTile'

describe('StatTile', () => {
  it('renders its value and label', () => {
    render(<StatTile value="87%" label="Accuracy" />)
    expect(screen.getByText('87%')).toBeInTheDocument()
    expect(screen.getByText('Accuracy')).toBeInTheDocument()
  })
})
