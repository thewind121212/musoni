import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MiniKeyboard } from './MiniKeyboard'

describe('MiniKeyboard', () => {
  it('draws an octave and lights only the keys it is given, white and black', () => {
    const { container } = render(<MiniKeyboard lit={[0, 4, 7, 6]} />)
    expect(container.querySelectorAll('rect')).toHaveLength(12)
    expect(container.querySelectorAll('[data-lit]')).toHaveLength(4)
  })
})
