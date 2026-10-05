import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CalibrationPanel } from './CalibrationPanel'
import { t } from '@/test/i18n'

const props = { heard: 0, total: 8, outcome: null, onStart: () => {}, onTap: () => {}, onClose: () => {}, t }

describe('CalibrationPanel', () => {
  it('renders idle with a way to play the clicks', async () => {
    const onStart = vi.fn()
    render(<CalibrationPanel {...props} status="idle" onStart={onStart} />)
    await userEvent.click(screen.getByRole('button', { name: /Play the clicks/ }))
    expect(onStart).toHaveBeenCalled()
  })

  it('says what was saved, or why nothing was', () => {
    const { rerender } = render(<CalibrationPanel {...props} status="done" outcome={{ ok: true, latencyMs: 45 }} />)
    expect(screen.getByRole('status')).toHaveTextContent('Saved: 45 ms')
    rerender(<CalibrationPanel {...props} status="done" outcome={{ ok: false, reason: 'uneven' }} />)
    expect(screen.getByRole('status')).toHaveTextContent('uneven')
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })

  it('lights the clicks heard while running, and none before', () => {
    const { container, rerender } = render(<CalibrationPanel {...props} status="running" heard={3} />)
    expect(container.querySelectorAll('[data-lit]')).toHaveLength(3)
    rerender(<CalibrationPanel {...props} status="idle" heard={3} />)
    expect(container.querySelectorAll('[data-lit]')).toHaveLength(0)
  })
})
