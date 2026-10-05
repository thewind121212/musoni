import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BeatDots } from './BeatDots'

describe('BeatDots', () => {
  it('lights as many dots as clicks have sounded, never more than it has', () => {
    const { container, rerender } = render(<BeatDots count={4} lit={2} label="count-in" />)
    expect(container.querySelectorAll('[data-lit]')).toHaveLength(2)
    rerender(<BeatDots count={4} lit={9} label="count-in" />)
    expect(container.querySelectorAll('[data-lit]')).toHaveLength(4)
    expect(screen.getByRole('img')).toHaveAccessibleName('count-in 4/4')
  })
})
