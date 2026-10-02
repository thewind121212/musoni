import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SessionStats } from './SessionStats'
import { t } from '@/test/i18n'

const result = { correct: 26, accuracy: 0.8666, avgMs: 1449, bestStreak: 11 }

describe('SessionStats', () => {
  it('renders the four figures', () => {
    render(<SessionStats result={result} t={t} />)
    expect(screen.getByText('26')).toBeInTheDocument()
    expect(screen.getByText('11')).toBeInTheDocument()
  })

  it('rounds accuracy to a whole percent and the average answer to tenths of a second', () => {
    render(<SessionStats result={result} t={t} />)
    expect(screen.getByText('87%')).toBeInTheDocument()
    expect(screen.getByText('1.4s')).toBeInTheDocument()
  })
})
