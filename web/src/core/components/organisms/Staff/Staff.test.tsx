import { describe, it, expect } from 'vitest'
import { Renderer, Stave } from 'vexflow'
import { render } from '@testing-library/react'
import { ClefGlyph, LEDGER_ROOM, Staff } from './Staff'

/**
 * Regression: the clef badges rendered blank because the SVG was sized from the
 * nominal box (44px tall) while VexFlow reserves several line-heights of blank
 * space above a stave and drew the bottom line near y=100. The notation sat
 * entirely outside the visible area.
 *
 * These render with the same geometry the components use and assert the canvas
 * actually contains the stave VexFlow draws.
 */
function staveBottom(canvasHeight: number, staveY: number, staveWidth: number, clef: string) {
  const el = document.createElement('div')
  document.body.appendChild(el)
  const renderer = new Renderer(el, Renderer.Backends.SVG)
  renderer.resize(200, canvasHeight)
  const stave = new Stave(4, staveY, staveWidth)
  stave.addClef(clef)
  stave.setContext(renderer.getContext()).draw()
  return stave.getBottomLineY()
}

describe('notation fits inside its render box', () => {
  it('Staff canvas contains the stave', () => {
    // Staff renders a 260-tall canvas with the stave at y=0.
    expect(staveBottom(260, 0, 300, 'treble')).toBeLessThan(260)
  })

  it('ClefGlyph canvas contains the stave', () => {
    // ClefGlyph renders a 200-tall canvas with the stave at y=0.
    expect(staveBottom(200, 0, 74, 'treble')).toBeLessThan(200)
    expect(staveBottom(200, 0, 74, 'bass')).toBeLessThan(200)
  })

  it('documents the bug: a 44px badge cannot contain a stave', () => {
    expect(staveBottom(44, 10, 26, 'treble')).toBeGreaterThan(44)
  })
})

describe('the staff box stays put as the note moves', () => {
  it('covers the extreme notes of every level without resizing', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const renderer = new Renderer(el, Renderer.Backends.SVG)
    renderer.resize(320, 260)
    const stave = new Stave(8, 0, 304)
    stave.addClef('treble')
    stave.setContext(renderer.getContext()).draw()

    const top = stave.getYForLine(0) - LEDGER_ROOM
    const bottom = stave.getYForLine(4) + LEDGER_ROOM

    // A line/space step is half the 10px line spacing. Level 2 reaches C6 above
    // and A3 below the treble staff, which is 5 steps past each outer line.
    const step = 5
    const highestNoteY = stave.getYForLine(0) - 5 * step
    const lowestNoteY = stave.getYForLine(4) + 5 * step
    const STEM = 35

    expect(highestNoteY - STEM).toBeGreaterThan(top)
    expect(lowestNoteY + STEM).toBeLessThan(bottom)
  })
})

// Geometry is guarded above; these only prove the components mount
// and draw for every input shape a drill can hand them.
describe('Staff renders', () => {
  it('draws a plain note', () => {
    const { container } = render(<Staff clef="treble" pitch={{ letter: 'C', accidental: '', octave: 4 }} />)
    expect(container.querySelector('svg')).not.toBeNull()
  })

  it('draws an accidental in the bass clef with a wrong pick beside it', () => {
    const { container } = render(
      <Staff
        clef="bass" pitch={{ letter: 'F', accidental: '#', octave: 2 }}
        tone="wrong" chosen={{ letter: 'G', accidental: 'b', octave: 2 }}
      />,
    )
    expect(container.querySelector('svg')).not.toBeNull()
  })
})

describe('ClefGlyph renders', () => {
  it.each(['treble', 'bass'] as const)('draws a %s clef', clef => {
    const { container } = render(<ClefGlyph clef={clef} />)
    expect(container.querySelector('svg')).not.toBeNull()
  })
})

describe('a new question only replaces the note', () => {
  it('keeps the stave and clef drawn while the note layer changes', () => {
    const { getByTestId, rerender } = render(
      <Staff clef="treble" pitch={{ letter: 'C', accidental: '', octave: 5 }} />,
    )
    const lines = getByTestId('staff-lines').querySelector('svg')
    const notes = getByTestId('staff-notes')

    rerender(<Staff clef="treble" pitch={{ letter: 'E', accidental: '', octave: 4 }} />)

    expect(getByTestId('staff-lines').querySelector('svg')).toBe(lines)
    expect(getByTestId('staff-notes')).not.toBe(notes)
  })

  it('recolours feedback on the same note without replaying its entrance', () => {
    const pitch = { letter: 'C' as const, accidental: '' as const, octave: 5 }
    const { getByTestId, rerender } = render(<Staff clef="treble" pitch={pitch} />)
    const notes = getByTestId('staff-notes')

    rerender(<Staff clef="treble" pitch={pitch} tone="correct" />)

    expect(getByTestId('staff-notes')).toBe(notes)
  })
})
