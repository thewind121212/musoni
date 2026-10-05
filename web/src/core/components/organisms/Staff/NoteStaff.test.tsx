import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NoteStaff } from './NoteStaff'
import { parseNotation } from '@/core/music/notation'

const notes = (src: string) => parseNotation(src)

describe('NoteStaff', () => {
  it('renders a note on a treble staff with the default props', () => {
    render(<NoteStaff clef="treble" events={notes('G4')} />)
    const svg = screen.getByTestId('note-staff').querySelector('svg')!
    expect(svg).toBeInTheDocument()
    expect(svg.getAttribute('viewBox')).toMatch(/^0 /)
  })

  it('draws every clef, a bare staff and a grand staff without throwing', () => {
    for (const clef of ['bass', 'alto', 'tenor', 'none', 'grand'] as const) {
      const { unmount } = render(<NoteStaff clef={clef} events={notes('C3 C4 C5')} />)
      expect(screen.getByTestId('note-staff').querySelector('svg')).toBeInTheDocument()
      unmount()
    }
  })

  it('draws rhythm: a key and time signature, rests, dots, ties, a tuplet and bars', () => {
    render(
      <NoteStaff
        clef="treble" keySignature="D" time="3/4"
        events={notes('F#4:q. G4:8 R:q | 3( A4:8 B4:8 C#5:8 ) D5:h~ | D5:q E4+G4:h ||')}
      />,
    )
    expect(screen.getByTestId('note-staff').querySelectorAll('path, rect').length).toBeGreaterThan(10)
  })

  it('beams by the beat: triplets in threes, and 6/8 eighths in threes', () => {
    const beams = () => screen.getByTestId('note-staff').querySelectorAll('.vf-beam').length
    const { unmount } = render(<NoteStaff clef="percussion" time="4/4" events={notes('3( B4:8 B4:8 B4:8 ) 3( B4:8 B4:8 B4:8 ) B4:h')} />)
    expect(beams()).toBe(2)
    unmount()
    render(<NoteStaff clef="percussion" time="6/8" events={notes('B4:8 B4:8 B4:8 B4:8 B4:8 B4:8')} />)
    expect(beams()).toBe(2)
  })

  it('reports where each note and rest landed, left to right inside the notes\' space', () => {
    const layouts: { xs: number[]; start: number; end: number }[] = []
    render(<NoteStaff clef="percussion" time="4/4" events={notes('B4:q R:q B4:h')} onLayout={l => layouts.push(l)} />)
    const { xs, start, end } = layouts.at(-1)!
    expect(xs).toHaveLength(3)
    expect(start).toBeLessThan(xs[0])
    expect(xs[0]).toBeLessThan(xs[1])
    expect(xs[1]).toBeLessThan(xs[2])
    expect(xs[2]).toBeLessThan(end)
    expect(end).toBeLessThanOrEqual(1)
  })

  it('prints one label per note or rest, skipping bars and empty labels', () => {
    render(<NoteStaff clef="treble" events={notes('C4 | D4 E4')} labels={['Do', null, 'Mi']} />)
    expect(screen.getByText('Do')).toBeInTheDocument()
    expect(screen.getByText('Mi')).toBeInTheDocument()
    expect(document.querySelectorAll('[data-label]')).toHaveLength(2)
    // Labels sit left to right in the order of the notes.
    const left = (text: string) => parseFloat(screen.getByText(text).style.left)
    expect(left('Do')).toBeLessThan(left('Mi'))
  })

  it('colours highlighted labels with the accent, and every label green once answered', () => {
    const { rerender } = render(<NoteStaff clef="treble" events={notes('C4 D4')} labels={['Do', 'Re']} highlight={[1]} />)
    expect(screen.getByText('Re')).toHaveClass('text-accent')
    expect(screen.getByText('Do')).not.toHaveClass('text-accent')
    rerender(<NoteStaff clef="treble" events={notes('C4 D4')} labels={['Do', 'Re']} tone="correct" />)
    expect(screen.getByText('Do')).toHaveClass('text-correct')
  })

  it('rejects nothing it is given: a wrong pick beside a single note', () => {
    render(<NoteStaff clef="treble" events={notes('E4')} tone="correct" chosen={{ letter: 'F', accidental: '', octave: 4 }} />)
    expect(screen.getByTestId('note-staff').querySelector('svg')).toBeInTheDocument()
  })
})
