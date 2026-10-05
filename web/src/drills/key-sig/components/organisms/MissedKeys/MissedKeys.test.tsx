import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { t } from '@/test/i18n'

// VexFlow drawing is covered by NoteStaff's own tests.
vi.mock('../SignatureStaff', () => ({ SignatureStaff: () => <div data-testid="staff" /> }))
const { MissedKeys } = await import('./MissedKeys')
const { groupMissedKeys } = await import('./groupMissedKeys')

const miss = (fifths: number, keyName: string, chosen: string) => ({ fifths, clef: 'treble' as const, keyName, chosen })

describe('MissedKeys', () => {
  it('renders nothing for a clean session', () => {
    const { container } = render(<MissedKeys misses={[]} t={t} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('shows each missed key on a staff with what was picked, a repeat counted', () => {
    render(<MissedKeys misses={[miss(3, 'A major', 'D'), miss(-2, 'Bb major', 'F'), miss(3, 'A major', 'D')]} t={t} />)
    expect(screen.getAllByTestId('staff')).toHaveLength(2)
    expect(screen.getByText('A major')).toBeInTheDocument()
    expect(screen.getByText('you picked D ×2')).toBeInTheDocument()
  })

  it('groups the same key read the same wrong way, most repeated first', () => {
    const groups = groupMissedKeys([miss(1, 'G major', 'C'), miss(3, 'A major', 'D'), miss(3, 'A major', 'D'), miss(3, 'A major', 'E')])
    expect(groups.map(g => [g.keyName, g.chosen, g.count])).toEqual([
      ['A major', 'D', 2], ['G major', 'C', 1], ['A major', 'E', 1],
    ])
  })
})
