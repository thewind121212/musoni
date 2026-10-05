import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MoreDrills } from './MoreDrills'

describe('MoreDrills', () => {
  it('counts what is still to open and offers to show it', async () => {
    const onToggle = vi.fn()
    render(<MoreDrills text="3 bài luyện nữa mở dần." actionLabel="Xem tất cả" expanded={false} onToggle={onToggle} />)
    expect(screen.getByText(/3 bài luyện nữa/)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Xem tất cả' }))
    expect(onToggle).toHaveBeenCalled()
  })
})
