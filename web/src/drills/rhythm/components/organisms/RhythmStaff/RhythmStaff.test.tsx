import { describe, it, expect, vi } from 'vitest'
import { useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import type { NoteStaffProps } from '@/core/components/organisms'
import { t } from '@/test/i18n'
import { allMeasures } from '../../../generator'
import { judgeTaps } from '../../../judge'
import { placeAt } from './place'

// The staff reports evenly spaced notes, so marks can be checked by position.
vi.mock('@/core/components/organisms', () => ({
  NoteStaff: ({ events, onLayout, tone }: NoteStaffProps) => {
    const n = events.filter(e => e.kind !== 'bar').length
    useEffect(() => {
      onLayout?.({ xs: Array.from({ length: n }, (_, i) => 0.2 + (0.7 * i) / n), start: 0.15, end: 0.95 })
    }, [n, onLayout])
    return <div data-testid="staff" data-tone={tone} />
  },
}))

const { RhythmStaff } = await import('./RhythmStaff')

// q q~ q q (L3): the tied-over third note has no mark.
const tied = allMeasures(3).find(m => m.notation === 'B4:q B4:q~ B4:q B4:q')!
const left = (el: Element) => parseFloat((el.parentElement as HTMLElement).style.left)

describe('RhythmStaff', () => {
  it('renders the measure with no marks before it is judged', () => {
    render(<RhythmStaff measure={tied} judgement={null} tickMs={62.5} t={t} />)
    expect(screen.getByTestId('staff')).toBeInTheDocument()
    expect(screen.queryAllByRole('img')).toHaveLength(0)
  })

  it('marks each note to tap over its own note, skipping the one a tie holds', () => {
    const j = judgeTaps([0, 750, 2250], [0, 900, 3000], 100, 3000)
    render(<RhythmStaff measure={tied} judgement={j} tickMs={62.5} t={t} />)
    const marks = screen.getAllByRole('img')
    expect(marks.map(m => m.getAttribute('data-mark'))).toEqual(['on', 'late', 'missed'])
    // Notes 1, 2 and 4 of the four drawn (0.2, 0.375, 0.725).
    expect(marks.map(m => Math.round(left(m) * 10) / 10)).toEqual([20, 37.5, 72.5])
  })

  it('places an extra tap between the notes around it, and turns a right measure green', () => {
    const j = judgeTaps([0, 750, 2250], [0, 750, 1900, 2250], 100, 3000)
    const { rerender } = render(<RhythmStaff measure={tied} judgement={j} tickMs={62.5} t={t} />)
    const extra = screen.getByRole('img', { name: 'extra tap' })
    // 1900 ms = tick 30.4, between the third note (tick 24) and the fourth (tick 36).
    expect(left(extra)).toBeGreaterThan(55)
    expect(left(extra)).toBeLessThan(72.5)
    expect(screen.getByTestId('staff')).toHaveAttribute('data-tone', 'neutral')
    rerender(<RhythmStaff measure={tied} judgement={judgeTaps([0, 750, 2250], [0, 750, 2250], 100, 3000)} tickMs={62.5} t={t} />)
    expect(screen.getByTestId('staff')).toHaveAttribute('data-tone', 'correct')
  })

  it('draws the marks small when the notes sit too close for full-size ones', () => {
    const j = judgeTaps([0, 750, 2250], [0, 750, 2250], 100, 3000)
    const width = vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(400)
    const { unmount } = render(<RhythmStaff measure={tied} judgement={j} tickMs={62.5} t={t} />)
    expect(screen.getAllByRole('img')[0].className).not.toContain('size-3.5')
    unmount()
    // A phone-narrow staff: the first two notes' marks would be 17.5 px apart.
    width.mockReturnValue(100)
    render(<RhythmStaff measure={tied} judgement={j} tickMs={62.5} t={t} />)
    expect(screen.getAllByRole('img')[0].className).toContain('size-3.5')
    width.mockRestore()
  })
})

describe('placeAt', () => {
  it('interpolates between the events and the bar end, clamping outside', () => {
    expect(placeAt(6, [0, 12], [0.2, 0.4], 24, 0.9)).toBeCloseTo(0.3)
    expect(placeAt(18, [0, 12], [0.2, 0.4], 24, 0.9)).toBeCloseTo(0.65)
    expect(placeAt(-3, [0, 12], [0.2, 0.4], 24, 0.9)).toBe(0.2)
    expect(placeAt(30, [0, 12], [0.2, 0.4], 24, 0.9)).toBe(0.9)
  })
})
