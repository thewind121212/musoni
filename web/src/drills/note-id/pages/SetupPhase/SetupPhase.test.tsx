import { beforeEach, describe, it, expect } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { SetupPhase } from './SetupPhase'
import { useAppStore } from '@/app/store'
import { useDrillStore } from '@/drills/note-id/store'
import { getSettings, recordSession } from '@/progress/progressStore'
import { resetStores, session } from '@/test/fixtures'

const renderSetup = () => render(<MemoryRouter><SetupPhase /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('SetupPhase', () => {
  it('renders with default settings', () => {
    resetStores()
    renderSetup()
    expect(screen.getByRole('button', { name: /Bắt đầu/ })).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })

  it('saves a changed setting through the app store', async () => {
    renderSetup()
    await userEvent.click(screen.getByRole('radio', { name: 'C D E' }))
    expect(useAppStore.getState().settings.naming).toBe('letters')
    expect(getSettings().naming).toBe('letters')
  })

  it('changes level through setLevel', async () => {
    renderSetup()
    await userEvent.click(screen.getByRole('radio', { name: /Bass/ }))
    expect(useAppStore.getState().settings.level).toBe(3)
  })

  it('shows the best score for the chosen level only', () => {
    recordSession(session({ level: 1, practiceScore: 44 }))
    renderSetup()
    expect(screen.getByText('44')).toBeInTheDocument()
    act(() => useAppStore.getState().setLevel(2))
    expect(screen.queryByText('44')).toBeNull()
    expect(screen.getByText('No score yet at this setup')).toBeInTheDocument()
  })

  it('starts the drill with the current level and settings', async () => {
    useAppStore.getState().updateSettings({ level: 4, durationSec: 120, accidentals: true })
    renderSetup()
    await userEvent.click(screen.getByRole('button', { name: /Start/ }))
    const drill = useDrillStore.getState()
    expect(drill.phase).toBe('running')
    expect(drill.level).toBe(4)
    expect(drill.settings.durationSec).toBe(120)
    expect(drill.settings.accidentals).toBe(true)
  })

  it('flips sharps and sound from their switches', async () => {
    renderSetup()
    const before = useAppStore.getState().settings
    await userEvent.click(screen.getByRole('switch', { name: 'Sharps and flats' }))
    await userEvent.click(screen.getByRole('switch', { name: 'Sound' }))
    const after = useAppStore.getState().settings
    expect(after.accidentals).toBe(!before.accidentals)
    expect(after.sound).toBe(!before.sound)
  })

  it('sums up the session next to Start', () => {
    useAppStore.getState().updateSettings({ level: 3, durationSec: 120, accidentals: true })
    renderSetup()
    expect(screen.getByText('Bass \u00B7 2 min \u00B7 \u266F \u266D')).toBeInTheDocument()
  })

  it('turns note names on the keys off and on', async () => {
    renderSetup()
    const toggle = screen.getByRole('switch', { name: 'Names on keys' })
    await userEvent.click(toggle)
    expect(getSettings().keyLabels).toBe(false)
    await userEvent.click(toggle)
    expect(getSettings().keyLabels).toBe(true)
  })

  it('starts on the piano and saves a switch to boxes', async () => {
    renderSetup()
    expect(screen.getByRole('radio', { name: 'Piano' })).toHaveAttribute('aria-checked', 'true')
    await userEvent.click(screen.getByRole('radio', { name: 'Boxes' }))
    expect(getSettings().padStyle).toBe('boxes')
  })
})
