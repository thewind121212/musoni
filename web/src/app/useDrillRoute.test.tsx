import { beforeEach, describe, it, expect } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { create } from 'zustand'
import { Link, MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useDrillRoute, type DrillPhase, type DrillRouteControls } from './useDrillRoute'

const useFake = create<{ phase: DrillPhase }>(() => ({ phase: 'setup' }))
const go = (phase: DrillPhase) => act(() => useFake.setState({ phase }))

const controls: DrillRouteControls = {
  usePhase: () => useFake(s => s.phase),
  autostart: () => useFake.setState({ phase: 'running' }),
  backToSetup: () => useFake.setState({ phase: 'setup' }),
  resume: () => useFake.setState({ phase: 'running' }),
}

function Home() {
  return (
    <>
      <p>home</p>
      <Link to="/drill" state={{ autostart: true }}>practice</Link>
      <Link to="/drill" state={{ setup: true }}>change setup</Link>
    </>
  )
}

function Drill() {
  const phase = useDrillRoute(controls)
  const navigate = useNavigate()
  return (
    <>
      <p>drill {phase}</p>
      <button onClick={() => navigate(-1)}>back</button>
    </>
  )
}

function renderApp() {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drill" element={<Drill />} />
      </Routes>
    </MemoryRouter>,
  )
}

const back = () => userEvent.click(screen.getByRole('button', { name: 'back' }))
const open = (name: string) => userEvent.click(screen.getByRole('link', { name }))

beforeEach(() => useFake.setState({ phase: 'setup' }))

describe('useDrillRoute back matrix', () => {
  it('practice from home: back from the session goes home', async () => {
    renderApp()
    await open('practice')
    expect(screen.getByText('drill running')).toBeInTheDocument()
    await back()
    expect(screen.getByText('home')).toBeInTheDocument()
  })

  it('practice from home: back from the result goes home', async () => {
    renderApp()
    await open('practice')
    go('finished')
    await back()
    expect(screen.getByText('home')).toBeInTheDocument()
  })

  it('from setup: back from the session returns to setup, then home', async () => {
    renderApp()
    await open('change setup')
    go('running')
    await back()
    expect(screen.getByText('drill setup')).toBeInTheDocument()
    await back()
    expect(screen.getByText('home')).toBeInTheDocument()
  })

  it('from setup: back from the result returns to setup', async () => {
    renderApp()
    await open('change setup')
    go('running')
    go('finished')
    await back()
    expect(screen.getByText('drill setup')).toBeInTheDocument()
    await back()
    expect(screen.getByText('home')).toBeInTheDocument()
  })

  it('practice: a session ended with nothing to keep (✕ before any answer) goes home', async () => {
    renderApp()
    await open('practice')
    go('setup')
    expect(await screen.findByText('home')).toBeInTheDocument()
  })

  it('practice, then setup from the result: a new session backs out to setup, then home', async () => {
    renderApp()
    await open('practice')
    go('finished')
    go('setup')
    go('running')
    await back()
    expect(screen.getByText('drill setup')).toBeInTheDocument()
    await back()
    expect(screen.getByText('home')).toBeInTheDocument()
  })
})
