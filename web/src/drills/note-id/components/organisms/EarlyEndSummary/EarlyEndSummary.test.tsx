import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EarlyEndSummary } from './EarlyEndSummary'
import type { SessionResult } from '@/progress/progressStore'
import { t } from '@/test/i18n'

const result: SessionResult = {
  drill: 'note-id', level: 1, accidentals: false, naming: 'letters', durationSec: 12,
  correct: 6, wrong: 1, accuracy: 6 / 7, avgMs: 900, bestStreak: 4, weight: 1,
  practiceScore: 0, at: '2026-10-02T09:00:00', partial: true,
}
const base = { result, played: '12 sec', todayMinutes: 2, dailyGoal: 5, t }

describe('EarlyEndSummary', () => {
  it('leads with the time played, not a score', () => {
    render(<EarlyEndSummary {...base} />)
    expect(screen.getByRole('heading', { name: 'You practised 12 sec' })).toBeInTheDocument()
    expect(screen.queryByText('0')).toBeNull()
  })

  it('says how far today\'s goal is', () => {
    render(<EarlyEndSummary {...base} />)
    expect(screen.getByText('3 min to today\'s goal')).toBeInTheDocument()
  })

  it('says when the goal is reached', () => {
    render(<EarlyEndSummary {...base} todayMinutes={6} />)
    expect(screen.getByText('Today\'s goal reached')).toBeInTheDocument()
  })
})
