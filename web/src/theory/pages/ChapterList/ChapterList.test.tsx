import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ChapterList } from './ChapterList'
import { getSettings, markLessonDone } from '@/progress/progressStore'
import { resetStores } from '@/test/fixtures'

const renderList = () => render(<MemoryRouter><ChapterList /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en', naming: 'letters' }))

describe('ChapterList', () => {
  it('opens the chapter holding the next lesson, its lessons linked and the next one marked', () => {
    markLessonDone('pitch-staff/pitch-names', { correct: 3, total: 3 })
    renderList()
    expect(screen.getByRole('button', { name: /Pitch and the staff/ })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('1/5 lessons')).toBeInTheDocument()
    const done = screen.getByRole('link', { name: /Pitch and note names/ })
    expect(done).toHaveAttribute('href', '/theory/pitch-staff/pitch-names')
    expect(done).toHaveTextContent('Done')
    expect(screen.getByRole('link', { name: /The staff and clefs/ })).toHaveTextContent('Up next')
    // A lesson with a practice link is tagged with its drill.
    expect(screen.getByRole('link', { name: /The staff and clefs/ })).toHaveTextContent('♪ Note reading')
    expect(screen.getByRole('link', { name: /About the content/ })).toHaveAttribute('href', '/theory/about')
  })

  it('folds a chapter and switches the note naming through settings', async () => {
    renderList()
    await userEvent.click(screen.getByRole('button', { name: /Pitch and the staff/ }))
    expect(screen.queryByRole('link', { name: /Pitch and note names/ })).toBeNull()
    await userEvent.click(screen.getByRole('radio', { name: 'Do Re Mi' }))
    expect(getSettings().naming).toBe('solfege')
  })
})
