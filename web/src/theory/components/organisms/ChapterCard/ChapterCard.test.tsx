import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChapterCard } from './ChapterCard'

describe('ChapterCard', () => {
  it('shows its lessons only while open and toggles on tap', async () => {
    const onToggle = vi.fn()
    const { rerender } = render(
      <ChapterCard number={1} title="Pitch and the staff" detail="1/5 lessons" current open={false} onToggle={onToggle}>
        <p>lesson rows</p>
      </ChapterCard>,
    )
    const header = screen.getByRole('button', { name: /Pitch and the staff/ })
    expect(header).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('lesson rows')).toBeNull()
    await userEvent.click(header)
    expect(onToggle).toHaveBeenCalledOnce()
    rerender(
      <ChapterCard number={1} title="Pitch and the staff" detail="1/5 lessons" current open onToggle={onToggle}>
        <p>lesson rows</p>
      </ChapterCard>,
    )
    expect(screen.getByText('lesson rows')).toBeInTheDocument()
  })
})
