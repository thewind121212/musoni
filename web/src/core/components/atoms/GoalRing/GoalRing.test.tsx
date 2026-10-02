import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GoalRing } from './GoalRing'

const offset = () => Number(screen.getByTestId('goal-arc').getAttribute('stroke-dashoffset'))

describe('GoalRing', () => {
  it('shows progress against the goal', () => {
    render(<GoalRing value={2} goal={5} unit="min" />)
    expect(screen.getByText('/5')).toBeInTheDocument()
    expect(screen.getByText('min')).toBeInTheDocument()
  })

  it('fills in proportion and stops at full', () => {
    const { rerender } = render(<GoalRing value={0} goal={4} unit="min" />)
    const empty = offset()
    rerender(<GoalRing value={2} goal={4} unit="min" />)
    expect(offset()).toBeCloseTo(empty / 2)
    rerender(<GoalRing value={9} goal={4} unit="min" />)
    expect(offset()).toBe(0)
  })
})
