import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StartOption } from './StartOption'

describe('StartOption', () => {
  it('says what it starts and reports the choice', async () => {
    const onChoose = vi.fn()
    render(<StartOption icon={<svg />} title="Chưa, tôi mới bắt đầu" detail="Học bài đầu tiên: 3 phút" onChoose={onChoose} />)
    await userEvent.click(screen.getByRole('button', { name: /Chưa, tôi mới bắt đầu/ }))
    expect(onChoose).toHaveBeenCalled()
  })
})
