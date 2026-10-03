import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MiniKeyboard } from './MiniKeyboard'

describe('MiniKeyboard', () => {
  it('draws an octave of plain keys and marks only the given notes with a dot, white and black', () => {
    const { container } = render(<MiniKeyboard lit={[0, 4, 7, 6]} />)
    const keys = [...container.querySelectorAll('rect')]
    expect(keys).toHaveLength(12)
    // The keys never change colour: a lit key would read as a block, not a key.
    expect(keys.every(k => !/accent|cta/.test(k.getAttribute('class')!))).toBe(true)
    const dots = [...container.querySelectorAll('circle[data-lit]')]
    expect(dots.map(d => d.getAttribute('data-lit'))).toEqual(['0', '4', '7', '6'])
  })

  it('draws no dots when nothing is lit', () => {
    const { container } = render(<MiniKeyboard lit={[]} />)
    expect(container.querySelectorAll('circle')).toHaveLength(0)
  })
})
