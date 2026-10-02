import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageTransition } from './PageTransition'

describe('PageTransition', () => {
  it('renders the page it wraps', () => {
    render(<PageTransition><h1>Home</h1></PageTransition>)
    expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
  })
})
