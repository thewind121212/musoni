import { afterEach, describe, it, expect } from 'vitest'
import { StatStrip } from './StatStrip'
import { render, type Rendered } from '../../test/render'

let view: Rendered | null = null
afterEach(() => { view?.unmount(); view = null })

const stats = [
  { icon: <svg data-icon="level" />, label: 'Cấp độ', value: 'Khóa Sol' },
  { icon: <svg data-icon="length" />, label: 'Thời lượng', value: '1 phút' },
  { icon: <svg data-icon="best" />, label: 'Cao nhất', value: 'Chưa có' },
]

describe('StatStrip', () => {
  it('shows every label with its value and icon', () => {
    view = render(<StatStrip stats={stats} />)
    const text = view.container.textContent
    for (const s of stats) {
      expect(text).toContain(s.label)
      expect(text).toContain(s.value)
    }
    expect(view.container.querySelectorAll('svg[data-icon]')).toHaveLength(3)
  })

  it('splits the width into equal shrinkable columns, one per stat', () => {
    // Regression: three chips that would not shrink ran past the card on a
    // 375px phone. minmax(0, 1fr) is what lets a column narrower than its text.
    view = render(<StatStrip stats={stats} />)
    const grid = view.container.firstElementChild as HTMLElement
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))')
    expect(grid.children).toHaveLength(3)
    view.rerender(<StatStrip stats={stats.slice(0, 2)} />)
    expect(grid.style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))')
  })

  it('never truncates labels or values, so nothing is cut off on a narrow phone', () => {
    view = render(<StatStrip stats={stats} />)
    expect(view.container.querySelector('.truncate')).toBeNull()
  })
})
