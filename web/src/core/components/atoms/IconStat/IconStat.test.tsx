import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IconStat } from './IconStat'

describe('IconStat', () => {
  it('renders its icon, label and value', () => {
    render(<IconStat icon={<svg data-testid="icon" />} label="Active days" value="12" />)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Active days')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
  })
})
