import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HomeScreen } from './HomeScreen'
import { useAppStore } from '@/app/store'
import { getSettings, markLessonDone, recordSession } from '@/progress/progressStore'
import { resetStores, session } from '@/test/fixtures'

const renderHome = () => render(<MemoryRouter><HomeScreen /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('HomeScreen', () => {
  it('renders for a first visit with default settings', () => {
    resetStores()
    renderHome()
    expect(screen.getByRole('heading', { name: 'musoni' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Luyện ngay/ }).map(a => a.getAttribute('href')))
      .toEqual(['/train/note-id', '/train/hear-play'])
  })

  it("keeps each drill's best to its own card", () => {
    recordSession(session({ practiceScore: 41, level: 1 }))
    recordSession(session({ drill: 'hear-play', practiceScore: 17, level: 1 }))
    renderHome()
    expect(screen.getByText('41')).toBeInTheDocument()
    expect(screen.getByText('17')).toBeInTheDocument()
  })

  it('shows saved practice: today against the goal, the streak and the best score at the chosen level', () => {
    recordSession(session({ durationSec: 300, practiceScore: 41, level: 2 }))
    recordSession(session({ practiceScore: 55, level: 3 }))
    useAppStore.getState().updateSettings({ level: 2 })
    renderHome()
    expect(screen.getByText("Today's goal reached")).toBeInTheDocument()
    expect(screen.getByText('1 day')).toBeInTheDocument()
    expect(screen.getByText('41')).toBeInTheDocument()
    expect(screen.queryByText('55')).toBeNull()
  })

  it('switches language through the app store and keeps it', async () => {
    renderHome()
    await userEvent.click(screen.getByRole('button', { name: 'Tiếng Việt' }))
    expect(screen.getByRole('heading', { name: 'Luyện tập' })).toBeInTheDocument()
    expect(getSettings().lang).toBe('vi')
  })

  it('plays its entrance on the first visit only, not when the reader comes back', () => {
    // Regression: returning from a drill blanked every block and slid it in again.
    useAppStore.setState({ homeIntroPlayed: false })
    const first = renderHome()
    expect(screen.getByRole('banner').style.opacity).toBe('0')
    first.unmount()

    renderHome()
    expect(screen.getByRole('banner').style.opacity).not.toBe('0')
  })

  it('opens the calendar and remembers that it is open', async () => {
    renderHome()
    await userEvent.click(screen.getByRole('button', { name: /Show calendar/ }))
    expect(screen.getByRole('button', { name: /Show less/ })).toHaveAttribute('aria-expanded', 'true')
    expect(getSettings().activityExpanded).toBe(true)
  })

  it('offers the way back into a session left paused', () => {
    useAppStore.setState({ pausedSession: { to: '/train/note-id', secondsLeft: 18, correct: 12, wrong: 2 } })
    renderHome()
    expect(screen.getByRole('status')).toHaveTextContent('0:18 left · 12 correct, 2 wrong')
    expect(screen.getByRole('link', { name: /Resume/ })).toHaveAttribute('href', '/train/note-id')
  })

  it('shows no paused notice without a paused session', () => {
    renderHome()
    expect(screen.queryByRole('status')).toBeNull()
  })

  it("scopes drill 2's colour on its card and on its paused bar, not drill 1's", () => {
    useAppStore.setState({ pausedSession: { to: '/train/hear-play', secondsLeft: 60, correct: 1, wrong: 0 } })
    renderHome()
    const [noteId, hearPlay] = screen.getAllByRole('link', { name: /Practice now/ })
    expect(hearPlay.closest('[data-drill]')).toHaveAttribute('data-drill', 'hear-play')
    expect(noteId.closest('[data-drill]')).toBeNull()
    expect(screen.getByRole('link', { name: /Resume/ }).closest('[data-drill]')).toHaveAttribute('data-drill', 'hear-play')
  })

  it('offers the first lesson to a new reader, then the next unfinished one', async () => {
    const first = renderHome()
    expect(await screen.findByText('First lesson:')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Start · 3 min/ })).toHaveAttribute('href', '/theory/pitch-staff/pitch-names')
    first.unmount()

    markLessonDone('pitch-staff/pitch-names', { correct: 3, total: 3 })
    markLessonDone('pitch-staff/c-clefs', { correct: 2, total: 3 })
    renderHome()
    expect(await screen.findByText('The staff and clefs')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Continue · 4 min/ })).toHaveAttribute('href', '/theory/pitch-staff/staff-clefs')
    expect(screen.getByText('2/5 lessons')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'See all lessons' })).toHaveAttribute('href', '/theory')
  })

  it('says so once every lesson is done', async () => {
    for (const id of ['pitch-names', 'staff-clefs', 'c-clefs', 'octaves', 'review']) {
      markLessonDone(`pitch-staff/${id}`, { correct: 1, total: 1 })
    }
    renderHome()
    expect(await screen.findByText(/You have finished all 5 lessons/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Look back over the lessons' })).toHaveAttribute('href', '/theory')
  })
})
