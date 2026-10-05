import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { t } from '@/test/i18n'
import { allMeasures } from '../../../generator'
import { judgeTaps } from '../../../judge'
import { RHYTHM_MISSES_SHOWN } from '@/config/constants'

vi.mock('@/core/components/organisms', () => ({ NoteStaff: () => <div data-testid="staff" /> }))
const { MissedMeasures } = await import('./MissedMeasures')

const measure = allMeasures(1)[0]
const miss = { measure, judgement: judgeTaps(measure.onsets.map(o => o * 62.5), [], 100, 3000), tickMs: 62.5 }

describe('MissedMeasures', () => {
  it('renders nothing without misses', () => {
    const { container } = render(<MissedMeasures misses={[]} t={t} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('shows a few missed measures and counts them all', () => {
    const misses = Array.from({ length: RHYTHM_MISSES_SHOWN + 2 }, () => miss)
    render(<MissedMeasures misses={misses} t={t} />)
    expect(screen.getAllByTestId('rhythm-staff')).toHaveLength(RHYTHM_MISSES_SHOWN)
    expect(screen.getByText(`${RHYTHM_MISSES_SHOWN + 2} measures`)).toBeInTheDocument()
  })
})
