import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingScreen } from './LoadingScreen'

describe('LoadingScreen', () => {
  it('announces what is loading', () => {
    render(<LoadingScreen label="Loading the drill" />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading the drill')
  })
})
