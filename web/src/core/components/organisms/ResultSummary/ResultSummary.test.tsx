import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ResultSummary } from './ResultSummary'
import { enduranceBonus } from '@/core/scoring'
import type { SessionResult } from '@/progress/progressStore'
import { t } from '@/test/i18n'

const result: SessionResult = {
  drill: 'note-id', level: 2, accidentals: false, naming: 'letters', durationSec: 120,
  correct: 26, wrong: 4, accuracy: 0.8666, avgMs: 1449, bestStreak: 11, weight: 1.2,
  practiceScore: 37, at: '2026-10-02T09:00:00',
}

describe('ResultSummary', () => {
  it('renders the score and the four figures behind it', () => {
    render(<ResultSummary result={result} levelName="Bass" isBest={false} t={t} />)
    expect(screen.getByText('37')).toBeInTheDocument()
    expect(screen.getByText('26')).toBeInTheDocument()
    expect(screen.getByText('11')).toBeInTheDocument()
  })

  it('shows the multipliers that went into the score, to two places', () => {
    render(<ResultSummary result={result} levelName="Bass" isBest={false} t={t} />)
    expect(screen.getByText('difficulty 1.20x')).toBeInTheDocument()
    expect(screen.getByText(`endurance ${enduranceBonus(120).toFixed(2)}x`)).toBeInTheDocument()
  })

  it('shows the personal-best badge only for a new best', () => {
    const { rerender } = render(<ResultSummary result={result} levelName="Bass" isBest={false} t={t} />)
    expect(screen.queryByText('Personal best')).toBeNull()
    rerender(<ResultSummary result={result} levelName="Bass" isBest t={t} />)
    expect(screen.getByText('Personal best')).toBeInTheDocument()
  })

  it("names the session's level", () => {
    render(<ResultSummary result={result} levelName="Bass" isBest={false} t={t} />)
    expect(screen.getByText('Bass session')).toBeInTheDocument()
  })

  it('shows the change against the recent average only when there is one', () => {
    const { rerender } = render(<ResultSummary result={result} levelName="Bass" isBest={false} t={t} />)
    expect(screen.queryByText(/this week/)).toBeNull()
    rerender(<ResultSummary result={result} levelName="Bass" isBest={false} average={30} t={t} />)
    expect(screen.getByText('+7 on this week')).toBeInTheDocument()
    rerender(<ResultSummary result={result} levelName="Bass" isBest={false} average={40} t={t} />)
    expect(screen.getByText('\u22123 on this week')).toBeInTheDocument()
  })
})

