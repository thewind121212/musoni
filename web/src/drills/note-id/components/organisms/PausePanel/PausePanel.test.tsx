import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PausePanel } from './PausePanel'
import { t } from '@/test/i18n'

const base = {
  reason: 'menu' as const, secondsLeft: 18, timeLeft: '18 sec', played: '12 sec',
  correct: 12, wrong: 2, onResume: () => {}, onEnd: () => {}, t,
}

describe('PausePanel', () => {
  it('renders the pause sheet', () => {
    render(<PausePanel {...base} />)
    expect(screen.getByRole('dialog', { name: 'Paused' })).toBeInTheDocument()
  })

  it('says what ending now keeps', () => {
    render(<PausePanel {...base} played="2 min 5 sec" />)
    expect(screen.getByText(/2 min 5 sec you played/)).toBeInTheDocument()
  })

  it('welcomes the reader back after leaving, with the seconds left', () => {
    render(<PausePanel {...base} reason="away" secondsLeft={41} correct={3} wrong={1} />)
    expect(screen.getByRole('dialog', { name: 'Welcome back' })).toHaveTextContent('41')
    expect(screen.getByText(/3 correct · 1 wrong/)).toBeInTheDocument()
  })

  it('focuses resume, so Enter carries on', () => {
    render(<PausePanel {...base} />)
    expect(screen.getByRole('button', { name: 'Keep practising' })).toHaveFocus()
  })

  it.each(['menu', 'away'] as const)('resumes and ends from the %s panel', async reason => {
    const onResume = vi.fn()
    const onEnd = vi.fn()
    render(<PausePanel {...base} reason={reason} onResume={onResume} onEnd={onEnd} />)
    await userEvent.click(screen.getByRole('button', { name: 'Keep practising' }))
    await userEvent.click(screen.getByRole('button', { name: 'End session' }))
    expect(onResume).toHaveBeenCalledOnce()
    expect(onEnd).toHaveBeenCalledOnce()
  })
})
