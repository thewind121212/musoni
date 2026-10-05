import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ActivityPanel } from './ActivityPanel'
import { t } from '@/test/i18n'

const base = {
  minutesByDay: {}, longestStreak: 0, activeDays: 0,
  expanded: false, onToggle: () => {}, lang: 'en' as const, t,
}

describe('ActivityPanel', () => {
  it('shows this week when collapsed and the calendar with totals when expanded', () => {
    const collapsed = render(<ActivityPanel {...base} />)
    expect(collapsed.container.querySelectorAll('[title]')).toHaveLength(7)
    expect(screen.queryByText('Longest streak')).toBeNull()
    collapsed.unmount()

    // Rendered fresh: a rerender would keep the outgoing week mid-cross-fade.
    const { container } = render(<ActivityPanel {...base} expanded longestStreak={9} activeDays={21} />)
    expect(container.querySelectorAll('[title]')).toHaveLength(140)
    expect(screen.getByText('Longest streak')).toBeInTheDocument()
    expect(screen.getByText('9 days')).toBeInTheDocument()
    expect(screen.getByText('21')).toBeInTheDocument()
  })

  it('asks the page to toggle, and reports its state on the button', async () => {
    const onToggle = vi.fn()
    const { rerender } = render(<ActivityPanel {...base} onToggle={onToggle} />)
    const button = screen.getByRole('button', { name: /Show calendar/ })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(button)
    expect(onToggle).toHaveBeenCalledOnce()

    rerender(<ActivityPanel {...base} expanded onToggle={onToggle} />)
    expect(screen.getByRole('button', { name: /Show less/ })).toHaveAttribute('aria-expanded', 'true')
  })
})
