import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { groupMisses, type MissedNote } from './groupMisses'
import { t } from '@/test/i18n'

// VexFlow drawing is covered by Staff's own tests.
vi.mock('@/core/components/organisms/Staff', () => ({ Staff: () => <div data-testid="staff" /> }))
const { MissedNotes } = await import('./MissedNotes')

const miss = (letter: 'C' | 'G', chosen: string): MissedNote => ({
  clef: 'treble', pitch: { letter, accidental: '', octave: 5 }, answer: letter, chosen,
})

describe('MissedNotes', () => {
  it('renders nothing for a clean session', () => {
    const { container } = render(<MissedNotes misses={[]} t={t} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('shows each missed note on a staff with what was picked', () => {
    render(<MissedNotes misses={[miss('G', 'A'), miss('C', 'B')]} t={t} />)
    expect(screen.getAllByTestId('staff')).toHaveLength(2)
    expect(screen.getByText('you picked A')).toBeInTheDocument()
  })

  it('counts a repeated mistake once, most repeated first', () => {
    const groups = groupMisses([miss('C', 'B'), miss('G', 'A'), miss('G', 'A'), miss('G', 'F')])
    expect(groups.map(g => [g.answer, g.chosen, g.count])).toEqual([
      ['G', 'A', 2], ['C', 'B', 1], ['G', 'F', 1],
    ])
  })
})
