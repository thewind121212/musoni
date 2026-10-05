import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MarkDot } from './MarkDot'

describe('MarkDot', () => {
  it('names its mark for screen readers', () => {
    render(<MarkDot kind="late" label="late" />)
    expect(screen.getByRole('img', { name: 'late' })).toHaveAttribute('data-mark', 'late')
  })

  it('draws a different sign for early and late, so colour is never alone', () => {
    const { container: early } = render(<MarkDot kind="early" label="early" />)
    const { container: late } = render(<MarkDot kind="late" label="late" />)
    expect(early.querySelector('svg')!.innerHTML).not.toBe(late.querySelector('svg')!.innerHTML)
  })
})
