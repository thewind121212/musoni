import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ActivityPanel } from './ActivityPanel'
import { t } from '@/test/i18n'

const base = {
  minutesByDay: {}, todayMinutes: 0, dailyGoal: 5, streak: 0, longestStreak: 0, activeDays: 0,
  expanded: false, onToggle: () => {}, lang: 'en' as const, t,
}

describe('ActivityPanel', () => {
  it('renders for a reader who has never practised', () => {
    render(<ActivityPanel {...base} />)
    expect(screen.getByText('Not yet')).toBeInTheDocument()
    expect(screen.queryByText(/^\d+ days?$/)).toBeNull()
  })

  it('says how far today is from the daily goal, then that it is reached', () => {
    const { rerender } = render(<ActivityPanel {...base} todayMinutes={2} />)
    expect(screen.getByText("3 min to today's goal")).toBeInTheDocument()
    expect(screen.queryByText('Not yet')).toBeNull()
    rerender(<ActivityPanel {...base} todayMinutes={7} />)
    expect(screen.getByText("Today's goal reached")).toBeInTheDocument()
  })

  it('shows the streak pill only while a streak is running', () => {
    const { rerender } = render(<ActivityPanel {...base} streak={1} />)
    expect(screen.getByText('1 day')).toBeInTheDocument()
    rerender(<ActivityPanel {...base} streak={4} />)
    expect(screen.getByText('4 days')).toBeInTheDocument()
  })

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
