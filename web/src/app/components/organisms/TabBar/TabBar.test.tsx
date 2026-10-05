import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { TabBar } from './TabBar'

const tabs = [
  { id: 'practice' as const, label: 'Luyện', icon: () => null, to: '/' },
  { id: 'learn' as const, label: 'Học', icon: () => null, to: '/learn' },
]

describe('TabBar', () => {
  it('marks the tab on screen and leaves the way a tab opens to the page', async () => {
    const onSelect = vi.fn()
    render(<MemoryRouter><TabBar tabs={tabs} current="practice" onSelect={onSelect} label="Tabs" brand="musoni" /></MemoryRouter>)
    expect(screen.getByRole('link', { name: 'Luyện' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Học' })).toHaveAttribute('href', '/learn')
    await userEvent.click(screen.getByRole('link', { name: 'Học' }))
    expect(onSelect).toHaveBeenCalledWith('learn')
  })
})
