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

  it('stacks a label written with line breaks, and keeps one-line labels as they were', () => {
    const { unmount } = render(<NoteStaff clef="bass" events={notes('E3 F3')} labels={['6\n4', '7']} />)
    const stacked = document.querySelector('[data-label="0"]')!
    expect(stacked.textContent).toBe('6\n4')
    expect(stacked).toHaveClass('whitespace-pre')
    expect((stacked.parentElement as HTMLElement).style.height).toMatch(/calc/)
    unmount()
    render(<NoteStaff clef="bass" events={notes('E3 F3')} labels={['I', 'V']} />)
    expect((screen.getByText('I').parentElement as HTMLElement).style.height).toBe('')
  })

  describe('chords on a grand staff', () => {
    const svg = () => screen.getByTestId('note-staff').querySelector('svg')!
    /** Noteheads per drawn note, top staff (above the gap between staves) or bottom. */
    const heads = () => [...svg().querySelectorAll('.vf-stavenote')].map(n => {
      const ys = [...n.querySelectorAll('.vf-notehead text')].map(t => Number(t.getAttribute('y')))
      return { count: ys.length, top: ys.every(y => y < 120) }
    })
    const bars = (top: boolean) => [...svg().querySelectorAll('.vf-stavebarline rect')]
      .filter(r => Number(r.getAttribute('y')) < 120 === top)
      .map(r => r.getAttribute('x'))

    it('splits a chord at middle C: the low member on the bass staff, the rest on the treble', () => {
      render(<NoteStaff clef="grand" events={notes('C3+E4+G4:q')} />)
      expect(heads()).toEqual(expect.arrayContaining([{ count: 2, top: true }, { count: 1, top: false }]))
      expect(heads()).toHaveLength(2)
      // Both halves at one x: not pushed aside as two voices on one staff would be.
      const xs = new Set([...svg().querySelectorAll('.vf-notehead text')].map(t => t.getAttribute('x')))
      expect(xs.size).toBe(1)
    })

    it('keeps both staves in step, so their bar lines line up', () => {
      render(<NoteStaff clef="grand" events={notes('C3+E4+G4:q C4:q F2+A4:h | G2+B3@t+D4+G4:h C3:h ||')} />)
      expect(bars(true)).toEqual(bars(false))
      expect(bars(true).length).toBeGreaterThan(2)
    })

    it('leaves a chord from middle C up whole on the treble staff, and follows a per-note mark', () => {
      const { unmount } = render(<NoteStaff clef="grand" events={notes('C4+E4+G4')} />)
      expect(heads()).toEqual([{ count: 3, top: true }])
      unmount()
      render(<NoteStaff clef="grand" events={notes('C4@b+E4+G4')} />)
      expect(heads()).toEqual(expect.arrayContaining([{ count: 2, top: true }, { count: 1, top: false }]))
    })

    it('labels each chord once, whatever staves it spans', () => {
      render(<NoteStaff clef="grand" events={notes('C3+E4+G4 | F2+F4+A4+C5')} labels={['I', 'IV']} />)
      expect(document.querySelectorAll('[data-label]')).toHaveLength(2)
    })
  })

  it('keeps one box whatever the notes reach when pinned with room', () => {
    const box = (src: string) => {
      const { unmount } = render(<NoteStaff clef="treble" events={notes(src)} room={30} />)
      const viewBox = screen.getByTestId('note-staff').querySelector('svg')!.getAttribute('viewBox')
      unmount()
      return viewBox
    }
    expect(box('C4+A5')).toBe(box('G4 B4'))
  })

  it('rejects nothing it is given: a wrong pick beside a single note', () => {
    render(<NoteStaff clef="treble" events={notes('E4')} tone="correct" chosen={{ letter: 'F', accidental: '', octave: 4 }} />)
    expect(screen.getByTestId('note-staff').querySelector('svg')).toBeInTheDocument()
  })
})
