import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RuleLine } from './RuleLine'

describe('RuleLine', () => {
  it('says the rule in green when right and in red when wrong', () => {
    const { rerender } = render(<RuleLine text="A major: 3 sharps" correct />)
    expect(screen.getByRole('status')).toHaveTextContent('A major: 3 sharps')
    expect(screen.getByRole('status')).toHaveClass('text-correct')
    rerender(<RuleLine text="A major: 3 sharps" correct={false} />)
    expect(screen.getByRole('status')).toHaveClass('text-wrong')
  })
})
