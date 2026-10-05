import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { SetupPhase } from './SetupPhase'
import { useAppStore } from '@/app/store'
import { useChordStore } from '@/drills/chords/store'
import { getSettings, recordSession } from '@/progress/progressStore'
import { resetStores, session } from '@/test/fixtures'

const renderSetup = () => render(<MemoryRouter><SetupPhase /></MemoryRouter>)
const own = () => getSettings().drills.chords ?? {}

beforeEach(() => {
  resetStores({ lang: 'en' })
  useChordStore.setState({ phase: 'setup', question: null, feedback: null })
})

describe('Chords SetupPhase', () => {
  it('renders with default settings', () => {
    resetStores()
    renderSetup()
    expect(screen.getByRole('button', { name: /Bắt đầu/ })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /Giọng Do/ })).toHaveAttribute('aria-checked', 'true')
  })

  it('saves its own level', async () => {
    renderSetup()
    await userEvent.click(screen.getByRole('radio', { name: /Inversions/ }))
    expect(own()).toMatchObject({ level: 4, mode: 'name' })
  })

  it('switches to Roman numerals at the level in the same place, showing only those levels and no pad settings', async () => {
    useAppStore.getState().updateDrill('chords', { level: 2 })
    renderSetup()
    await userEvent.click(screen.getByRole('radio', { name: /Roman numeral/ }))
    expect(own()).toMatchObject({ level: 6, mode: 'roman' })
    expect(screen.getByRole('radio', { name: /Numerals · 4/ })).toHaveAttribute('aria-checked', 'true')
    expect(screen.queryByRole('radio', { name: /Inversions/ })).toBeNull()
    expect(screen.queryByRole('switch', { name: 'Names on keys' })).toBeNull()

    await userEvent.click(screen.getByRole('radio', { name: /Name it/ }))
    expect(own()).toMatchObject({ level: 2, mode: 'name' })
  })

  it('saves the listening switch, on by default', async () => {
    renderSetup()
    const hear = screen.getByRole('switch', { name: 'Hear the chord after answering' })
    expect(hear).toHaveAttribute('aria-checked', 'true')
    await userEvent.click(hear)
    expect(own().listen).toBe(false)
  })

  it('shows the best at this level of this drill only', () => {
    recordSession(session({ level: 1, practiceScore: 44 }))
    recordSession(session({ drill: 'chords', level: 1, practiceScore: 21 }))
    recordSession(session({ drill: 'chords', level: 5, practiceScore: 37 }))
    renderSetup()
    expect(screen.getByText('21')).toBeInTheDocument()
    expect(screen.queryByText('44')).toBeNull()
    expect(screen.queryByText('37')).toBeNull()
  })

  it('starts a session at the chosen level and length', async () => {
    useAppStore.getState().updateDrill('chords', { level: 7, mode: 'roman', durationSec: 60 })
    renderSetup()
    await userEvent.click(screen.getByRole('button', { name: /Start/ }))
    expect(useChordStore.getState().phase).toBe('running')
    expect(useChordStore.getState().level).toBe(7)
    expect(useChordStore.getState().question!.kind).toBe('roman')
  })
})
