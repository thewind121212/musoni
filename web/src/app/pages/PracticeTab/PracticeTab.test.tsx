import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { PracticeTab } from './PracticeTab'
import { useAppStore } from '@/app/store'
import { addDrills } from '@/app/drills'
import { fakeDrill } from '@/test/fakeDrill'
import { getSettings, getUnlocksSeen, markLessonDone, recordSession } from '@/progress/progressStore'
import { resetStores, session, withDrill } from '@/test/fixtures'

const renderTab = () => render(<MemoryRouter><PracticeTab /></MemoryRouter>)
const card = (title: string) => screen.getByRole('link', { name: title }).closest('[data-drill]') as HTMLElement

let remove = () => {}
beforeEach(() => resetStores({ lang: 'en', startPoint: 'reader' }))
afterEach(() => remove())

describe('PracticeTab', () => {
  it("gives a new reader one gentle start and the open drills, with no empty figures", () => {
    renderTab()
    expect(screen.getByRole('heading', { name: 'Note reading · 1 min' })).toBeInTheDocument()
    expect(screen.getByText(/An easy start/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Start' })).toHaveAttribute('href', '/train/note-id')
    expect(within(card('Note reading')).getByText('Not tried')).toBeInTheDocument()
    expect(within(card('Hear & play')).getByText('Not tried')).toBeInTheDocument()
    expect(screen.queryByText('Best')).toBeNull()
    // No history yet: no calendar.
    expect(screen.queryByText('Your practice days')).toBeNull()
  })

  it("shows a played drill's level, length and best at that level, and starts it in one tap", () => {
    recordSession(session({ practiceScore: 41, level: 2 }))
    recordSession(session({ practiceScore: 55, level: 3 }))
    useAppStore.setState({ settings: withDrill('note-id', { level: 2 }, useAppStore.getState().settings) })
    renderTab()
    const noteId = card('Note reading')
    expect(within(noteId).getByText('41')).toBeInTheDocument()
    expect(within(noteId).queryByText('55')).toBeNull()
    expect(within(noteId).getByRole('link', { name: 'Practice' })).toHaveAttribute('href', '/train/note-id')
    expect(screen.getByText('Your practice days')).toBeInTheDocument()
  })

  it("moves Hôm nay on to the drill practised least recently, and fills what is left of today's goal", () => {
    const twoDaysAgo = new Date()
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
    recordSession(session({ drill: 'hear-play', at: twoDaysAgo.toISOString() }))
    recordSession(session({ durationSec: 120 }))
    renderTab()
    expect(screen.getByRole('heading', { name: 'Hear & play · 2 min' })).toBeInTheDocument()
    expect(screen.getByText('Last practised 2 days ago.')).toBeInTheDocument()
    expect(screen.getByText('Today · 3 min to go')).toBeInTheDocument()
  })

  it("picks the last lesson's drill once the lesson text has loaded", async () => {
    markLessonDone('pitch-staff/octaves', { correct: 3, total: 3 })
    renderTab()
    expect(await screen.findByText(/Because you just learned “Octaves and middle/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Note reading · 2 min' })).toBeInTheDocument()
  })

  it('counts the drills still to open, shows them all on request, and marks one as just opened once', async () => {
    remove = addDrills(fakeDrill({ unlockedBy: 'pitch-staff/staff-clefs' }), fakeDrill({ id: 'later', unlockedBy: 'nowhere/yet' }))
    markLessonDone('pitch-staff/staff-clefs', { correct: 3, total: 3 })
    const first = renderTab()
    expect(within(card('Fake drill')).getByText('Just opened')).toBeInTheDocument()
    expect(getUnlocksSeen()).toContain('fake')
    await userEvent.click(screen.getByRole('button', { name: 'See all' }))
    // Only the drill whose lesson is not done is still closed (real drills may be closed too).
    const later = document.querySelector('[data-drill="later"]') as HTMLElement
    expect(within(later).getByText('Opens later')).toBeInTheDocument()
    expect(within(document.querySelector('[data-drill="fake"]') as HTMLElement).queryByText('Opens later')).toBeNull()
    first.unmount()

    renderTab()
    expect(within(card('Fake drill')).getByText('Not tried')).toBeInTheDocument()
  })

  it('switches language through the app store and keeps it', async () => {
    renderTab()
    await userEvent.click(screen.getByRole('button', { name: 'Tiếng Việt' }))
    expect(screen.getByRole('heading', { name: 'Luyện' })).toBeInTheDocument()
    expect(getSettings().lang).toBe('vi')
  })
})
