import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TabChrome } from './TabChrome'
import { useAppStore } from '@/app/store'
import { resetStores } from '@/test/fixtures'

const at = (path: string) => render(<MemoryRouter initialEntries={[path]}><TabChrome /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('TabChrome', () => {
  it('shows the tabs on a tab, and offers back a paused session in its drill colour', () => {
    useAppStore.setState({ pausedSession: { to: '/train/hear-play', secondsLeft: 18, correct: 4, wrong: 1 } })
    at('/learn')
    expect(screen.getByRole('link', { name: 'Learn' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('status')).toHaveTextContent('0:18 left')
    expect(screen.getByRole('link', { name: 'Resume' }).closest('[data-drill]')).toHaveAttribute('data-drill', 'hear-play')
  })

  it('shows nothing off the tabs', () => {
    const { container } = at('/train/note-id')
    expect(container).toBeEmptyDOMElement()
  })
})
