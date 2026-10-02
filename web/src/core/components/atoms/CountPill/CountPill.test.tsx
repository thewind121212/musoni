import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CountPill } from './CountPill'

describe('CountPill', () => {
  it('shows the count and gives screen readers the label instead', () => {
    const { container } = render(<CountPill tone="correct" count={4} label="4 correct" />)
    expect(screen.getByText('4')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('4 correct')).toHaveClass('sr-only')
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('colours by tone, so right and wrong never look the same', () => {
    const { rerender, container } = render(<CountPill tone="correct" count={1} label="" />)
    const pill = container.firstElementChild!
    expect(pill).toHaveClass('text-correct')
    const correctIcon = pill.querySelector('svg')!.innerHTML
    rerender(<CountPill tone="wrong" count={1} label="" />)
    expect(pill).toHaveClass('text-wrong')
    expect(pill).not.toHaveClass('text-correct')
    // The icon changes too: colour is never the only signal.
    expect(pill.querySelector('svg')!.innerHTML).not.toBe(correctIcon)
  })

  it('forwards extra attributes such as a test id', () => {
    render(<CountPill tone="wrong" count={0} label="" data-testid="pill" />)
    expect(screen.getByTestId('pill')).toBeInTheDocument()
  })
})
