import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SegmentedControl } from './SegmentedControl'

const segments = [
  { value: 30, label: '30s' },
  { value: 60, label: '1 min', hint: 'daily' },
  { value: 120, label: '2 min' },
]

describe('SegmentedControl', () => {
  it('renders a named radiogroup with one radio per segment', () => {
    render(<SegmentedControl label="Length" segments={segments} value={60} onChange={() => {}} />)
    expect(screen.getByRole('radiogroup', { name: 'Length' })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(3)
  })

  it('checks the current value and reports the tapped one', async () => {
    const onChange = vi.fn()
    render(<SegmentedControl label="Length" segments={segments} value={60} onChange={onChange} />)
    expect(screen.getByRole('radio', { name: /1 min/ })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: '30s' })).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(screen.getByRole('radio', { name: '2 min' }))
    expect(onChange).toHaveBeenCalledWith(120)
  })

  it('lays out one column per segment unless told otherwise', () => {
    const { rerender } = render(
      <SegmentedControl label="L" segments={segments} value={30} onChange={() => {}} />,
    )
    expect(screen.getByRole('radiogroup').style.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))')
    rerender(<SegmentedControl label="L" segments={segments} value={30} onChange={() => {}} columns={2} />)
    expect(screen.getByRole('radiogroup').style.gridTemplateColumns).toBe('repeat(2, minmax(0, 1fr))')
  })
})
