import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MissedIntervals } from './MissedIntervals'
import type { MissedInterval } from './groupMissedIntervals'
import { t } from '@/test/i18n'
import type { Pitch } from '@/core/music/types'

const p = (letter: Pitch['letter'], octave: number): Pitch => ({ letter, accidental: '', octave })
const m6: MissedInterval = {
  question: { clef: 'treble', lower: p('E', 4), upper: p('C', 5), interval: { size: 6, quality: 'm' }, layout: 'melodic' },
  chosen: { row: 'MP', size: 6 },
}
const p5: MissedInterval = {
  question: { clef: 'bass', lower: p('C', 3), upper: p('G', 3), interval: { size: 5, quality: 'P' }, layout: 'harmonic' },
  chosen: { row: 'MP', size: 4 },
}

describe('MissedIntervals', () => {
  it('renders nothing without misses', () => {
    const { container } = render(<MissedIntervals misses={[]} rows={['m', 'MP']} t={t} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('lists each miss once with how often, most repeated first, in the grid’s labels', () => {
    render(<MissedIntervals misses={[p5, m6, m6]} rows={['m', 'MP']} t={t} />)
    const tiles = screen.getAllByRole('listitem')
    expect(tiles).toHaveLength(2)
    expect(tiles[0]).toHaveTextContent('m6')
    expect(tiles[0]).toHaveTextContent('you picked M6 ×2')
    expect(tiles[1]).toHaveTextContent('P5')
    expect(screen.getByText('3 misses')).toBeInTheDocument()
  })

  it('labels a level 1 miss by size only', () => {
    render(<MissedIntervals misses={[{ ...m6, chosen: { row: 'size', size: 5 } }]} rows={['size']} t={t} />)
    expect(screen.getByRole('listitem')).toHaveTextContent('6you picked 5')
  })
})
