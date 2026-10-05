import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IntervalStaff } from './IntervalStaff'
import type { Pitch } from '@/core/music/types'

const p = (letter: Pitch['letter'], octave: number, accidental: Pitch['accidental'] = ''): Pitch => ({ letter, accidental, octave })
const viewBox = () => screen.getByTestId('note-staff').querySelector('svg')!.getAttribute('viewBox')

describe('IntervalStaff', () => {
  it('draws the two notes on a staff', () => {
    render(<IntervalStaff question={{ clef: 'treble', lower: p('E', 4), upper: p('C', 5), layout: 'melodic' }} tone="neutral" />)
    expect(screen.getByTestId('note-staff').querySelector('svg')).toBeInTheDocument()
  })

  it('keeps one box from question to question, whatever the notes reach', () => {
    const { rerender } = render(
      <IntervalStaff question={{ clef: 'treble', lower: p('G', 4), upper: p('B', 4), layout: 'melodic' }} tone="neutral" />,
    )
    const first = viewBox()
    rerender(<IntervalStaff question={{ clef: 'treble', lower: p('C', 4, '#'), upper: p('A', 5, 'b'), layout: 'harmonic' }} tone="correct" />)
    expect(viewBox()).toBe(first)
  })
})
