import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TipBox } from './TipBox'

describe('TipBox', () => {
  it('renders its hint', () => {
    render(<TipBox>Count line by line.</TipBox>)
    expect(screen.getByText('Count line by line.')).toBeInTheDocument()
  })
})
