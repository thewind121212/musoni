import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChordStage } from './ChordStage'
import type { Pitch } from '@/core/music/types'

const am: Pitch[] = [
  { letter: 'C', accidental: '', octave: 4 },
  { letter: 'E', accidental: '', octave: 4 },
  { letter: 'A', accidental: '', octave: 4 },
]

describe('ChordStage', () => {
  it('asks the question over the chord on a staff', () => {
    render(<ChordStage prompt="Which chord?" notes={am} answered={false} />)
    expect(screen.getByRole('heading', { name: 'Which chord?' })).toBeInTheDocument()
    expect(screen.getByTestId('note-staff').querySelector('svg')).not.toBeNull()
  })

  it('names the key over the question when there is one', () => {
    const { rerender } = render(<ChordStage prompt="Which numeral?" notes={am} answered={false} />)
    expect(screen.queryByText('A minor')).toBeNull()
    rerender(<ChordStage prompt="Which numeral?" keyLine="A minor" keySignature="Am" notes={am} answered={false} />)
    expect(screen.getByText('A minor')).toBeInTheDocument()
  })
})
