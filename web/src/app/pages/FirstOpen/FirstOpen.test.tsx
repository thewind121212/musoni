import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { FirstOpen } from './FirstOpen'
import { CHANGE_START } from '@/app/firstOpen'
import { getSettings } from '@/progress/progressStore'
import { resetStores } from '@/test/fixtures'

beforeEach(() => resetStores({ lang: 'en' }))

describe('FirstOpen', () => {
  it('asks once, with both starts saying what they open', async () => {
    render(<MemoryRouter><FirstOpen /></MemoryRouter>)
    expect(screen.getByRole('heading', { name: /Can you read music notes yet\?/ })).toBeInTheDocument()
    expect(await screen.findByText('First lesson: 3 min')).toBeInTheDocument()
    expect(screen.getByText('Note reading practice: 1 min')).toBeInTheDocument()
    // First open has nowhere to go back to.
    expect(screen.queryByRole('link', { name: 'Back' })).toBeNull()
  })

  it('opened again from Học to change the start, starts there in its place', async () => {
    render(
      <MemoryRouter initialEntries={['/learn', { pathname: '/welcome', state: CHANGE_START }]} initialIndex={1}>
        <Routes>
          <Route path="/welcome" element={<FirstOpen />} />
          <Route path="/train/note-id" element={<p>note reading</p>} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: 'Back' })).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /Yes, I can read a little/ }))
    expect(screen.getByText('note reading')).toBeInTheDocument()
    expect(getSettings().startPoint).toBe('reader')
  })
})
