import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PausePanel } from './PausePanel'
import { t } from '@/test/i18n'

const base = {
  open: true, reason: 'menu' as const, timeLeft: '9:40', played: '20 sec',
  correct: 12, wrong: 2, onResume: () => {}, onEnd: () => {}, t,
}

describe('PausePanel', () => {
  it('renders the pause sheet', () => {
    render(<PausePanel {...base} />)
    expect(screen.getByRole('dialog', { name: 'Paused' })).toHaveTextContent('9:40')
  })

  it('renders nothing while the sprint runs', () => {
    render(<PausePanel {...base} open={false} />)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('says what ending now keeps', () => {
    render(<PausePanel {...base} played="2 min 5 sec" />)
    expect(screen.getByText(/2 min 5 sec you played/)).toBeInTheDocument()
  })

  it('welcomes the reader back after leaving', () => {
    render(<PausePanel {...base} reason="away" correct={3} wrong={1} />)
    expect(screen.getByRole('dialog', { name: 'Welcome back' })).toHaveTextContent('9:40')
    expect(screen.getByText(/3 correct · 1 wrong/)).toBeInTheDocument()
  })

  it.each(['menu', 'away'] as const)('resumes and ends from the %s sheet', async reason => {
    const onResume = vi.fn()
    const onEnd = vi.fn()
    render(<PausePanel {...base} reason={reason} onResume={onResume} onEnd={onEnd} />)
    await userEvent.click(screen.getByRole('button', { name: 'Keep practising' }))
    await userEvent.click(screen.getByRole('button', { name: 'End session' }))
    expect(onResume).toHaveBeenCalledOnce()
    expect(onEnd).toHaveBeenCalledOnce()
  })

  it('resumes on Esc, like any other way of closing the sheet', async () => {
    const onResume = vi.fn()
    render(<PausePanel {...base} onResume={onResume} />)
    await userEvent.keyboard('{Escape}')
    expect(onResume).toHaveBeenCalledOnce()
  })
})
