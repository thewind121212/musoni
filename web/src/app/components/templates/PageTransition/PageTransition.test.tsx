import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageTransition } from './PageTransition'

const wrapper = () => screen.getByRole('heading', { name: 'Home' }).parentElement!

describe('PageTransition', () => {
  it('slides a page in when moving forward', () => {
    render(<PageTransition><h1>Home</h1></PageTransition>)
    expect(wrapper().style.opacity).toBe('0')
  })

  it('shows the page as-is when instant (back and forward)', () => {
    render(<PageTransition instant><h1>Home</h1></PageTransition>)
    expect(wrapper().style.opacity).not.toBe('0')
    expect(wrapper().style.transform).not.toMatch(/translate/)
  })
})
