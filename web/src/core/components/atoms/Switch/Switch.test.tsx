import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from './Switch'

describe('Switch', () => {
  it('renders its state', () => {
    render(<Switch checked label="Sound" onChange={() => {}} />)
    expect(screen.getByRole('switch', { name: 'Sound' })).toHaveAttribute('aria-checked', 'true')
  })

  it('reports the flipped value', async () => {
    const onChange = vi.fn()
    render(<Switch checked={false} label="Sound" onChange={onChange} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('ignores presses when disabled', async () => {
    const onChange = vi.fn()
    render(<Switch checked={false} disabled label="Sound" onChange={onChange} />)
    expect(screen.getByRole('switch')).toBeDisabled()
    await userEvent.click(screen.getByRole('switch'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
