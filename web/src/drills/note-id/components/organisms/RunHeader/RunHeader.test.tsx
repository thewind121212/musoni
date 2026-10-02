import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RunHeader } from './RunHeader'
import { t } from '@/test/i18n'

const base = { secondsLeft: 60, urgent: false, correct: 0, wrong: 0, onQuit: () => {}, t }

describe('RunHeader', () => {
  it('renders at the start of a sprint', () => {
    render(<RunHeader {...base} />)
    expect(screen.getByText('60')).toBeInTheDocument()
    expect(screen.getByText('0 correct')).toBeInTheDocument()
    expect(screen.getByText('0 wrong')).toBeInTheDocument()
  })

  it('counts right and wrong separately', () => {
    render(<RunHeader {...base} correct={5} wrong={2} />)
    expect(screen.getByTestId('run-correct')).toHaveTextContent('5 correct')
    expect(screen.getByTestId('run-wrong')).toHaveTextContent('2 wrong')
  })

  it('turns the timer red when urgent', () => {
    const { rerender } = render(<RunHeader {...base} secondsLeft={11} />)
    expect(screen.getByText('11')).not.toHaveClass('text-wrong')
    rerender(<RunHeader {...base} secondsLeft={10} urgent />)
    expect(screen.getByText('10')).toHaveClass('text-wrong')
  })

  it('quits from the close button', async () => {
    const onQuit = vi.fn()
    render(<RunHeader {...base} onQuit={onQuit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Quit this session' }))
    expect(onQuit).toHaveBeenCalledOnce()
  })
})
