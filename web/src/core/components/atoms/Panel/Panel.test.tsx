import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Panel } from './Panel'

describe('Panel', () => {
  it('renders its children', () => {
    render(<Panel><p>inside</p></Panel>)
    expect(screen.getByText('inside')).toBeInTheDocument()
  })
})
