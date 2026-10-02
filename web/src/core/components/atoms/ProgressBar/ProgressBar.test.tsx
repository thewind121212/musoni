import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ProgressBar } from './ProgressBar'

const fill = (container: HTMLElement) => container.firstElementChild!.firstElementChild as HTMLElement

describe('ProgressBar', () => {
  it('renders with only a fraction', () => {
    const { container } = render(<ProgressBar fraction={0} />)
    expect(fill(container).style.width).toBe('0%')
  })

  it('fills to the fraction given', () => {
    const { container } = render(<ProgressBar fraction={0.25} />)
    expect(fill(container).style.width).toBe('25%')
  })

  it('turns red when urgent', () => {
    const { container, rerender } = render(<ProgressBar fraction={0.5} />)
    expect(fill(container)).toHaveClass('bg-accent')
    rerender(<ProgressBar fraction={0.5} urgent />)
    expect(fill(container)).toHaveClass('bg-wrong')
  })

  it('slides over the update interval it is given', () => {
    const { container } = render(<ProgressBar fraction={0.5} transitionMs={250} />)
    expect(fill(container).style.transition).toBe('width 250ms linear')
  })
})
