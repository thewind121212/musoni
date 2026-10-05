import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { t } from '@/test/i18n'
import { MissedChords } from './MissedChords'
import { groupMissedChords, type MissedChord } from './groupMissedChords'

const notes = [
  { letter: 'C', accidental: '', octave: 4 },
  { letter: 'E', accidental: '', octave: 4 },
  { letter: 'A', accidental: '', octave: 4 },
] as const
const miss = (chosen: string, keySignature: string | null = null): MissedChord =>
  ({ notes: [...notes], keySignature, answer: 'Am/C', chosen })

describe('MissedChords', () => {
  it('shows nothing without misses', () => {
    const { container } = render(<MissedChords misses={[]} title="Chords to review" t={t} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('counts the same chord missed the same way once, most repeated first', () => {
    const groups = groupMissedChords([miss('C major'), miss('A major'), miss('A major'), miss('A major', 'G')])
    expect(groups.map(g => [g.chosen, g.count, g.keySignature])).toEqual([
      ['A major', 2, null], ['C major', 1, null], ['A major', 1, 'G'],
    ])
  })

  it('lists each missed chord with its symbol and the pick', () => {
    render(<MissedChords misses={[miss('C major'), miss('C major')]} title="Chords to review" t={t} />)
    expect(screen.getByRole('heading', { name: 'Chords to review' })).toBeInTheDocument()
    expect(screen.getByText('2 misses')).toBeInTheDocument()
    expect(screen.getByText('Am/C')).toBeInTheDocument()
    expect(screen.getByText('you picked C major ×2')).toBeInTheDocument()
  })
})
