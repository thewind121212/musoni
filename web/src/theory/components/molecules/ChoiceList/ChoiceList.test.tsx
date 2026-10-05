import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChoiceList } from './ChoiceList'

describe('ChoiceList', () => {
  it('reports the pick with its index', async () => {
    const onChoose = vi.fn()
    render(<ChoiceList options={['Line 1', 'Space 1']} correctIndex={0} chosen={null} onChoose={onChoose} />)
    await userEvent.click(screen.getByRole('button', { name: 'Space 1' }))
    expect(onChoose).toHaveBeenCalledWith(1)
  })

  it('locks once answered and marks the pick and the right answer', () => {
    render(<ChoiceList options={['Line 1', 'Space 1', 'Line 2']} correctIndex={0} chosen={1} onChoose={() => {}} />)
    const [right, picked, other] = screen.getAllByRole('button')
    expect(picked).toBeDisabled()
    expect(picked).toHaveAttribute('aria-pressed', 'true')
    expect(right).toHaveClass('border-correct')
    expect(picked).toHaveClass('border-wrong')
    expect(other).not.toHaveClass('border-wrong')
  })
})
