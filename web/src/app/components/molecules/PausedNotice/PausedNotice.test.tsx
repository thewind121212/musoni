import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { PausedNotice } from './PausedNotice'

function Drill() {
  const state = useLocation().state as { resume?: boolean } | null
  return <div>drill {state?.resume ? 'resuming' : 'fresh'}</div>
}

describe('PausedNotice', () => {
  it('goes back into the paused session, asking the drill to resume', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={
            <PausedNotice title="Session paused" detail="18 sec left" actionLabel="Resume" to="/train/note-id" />
          } />
          <Route path="/train/note-id" element={<Drill />} />
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByRole('status')).toHaveTextContent('18 sec left')
    await userEvent.click(screen.getByRole('link', { name: 'Resume' }))
    expect(screen.getByText('drill resuming')).toBeInTheDocument()
  })
})
