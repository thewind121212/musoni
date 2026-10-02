import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { HomeScreen } from './HomeScreen'
import { useAppStore } from '@/app/store'
import { getSettings, recordSession } from '@/progress/progressStore'
import { resetStores, session } from '@/test/fixtures'

const renderHome = () => render(<MemoryRouter><HomeScreen /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('HomeScreen', () => {
  it('renders for a first visit with default settings', () => {
    resetStores()
    renderHome()
    expect(screen.getByRole('heading', { name: 'musoni' })).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/train/note-id')
  })

  it('shows saved practice: minutes today, the streak and the best score at the chosen level', () => {
    recordSession(session({ durationSec: 300, practiceScore: 41, level: 2 }))
    recordSession(session({ practiceScore: 55, level: 3 }))
    useAppStore.getState().updateSettings({ level: 2 })
    renderHome()
    expect(screen.getByText('6 min')).toBeInTheDocument()
    expect(screen.getByText('1 day')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveTextContent('41')
    expect(screen.getByRole('link')).not.toHaveTextContent('55')
  })

  it('switches language through the app store and keeps it', async () => {
    renderHome()
    await userEvent.click(screen.getByRole('button', { name: 'Tiếng Việt' }))
    expect(screen.getByText('Luyện tập')).toBeInTheDocument()
    expect(getSettings().lang).toBe('vi')
  })

  it('opens the calendar and remembers that it is open', async () => {
    renderHome()
    await userEvent.click(screen.getByRole('button', { name: /Show calendar/ }))
    expect(screen.getByRole('button', { name: /Show less/ })).toHaveAttribute('aria-expanded', 'true')
    expect(getSettings().activityExpanded).toBe(true)
  })
})
