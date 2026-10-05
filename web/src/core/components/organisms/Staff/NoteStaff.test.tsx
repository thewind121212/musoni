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

  it('draws a key signature with no notes on a single, bass, grand or bare staff', () => {
    for (const clef of ['treble', 'bass', 'grand', 'none'] as const) {
      for (const [key, count] of [['C#', 7], ['Cb', 7], ['Bb', 2], ['C', 0]] as const) {
        const { unmount } = render(<NoteStaff clef={clef} events={[]} keySignature={key} />)
        const staves = screen.getByTestId('note-staff').querySelectorAll('.vf-keysignature')
        // Every staff carries the whole signature: a grand staff has it twice.
        expect(staves, `${key} on ${clef}`).toHaveLength(clef === 'grand' ? 2 : 1)
        staves.forEach(s => expect(s.children, `${key} on ${clef}`).toHaveLength(count))
        unmount()
      }
    }
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
