import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatStrip } from './StatStrip'

const stats = [
  { icon: <svg data-testid="icon" />, label: 'Cấp độ', value: 'Khóa Sol' },
  { icon: <svg data-testid="icon" />, label: 'Thời lượng', value: '1 phút' },
  { icon: <svg data-testid="icon" />, label: 'Cao nhất', value: 'Chưa có' },
]

describe('StatStrip', () => {
  it('shows every label with its value and icon', () => {
    render(<StatStrip stats={stats} />)
    for (const s of stats) {
      expect(screen.getByText(s.label)).toBeInTheDocument()
      expect(screen.getByText(s.value)).toBeInTheDocument()
    }
    expect(screen.getAllByTestId('icon')).toHaveLength(3)
  })

  it('splits the width into equal shrinkable columns, one per stat', () => {
    // Regression: three chips that would not shrink ran past the card on a
    // 375px phone. minmax(0, 1fr) is what lets a column narrower than its text.
    const { container, rerender } = render(<StatStrip stats={stats} />)
    const grid = container.firstElementChild as HTMLElement
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))')
    expect(grid.children).toHaveLength(3)
    rerender(<StatStrip stats={stats.slice(0, 2)} />)
    expect(grid.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))')
  })

  it('never truncates labels or values, so nothing is cut off on a narrow phone', () => {
    const { container } = render(<StatStrip stats={stats} />)
    expect(container.querySelector('.truncate')).toBeNull()
  })
})
