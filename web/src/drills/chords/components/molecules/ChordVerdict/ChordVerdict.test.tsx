import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChordVerdict } from './ChordVerdict'

describe('ChordVerdict', () => {
  it('says nothing before the answer', () => {
    render(<ChordVerdict verdict={null} />)
    expect(screen.queryByRole('status')).toBeNull()
  })

  it('names the chord when right, and adds the pick when missed', () => {
    const { rerender } = render(<ChordVerdict verdict={{ correct: true, answer: 'Am/C · A minor', chosen: null }} />)
    expect(screen.getByRole('status')).toHaveTextContent(/^Am\/C · A minor$/)
    expect(screen.getByRole('status')).toHaveClass('text-correct')
    rerender(<ChordVerdict verdict={{ correct: false, answer: 'Am/C · A minor', chosen: 'you picked C major' }} />)
    expect(screen.getByRole('status')).toHaveTextContent('Am/C · A minoryou picked C major')
    expect(screen.getByRole('status')).toHaveClass('text-wrong')
  })
})
