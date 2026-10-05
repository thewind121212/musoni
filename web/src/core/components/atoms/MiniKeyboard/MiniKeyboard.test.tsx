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

describe('MiniKeyboard for lessons', () => {
  it('spans several octaves and fills the marked keys instead of dotting them', () => {
    const { container } = render(<MiniKeyboard lit={[0, 13, 24]} octaves={3} mark="fill" />)
    expect(container.querySelectorAll('rect')).toHaveLength(36)
    expect(container.querySelectorAll('circle')).toHaveLength(0)
    const filled = [...container.querySelectorAll('rect[data-lit]')]
    expect(filled.map(k => k.getAttribute('data-lit'))).toEqual(['0', '24', '13'])
    expect(filled.every(k => /fill-accent/.test(k.getAttribute('class')!))).toBe(true)
  })

  it('places a label under the centre of its key', () => {
    const { getByText } = render(<MiniKeyboard lit={[0, 12]} octaves={2} mark="fill" labels={{ 0: 'Do3', 12: 'Do4' }} />)
    // C is the first of 14 white keys, the next C the eighth.
    expect(parseFloat(getByText('Do3').style.left)).toBeCloseTo((0.5 / 14) * 100)
    expect(parseFloat(getByText('Do4').style.left)).toBeCloseTo((7.5 / 14) * 100)
  })
})
