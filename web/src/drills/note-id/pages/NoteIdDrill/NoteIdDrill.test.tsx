import { beforeEach, describe, it, expect, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { resetStores, session } from '@/test/fixtures'
import { getSettings } from '@/progress/progressStore'

vi.mock('@/core/audio/playPitch', () => ({ playPitch: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()) }))

const { NoteIdDrill } = await import('./NoteIdDrill')
const { useDrillStore } = await import('@/drills/note-id/store')
const { useAppStore } = await import('@/app/store')
const { restoreLiveSession } = await import('@/app/liveSession')

const renderDrill = () => render(<MemoryRouter><NoteIdDrill /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('NoteIdDrill', () => {
  it('opens on setup', () => {
    renderDrill()
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('shows the sprint while running', () => {
    useDrillStore.getState().start(1, useAppStore.getState().settings)
    renderDrill()
    expect(screen.getByRole('button', { name: 'Quit this session' })).toBeInTheDocument()
  })

  it('shows the result once finished', () => {
    useDrillStore.setState({ phase: 'finished', lastResult: session({ practiceScore: 33 }) })
    renderDrill()
    expect(screen.getByRole('button', { name: /Again/ })).toBeInTheDocument()
  })

  it('opens straight into a session on the saved setup when asked to autostart', () => {
    useAppStore.getState().updateSettings({ level: 3, durationSec: 120 })
    render(
      <MemoryRouter initialEntries={[{ pathname: '/train/note-id', state: { autostart: true } }]}>
        <NoteIdDrill />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: 'Quit this session' })).toBeInTheDocument()
    expect(useDrillStore.getState().level).toBe(3)
    expect(useDrillStore.getState().settings.durationSec).toBe(120)
  })

  it("starts a lesson's preset for this session only, leaving the saved setup alone", () => {
    useAppStore.getState().updateSettings({ level: 3, durationSec: 300, accidentals: false })
    const preset = { drill: 'note-id', level: 2, durationSec: 60, accidentals: true }
    render(
      <MemoryRouter initialEntries={[{ pathname: '/train/note-id', state: { autostart: true, preset } }]}>
        <NoteIdDrill />
      </MemoryRouter>,
    )
    const drill = useDrillStore.getState()
    expect(drill.phase).toBe('running')
    expect([drill.level, drill.settings.durationSec, drill.settings.accidentals]).toEqual([2, 60, true])
    const saved = useAppStore.getState().settings
    expect([saved.level, saved.durationSec, saved.accidentals]).toEqual([3, 300, false])
    expect(getSettings().level).toBe(3)
  })

  it("ignores another drill's preset", () => {
    useAppStore.getState().updateSettings({ level: 3 })
    const preset = { drill: 'hear-play', level: 2, durationSec: 60 }
    render(
      <MemoryRouter initialEntries={[{ pathname: '/train/note-id', state: { autostart: true, preset } }]}>
        <NoteIdDrill />
      </MemoryRouter>,
    )
    expect(useDrillStore.getState().level).toBe(3)
  })

  it('opens setup from the change-setup link even after a finished session', () => {
    useDrillStore.setState({ phase: 'finished', lastResult: session() })
    render(
      <MemoryRouter initialEntries={[{ pathname: '/train/note-id', state: { setup: true } }]}>
        <NoteIdDrill />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('carries on a paused session from home\'s notice, and clears the notice', () => {
    useDrillStore.getState().start(1, useAppStore.getState().settings, 1_000)
    useDrillStore.getState().pause('away', 2_000)
    useAppStore.setState({ pausedSession: { to: '/train/note-id', secondsLeft: 59, correct: 1, wrong: 0 } })
    render(
      <MemoryRouter initialEntries={[{ pathname: '/train/note-id', state: { resume: true } }]}>
        <NoteIdDrill />
      </MemoryRouter>,
    )
    expect(useDrillStore.getState().pausedAt).toBeNull()
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(useAppStore.getState().pausedSession).toBeNull()
  })

  describe('back inside the drill', () => {
    // Home, then the drill: the way a reader arrives.
    const renderFromHome = () => {
      const router = createMemoryRouter(
        [{ path: '/', element: <p>home</p> }, { path: '/train/note-id', element: <NoteIdDrill /> }],
        { initialEntries: ['/', '/train/note-id'], initialIndex: 1 },
      )
      render(<RouterProvider router={router} />)
      return router
    }
    const back = (router: ReturnType<typeof createMemoryRouter>) => act(() => router.navigate(-1))

    it('goes from a session started on setup back to setup, keeping its played time', async () => {
      const router = renderFromHome()
      await userEvent.click(screen.getByRole('button', { name: /Start/ }))
      act(() => useDrillStore.setState({ correct: 2 }))
      await back(router)
      expect(router.state.location.pathname).toBe('/train/note-id')
      expect(useDrillStore.getState().phase).toBe('setup')
      await back(router)
      expect(router.state.location.pathname).toBe('/')
    })

    it("leaves a session started from home's Practice for home, which offers it back", async () => {
      const router = createMemoryRouter(
        [{ path: '/', element: <p>home</p> }, { path: '/train/note-id', element: <NoteIdDrill /> }],
        { initialEntries: ['/', { pathname: '/train/note-id', state: { autostart: true } }], initialIndex: 1 },
      )
      render(<RouterProvider router={router} />)
      act(() => useDrillStore.setState({ correct: 1 }))
      await back(router)
      await act(() => new Promise(r => setTimeout(r, 0)))
      expect(router.state.location.pathname).toBe('/')
      expect(useDrillStore.getState().pauseReason).toBe('away')
      expect(useAppStore.getState().pausedSession).toMatchObject({ to: '/train/note-id', correct: 1 })
    })

    it('goes from the result back to setup, then home', async () => {
      const router = renderFromHome()
      await userEvent.click(screen.getByRole('button', { name: /Start/ }))
      act(() => useDrillStore.setState({ phase: 'finished', lastResult: session() }))
      await back(router)
      expect(useDrillStore.getState().phase).toBe('setup')
      expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
      await back(router)
      expect(router.state.location.pathname).toBe('/')
    })

    it("takes the result screen's Home link straight home, past setup", async () => {
      const router = renderFromHome()
      await userEvent.click(screen.getByRole('button', { name: /Start/ }))
      act(() => useDrillStore.setState({ phase: 'finished', lastResult: session() }))
      await userEvent.click(await screen.findByRole('link', { name: /Home/ }))
      expect(router.state.location.pathname).toBe('/')
    })

    it('drops the session entry when the drill returns to setup by itself', async () => {
      const router = renderFromHome()
      await userEvent.click(screen.getByRole('button', { name: /Start/ }))
      // Ending with no answers goes straight to setup; back from there leaves.
      act(() => useDrillStore.getState().endEarly())
      await act(async () => {})
      await back(router)
      expect(router.state.location.pathname).toBe('/')
    })
  })

  it('opens a session cut off by a page load paused, greeting the reader back, and keeps it on the way home', async () => {
    useDrillStore.getState().start(1, useAppStore.getState().settings)
    useDrillStore.getState().answer(useDrillStore.getState().question!.correctIndex)
    useDrillStore.getState().pause('away')
    // The page load: the store starts over, storage still holds the session.
    const saved = localStorage.getItem('musoni-live-v1')
    useDrillStore.setState({ phase: 'setup', question: null, correct: 0, pausedAt: null, pauseReason: null })
    localStorage.setItem('musoni-live-v1', saved!)
    restoreLiveSession(useDrillStore, 'note-id')

    const router = createMemoryRouter(
      [{ path: '/', element: <p>home</p> }, { path: '/train/note-id', element: <NoteIdDrill /> }],
      { initialEntries: ['/', '/train/note-id'], initialIndex: 1 },
    )
    render(<RouterProvider router={router} />)
    expect(await screen.findByText('Welcome back')).toBeInTheDocument()
    expect(useDrillStore.getState().correct).toBe(1)

    await act(() => router.navigate(-1))
    await act(() => new Promise(r => setTimeout(r, 0)))
    expect(useAppStore.getState().pausedSession).toMatchObject({ to: '/train/note-id', correct: 1 })
  })
})
