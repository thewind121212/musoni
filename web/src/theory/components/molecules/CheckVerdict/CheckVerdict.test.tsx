import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CheckVerdict } from './CheckVerdict'

describe('CheckVerdict', () => {
  it('says right or wrong in its colour, with the reason', () => {
    const { rerender } = render(<CheckVerdict correct title="Right: E" reason="Line 1 is E." />)
    expect(screen.getByRole('status')).toHaveTextContent('Right: ELine 1 is E.')
    expect(screen.getByText('Right: E')).toHaveClass('text-correct')
    rerender(<CheckVerdict correct={false} title="Not quite: it is E" reason="Line 1 is E." />)
    expect(screen.getByText('Not quite: it is E')).toHaveClass('text-wrong')
  })
})
