import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { SetupPhase } from './SetupPhase'
import { useAppStore } from '@/app/store'
import { useIntervalsStore } from '@/drills/intervals/store'
import { getSettings, recordSession } from '@/progress/progressStore'
import { resetStores, session } from '@/test/fixtures'

const renderSetup = () => render(<MemoryRouter><SetupPhase /></MemoryRouter>)

beforeEach(() => {
  resetStores({ lang: 'en' })
  useIntervalsStore.setState({ phase: 'setup', question: null, feedback: null, pausedAt: null, pauseReason: null })
})

describe('Intervals SetupPhase', () => {
  it('renders with default settings', () => {
    resetStores()
    renderSetup()
    expect(screen.getByRole('button', { name: /Bắt đầu/ })).toBeInTheDocument()
    expect(screen.getByRole('switch', { name: 'Nghe quãng sau mỗi câu' })).toHaveAttribute('aria-checked', 'true')
  })

  it("saves its own level and hearing, leaving other drills' alone", async () => {
    renderSetup()
    await userEvent.click(screen.getByRole('radio', { name: /With accidentals/ }))
    await userEvent.click(screen.getByRole('switch', { name: 'Hear each interval' }))
    expect(getSettings().drills.intervals).toMatchObject({ level: 3, hear: false })
    expect(getSettings().drills['note-id']).toBeUndefined()
  })

  it('shows the best Intervals score at the level, not another drill’s', () => {
    recordSession(session({ level: 1, practiceScore: 44 }))
    recordSession(session({ drill: 'intervals', level: 1, practiceScore: 21 }))
    renderSetup()
    expect(screen.getByText('21')).toBeInTheDocument()
    expect(screen.queryByText('44')).toBeNull()
  })

  it('starts a session at the chosen level and length', async () => {
    useAppStore.getState().updateDrill('intervals', { level: 4, durationSec: 120 })
    renderSetup()
    await userEvent.click(screen.getByRole('button', { name: /Start/ }))
    expect(useIntervalsStore.getState()).toMatchObject({ phase: 'running', level: 4 })
    expect(useIntervalsStore.getState().settings.drills.intervals.durationSec).toBe(120)
  })
})
