import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { OctaveStrip } from './OctaveStrip'

/** Octaves 2-6 on a strip 500px wide from x = 0: each octave is 100px. */
function setup(value = 4) {
  const onChange = vi.fn()
  render(<OctaveStrip min={2} max={6} value={value} onChange={onChange} label="Octave" valueText={`Octave ${value}`} />)
  const slider = screen.getByRole('slider', { name: 'Octave' })
  slider.getBoundingClientRect = () => ({ left: 0, width: 500, top: 0, height: 60, right: 500, bottom: 60, x: 0, y: 0, toJSON: () => ({}) })
  return { slider, onChange }
}

describe('OctaveStrip', () => {
  it('is a slider over its octaves, with the window on the chosen one', () => {
    const { slider } = setup(4)
    expect(slider).toHaveAttribute('aria-valuemin', '2')
    expect(slider).toHaveAttribute('aria-valuemax', '6')
    expect(slider).toHaveAttribute('aria-valuenow', '4')
    expect(slider).toHaveAttribute('aria-valuetext', 'Octave 4')
    const window = screen.getByTestId('octave-window')
    expect(parseFloat(window.style.left)).toBeCloseTo(40)
    expect(parseFloat(window.style.width)).toBeCloseTo(20)
  })

  it('a tap moves to the octave under it', () => {
    const { slider, onChange } = setup(4)
    fireEvent.pointerDown(slider, { clientX: 130, pointerId: 1 })
    expect(onChange).toHaveBeenLastCalledWith(3)
  })

  it('a drag follows the finger and snaps to whole octaves, clamped at the ends', () => {
    const { slider, onChange } = setup(4)
    fireEvent.pointerDown(slider, { clientX: 450, pointerId: 1 })
    expect(onChange).toHaveBeenLastCalledWith(6)
    fireEvent.pointerMove(slider, { clientX: -80, buttons: 1, pointerId: 1 })
    expect(onChange).toHaveBeenLastCalledWith(2)
  })

  it('a hover without a press, or a tap on the chosen octave, changes nothing', () => {
    const { slider, onChange } = setup(4)
    fireEvent.pointerMove(slider, { clientX: 10, buttons: 0 })
    fireEvent.pointerDown(slider, { clientX: 250, pointerId: 1 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('arrows step, Home and End jump, and are marked handled', () => {
    const { slider, onChange } = setup(6)
    fireEvent.keyDown(slider, { key: 'ArrowLeft' })
    expect(onChange).toHaveBeenLastCalledWith(5)
    fireEvent.keyDown(slider, { key: 'Home' })
    expect(onChange).toHaveBeenLastCalledWith(2)
    onChange.mockClear()
    fireEvent.keyDown(slider, { key: 'ArrowRight' })
    expect(onChange).not.toHaveBeenCalled() // already at the top
    expect(fireEvent.keyDown(slider, { key: 'ArrowRight' })).toBe(false) // defaultPrevented
    expect(fireEvent.keyDown(slider, { key: 'e' })).toBe(true)
  })
})
