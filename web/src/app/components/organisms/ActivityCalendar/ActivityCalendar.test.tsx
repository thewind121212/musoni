import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityGrid } from './ActivityGrid'
import { ActivityWeek } from './ActivityWeek'
import { t } from '@/test/i18n'

// A Friday, so the current week has days still to come.
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 2, 9, 0))
})
afterEach(() => vi.useRealTimers())

const minutesByDay = { '2026-10-02': 12, '2026-09-30': 3 }

describe('ActivityWeek', () => {
  it('renders seven days with no practice at all', () => {
    const { container } = render(<ActivityWeek minutesByDay={{}} lang="en" t={t} />)
    expect(container.querySelectorAll('[title]')).toHaveLength(7)
    expect(screen.getAllByTitle(/rest day/)).toHaveLength(7)
  })

  it('ends on today and rings it', () => {
    const { container } = render(<ActivityWeek minutesByDay={minutesByDay} lang="en" t={t} />)
    const days = container.querySelectorAll('[title]')
    expect(days[6]).toHaveAttribute('title', 'Oct 2: 12 min')
    expect(days[6]).toHaveClass('ring-2')
    expect(days[5]).not.toHaveClass('ring-2')
  })

  it('titles each day with its own minutes', () => {
    render(<ActivityWeek minutesByDay={minutesByDay} lang="en" t={t} />)
    expect(screen.getByTitle('Sep 30: 3 min')).toBeInTheDocument()
    expect(screen.getByTitle('Oct 1: rest day')).toBeInTheDocument()
  })
})

describe('ActivityGrid', () => {
  it('renders 20 weeks of days plus the legend with no practice at all', () => {
    const { container } = render(<ActivityGrid minutesByDay={{}} lang="en" t={t} />)
    expect(container.querySelectorAll('[title]')).toHaveLength(140)
    expect(screen.getByText('Less')).toBeInTheDocument()
  })

  it('leaves the rest of this week empty rather than shading the future', () => {
    render(<ActivityGrid minutesByDay={minutesByDay} lang="en" t={t} />)
    expect(screen.getByTitle('Oct 3: rest day')).toHaveClass('bg-transparent')
    expect(screen.getByTitle('Oct 2: 12 min')).not.toHaveClass('bg-transparent')
    expect(screen.getByTitle('Oct 1: rest day')).not.toHaveClass('bg-transparent')
  })

  it('labels the first column and every column that opens a month, never the last', () => {
    const { container } = render(<ActivityGrid minutesByDay={{}} lang="en" t={t} />)
    const labels = [...container.firstElementChild!.firstElementChild!.children].map(c => c.textContent)
    expect(labels).toHaveLength(20)
    expect(labels.filter(Boolean)).toEqual(['May', 'Jun', 'Jul', 'Aug', 'Sep'])
    expect(labels[0]).toBe('May')
  })

  it('leaves the last column unlabelled even when it opens a month, so the label has room', () => {
    vi.setSystemTime(new Date(2026, 10, 2, 9, 0)) // this week starts Sunday 1 November
    const { container } = render(<ActivityGrid minutesByDay={{}} lang="en" t={t} />)
    const labels = [...container.firstElementChild!.firstElementChild!.children].map(c => c.textContent)
    expect(labels[19]).toBe('')
    expect(labels).not.toContain('Nov')
  })
})
