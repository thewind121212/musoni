import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { SetupPhase } from './SetupPhase'
import { markLessonDone } from '@/progress/progressStore'
import { useAppStore } from '@/app/store'
import { resetStores } from '@/test/fixtures'

const renderSetup = () => render(<MemoryRouter><SetupPhase /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('Review SetupPhase', () => {
  it('says to finish a lesson first when there is nothing to review', () => {
    renderSetup()
    expect(screen.getByText(/Finish a lesson first/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Start/ })).toBeDisabled()
  })

  it('offers each chapter with finished lessons, all on, and keeps the last one on', async () => {
    markLessonDone('pitch-staff/pitch-names', { correct: 3, total: 3 })
    markLessonDone('pitch-staff/octaves', { correct: 3, total: 3 })
    renderSetup()
    const chapter = screen.getByRole('switch', { name: 'Chapter 1 · Pitch and the staff' })
    expect(chapter).toHaveAttribute('aria-checked', 'true')
    expect(chapter).toBeDisabled()
    expect(screen.getAllByText('6 questions').length).toBeGreaterThan(0)
    await userEvent.click(screen.getByRole('radio', { name: '5 min' }))
    expect(useAppStore.getState().settings.drills.review).toMatchObject({ durationSec: 300 })
  })
})
