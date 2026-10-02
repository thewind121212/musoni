import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KeyHint } from './KeyHint'

describe('KeyHint', () => {
  it('renders the key it names', () => {
    render(<KeyHint hint="a" />)
    expect(screen.getByText('a')).toBeInTheDocument()
  })
})
