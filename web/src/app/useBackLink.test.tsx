import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter, Route, Routes, useNavigationType } from 'react-router-dom'
import { useBackLink } from './useBackLink'

function Home() {
  return <p>home via {useNavigationType()}</p>
}

function Drill() {
  return <Link to="/" onClick={useBackLink()}>back</Link>
}

const at = (entries: string[]) =>
  render(
    <MemoryRouter initialEntries={entries} initialIndex={entries.length - 1}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drill" element={<Drill />} />
      </Routes>
    </MemoryRouter>,
  )

describe('useBackLink', () => {
  it('steps back in history when the user came from home', async () => {
    at(['/', '/drill'])
    await userEvent.click(screen.getByRole('link', { name: 'back' }))
    expect(screen.getByText('home via POP')).toBeInTheDocument()
  })

  it('follows the link when the drill was opened directly', async () => {
    at(['/drill'])
    await userEvent.click(screen.getByRole('link', { name: 'back' }))
    expect(screen.getByText('home via PUSH')).toBeInTheDocument()
  })
})
