import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LessonFrame } from './LessonFrame'

describe('LessonFrame', () => {
  it('frames a step with its progress, a close button and an optional footer', async () => {
    const onClose = vi.fn()
    const { rerender } = render(
      <LessonFrame closeLabel="Close" onClose={onClose} total={5} filled={2} progressLabel="Step 2 of 5" footer={<button>Next</button>}>
        <p>step</p>
      </LessonFrame>,
    )
    expect(screen.getByRole('progressbar', { name: 'Step 2 of 5' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledOnce()
    rerender(<LessonFrame closeLabel="Close" onClose={onClose} total={5} filled={5} progressLabel="done"><p>end</p></LessonFrame>)
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull()
  })
})
