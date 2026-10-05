import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { TapPad } from './TapPad'

describe('TapPad', () => {
  it('renders its label and hint', () => {
    render(<TapPad label="Tap" hint="or Space" onTap={() => {}} />)
    expect(screen.getByRole('button', { name: /Tap/ })).toHaveTextContent('or Space')
  })

  it('taps on the press with the event time, not on release', () => {
    const onTap = vi.fn()
    render(<TapPad label="Tap" onTap={onTap} />)
    const pad = screen.getByRole('button')
    fireEvent.pointerDown(pad, { pointerType: 'touch', button: 0 })
    expect(onTap).toHaveBeenCalledTimes(1)
    expect(typeof onTap.mock.calls[0][0]).toBe('number')
    fireEvent.pointerUp(pad)
    fireEvent.click(pad)
    expect(onTap).toHaveBeenCalledTimes(1)
  })

  it("ignores a mouse's other buttons", () => {
    const onTap = vi.fn()
    render(<TapPad label="Tap" onTap={onTap} />)
    fireEvent.pointerDown(screen.getByRole('button'), { pointerType: 'mouse', button: 2 })
    expect(onTap).not.toHaveBeenCalled()
  })
})
