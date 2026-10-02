import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScoreCompare } from './ScoreCompare'

describe('ScoreCompare', () => {
  it('renders both captions', () => {
    render(<ScoreCompare score={150} average={100} best={200} averageLabel="Week 100" bestLabel="Best 200" />)
    expect(screen.getByText('Week 100')).toBeInTheDocument()
    expect(screen.getByText('Best 200')).toBeInTheDocument()
  })

  it('scales the fill and the average tick against the best', () => {
    render(<ScoreCompare score={150} average={100} best={200} averageLabel="a" bestLabel="b" />)
    expect(screen.getByTestId('score-fill').style.width).toBe('75%')
    expect(screen.getByTestId('score-average').style.left).toBe('50%')
  })

  it('fills the track when the score is the new best, and drops the tick with no average', () => {
    render(<ScoreCompare score={250} average={null} best={200} averageLabel={null} bestLabel="b" />)
    expect(screen.getByTestId('score-fill').style.width).toBe('100%')
    expect(screen.queryByTestId('score-average')).toBeNull()
  })
})
