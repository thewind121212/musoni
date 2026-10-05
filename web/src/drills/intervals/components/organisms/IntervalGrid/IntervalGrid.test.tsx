import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IntervalGrid } from './IntervalGrid'
import { t } from '@/test/i18n'

describe('IntervalGrid', () => {
  it('renders one row of sizes at level 1, with no row or size heads', () => {
    render(<IntervalGrid rows={['size']} feedback={null} onAnswer={() => {}} label="What size?" t={t} />)
    expect(screen.getAllByRole('button')).toHaveLength(7)
    expect(screen.getByRole('button', { name: 'Octave' })).toBeInTheDocument()
    expect(screen.queryByText('Minor')).toBeNull()
  })

  it('leaves the minor 4th, 5th and octave blank and answers with the cell tapped', async () => {
    const onAnswer = vi.fn()
    render(<IntervalGrid rows={['m', 'MP']} feedback={null} onAnswer={onAnswer} label="What interval?" t={t} />)
    expect(screen.getAllByRole('button')).toHaveLength(11)
    expect(screen.queryByRole('button', { name: 'Minor 5th' })).toBeNull()
    expect(document.querySelectorAll('[data-blank]')).toHaveLength(3)
    await userEvent.click(screen.getByRole('button', { name: 'Minor 6th' }))
    expect(onAnswer).toHaveBeenCalledWith({ row: 'm', size: 6 })
    await userEvent.click(screen.getByRole('button', { name: 'Perfect 5th' }))
    expect(onAnswer).toHaveBeenLastCalledWith({ row: 'MP', size: 5 })
  })

  it('draws every quality row at level 4', () => {
    render(<IntervalGrid rows={['m', 'MP', 'A', 'd']} feedback={null} onAnswer={() => {}} label="What interval?" t={t} />)
    expect(screen.getByRole('button', { name: 'Augmented 4th' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Diminished 7th' })).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(25)
  })

  it('marks the right cell and the pick after a miss, and takes no second answer', () => {
    render(
      <IntervalGrid
        rows={['m', 'MP']}
        feedback={{ chosen: { row: 'MP', size: 6 }, answer: { row: 'm', size: 6 } }}
        onAnswer={() => {}} label="What interval?" t={t}
      />,
    )
    expect(screen.getByRole('button', { name: 'Minor 6th' })).toHaveClass('bg-correct')
    expect(screen.getByRole('button', { name: 'Major 6th' })).toHaveClass('bg-wrong')
    expect(screen.getByRole('button', { name: 'Minor 3rd' })).not.toHaveClass('bg-correct')
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled()
  })
})
