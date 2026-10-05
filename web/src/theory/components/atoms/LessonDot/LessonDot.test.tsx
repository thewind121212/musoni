import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LessonDot } from './LessonDot'

describe('LessonDot', () => {
  it('shows the number until the lesson is done, then a tick', () => {
    const { container, rerender } = render(<LessonDot state="todo" mark="3" />)
    expect(screen.getByText('3')).toBeInTheDocument()
    rerender(<LessonDot state="done" mark="3" label="Done" />)
    expect(screen.queryByText('3')).toBeNull()
    expect(screen.getByText('Done')).toHaveClass('sr-only')
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
