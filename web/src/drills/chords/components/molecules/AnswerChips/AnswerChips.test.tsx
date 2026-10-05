import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnswerChips, type AnswerChip } from './AnswerChips'

const chips: AnswerChip[] = [
  { label: 'Major', keyHint: '1' },
  { label: 'Minor', keyHint: '2' },
  { label: 'Dim', keyHint: '3', disabled: true, note: 'not at this level' },
]

describe('AnswerChips', () => {
  it('renders a chip per answer', () => {
    render(<AnswerChips chips={chips} label="Quality" feedback={null} onPick={() => {}} />)
    expect(screen.getByRole('group', { name: 'Quality' })).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('picks by index, and never picks a chip the level does not ask', async () => {
    const onPick = vi.fn()
    render(<AnswerChips chips={chips} label="Quality" feedback={null} onPick={onPick} />)
    await userEvent.click(screen.getByRole('button', { name: /Minor/ }))
    expect(onPick).toHaveBeenCalledWith(1)
    const dim = screen.getByRole('button', { name: /Dim, not at this level/ })
    expect(dim).toBeDisabled()
  })

  it('marks a pick waiting for the root as pressed', () => {
    render(<AnswerChips chips={chips} label="Quality" selected={0} feedback={null} onPick={() => {}} />)
    expect(screen.getByRole('button', { name: /Major/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /Minor/ })).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows the right chip and the wrong pick once answered, and locks the row', () => {
    render(<AnswerChips chips={chips} label="Quality" selected={0} feedback={{ correctIndex: 1, chosenIndex: 0 }} onPick={() => {}} />)
    const [major, minor] = screen.getAllByRole('button')
    expect(minor).toHaveClass('bg-correct')
    expect(major).toHaveClass('bg-wrong')
    expect(major).not.toHaveAttribute('aria-pressed')
    expect(screen.getAllByRole('button').every(b => (b as HTMLButtonElement).disabled)).toBe(true)
  })
})
