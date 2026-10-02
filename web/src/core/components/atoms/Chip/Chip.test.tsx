import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Chip } from './Chip'

describe('Chip', () => {
  it('renders its children', () => {
    render(<Chip>difficulty 1.20x</Chip>)
    expect(screen.getByText('difficulty 1.20x')).toBeInTheDocument()
  })
})
