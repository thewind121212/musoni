import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepBar } from './StepBar'

describe('StepBar', () => {
  it('fills one segment per step reached', () => {
    const { container } = render(<StepBar total={6} filled={3} label="Step 3 of 6" />)
    expect(screen.getByRole('progressbar', { name: 'Step 3 of 6' })).toHaveAttribute('aria-valuenow', '3')
    expect(container.querySelectorAll('[data-filled]')).toHaveLength(3)
  })
})
