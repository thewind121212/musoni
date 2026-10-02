import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders with only children', () => {
    render(<Button>Start</Button>)
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
  })

  it('passes clicks and native props through', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick} type="submit" aria-label="Go">x</Button>)
    const button = screen.getByRole('button', { name: 'Go' })
    expect(button).toHaveAttribute('type', 'submit')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire when disabled', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick} disabled>Start</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('keeps a caller className alongside its own', () => {
    render(<Button className="w-full">Start</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })
})
