import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { PracticeTab } from './PracticeTab'
import { useAppStore } from '@/app/store'
import { addDrills, listedDrills } from '@/app/drills'
import { fakeDrill } from '@/test/fakeDrill'
import { getSettings, recordSession } from '@/progress/progressStore'
import { resetStores, session, withDrill } from '@/test/fixtures'
import { t } from '@/test/i18n'

const renderTab = () => render(<MemoryRouter><PracticeTab /></MemoryRouter>)
const card = (title: string) => screen.getByRole('link', { name: title }).closest('[data-drill]') as HTMLElement

let remove = () => {}
beforeEach(() => resetStores({ lang: 'en' }))
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
    // Every drill is open, and a never-played one would come first: play them all.
    for (const d of listedDrills()) if (d.id !== 'hear-play' && d.id !== 'note-id') recordSession(session({ drill: d.id, durationSec: 0 }))
    recordSession(session({ drill: 'hear-play', at: twoDaysAgo.toISOString() }))
    recordSession(session({ durationSec: 120 }))
    renderTab()
    expect(screen.getByRole('heading', { name: 'Hear & play · 2 min' })).toBeInTheDocument()
    expect(screen.getByText('Last practised 2 days ago.')).toBeInTheDocument()
    expect(screen.getByText('Today · 3 min to go')).toBeInTheDocument()
  })

  it('lists every drill from the start, a new one among them', () => {
    remove = addDrills(fakeDrill())
    renderTab()
    expect(within(card('Fake drill')).getByText('Not tried')).toBeInTheDocument()
    for (const d of listedDrills()) expect(screen.getByRole('link', { name: t(d.title) })).toBeInTheDocument()
    expect(screen.queryByText('See all')).toBeNull()
  })

  it('puts the practice days above Hôm nay', () => {
    recordSession(session())
    renderTab()
    const days = screen.getByText('Your practice days')
    expect(days.compareDocumentPosition(screen.getByRole('link', { name: 'Start' })) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('switches language through the app store and keeps it', async () => {
    renderTab()
    await userEvent.click(screen.getByRole('button', { name: 'Tiếng Việt' }))
    expect(screen.getByRole('heading', { name: 'Luyện' })).toBeInTheDocument()
    expect(getSettings().lang).toBe('vi')
  })
})
