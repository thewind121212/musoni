import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TodayCard } from './TodayCard'

const pick = { title: 'Đọc nốt nhạc · 1 phút', reason: 'Bắt đầu nhẹ.', actionLabel: 'Bắt đầu', to: '/train/note-id' }

describe('TodayCard', () => {
  it('names the pick, says why, and starts it from one button', () => {
    render(<MemoryRouter><TodayCard todayMinutes={0} dailyGoal={5} unit="phút" eyebrow="Hôm nay" streak={null} pick={pick} /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: pick.title })).toBeInTheDocument()
    expect(screen.getByText(pick.reason)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Bắt đầu' })).toHaveAttribute('href', '/train/note-id')
  })

  it('holds the place of the pick while it loads, with the goal already shown', () => {
    render(<MemoryRouter><TodayCard todayMinutes={3} dailyGoal={5} unit="phút" eyebrow="Hôm nay" streak="2 ngày" pick={null} loading /></MemoryRouter>)
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('2 ngày')).toBeInTheDocument()
  })
})
