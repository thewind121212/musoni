import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { PracticeCard } from './PracticeCard'

function Drill() {
  const state = useLocation().state as { autostart?: boolean; setup?: boolean } | null
  return <div>{state?.autostart ? 'autostart' : state?.setup ? 'setup' : 'plain'}</div>
}

const renderCard = () => render(
  <MemoryRouter>
    <Routes>
      <Route
        path="/"
        element={
          <PracticeCard
            to="/train/note-id" icon={<svg />} title="Note reading" description="Name the note"
            actionLabel="Practice now" setupLabel="Change setup"
            stats={[{ icon: null, label: 'Best', value: '42' }]}
          />
        }
      />
      <Route path="/train/note-id" element={<Drill />} />
    </Routes>
  </MemoryRouter>,
)

describe('PracticeCard', () => {
  it('renders the drill, its stats and both ways in', () => {
    renderCard()
    expect(screen.getByText('Note reading')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Practice now/ })).toHaveAttribute('href', '/train/note-id')
    expect(screen.getByRole('link', { name: 'Change setup' })).toHaveAttribute('href', '/train/note-id')
  })

  it('asks the drill to start straight away only from the start button', async () => {
    renderCard()
    await userEvent.click(screen.getByRole('link', { name: /Practice now/ }))
    expect(screen.getByText('autostart')).toBeInTheDocument()
  })

  it('opens setup from the change link', async () => {
    renderCard()
    await userEvent.click(screen.getByRole('link', { name: 'Change setup' }))
    expect(screen.getByText('setup')).toBeInTheDocument()
  })
})
