import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { resetStores, session } from '@/test/fixtures'
import { fakeDrill } from '@/test/fakeDrill'
import { addDrills, listedDrills } from '@/app/drills'
import { useAppStore } from '@/app/store'
import { useDrillStore } from '@/drills/note-id/store'
import { getSettings, markLessonDone, recordSession } from '@/progress/progressStore'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))

const { default: App } = await import('./App')

const at = (...paths: string[]) =>
  render(<MemoryRouter initialEntries={paths} initialIndex={paths.length - 1}><App /></MemoryRouter>)

/** The app on a router whose history the test can read and move through. */
function routed(...paths: string[]) {
  const router = createMemoryRouter([{ path: '*', element: <App /> }], { initialEntries: paths, initialIndex: paths.length - 1 })
  render(<RouterProvider router={router} />)
  return router
}

/** A reader past the first-open question. */
const returning = () => useAppStore.getState().updateSettings({ startPoint: 'reader' })

beforeEach(() => resetStores({ lang: 'en' }))

describe('first open', () => {
  it('asks a brand-new reader where to start, before either tab', () => {
    at('/')
    expect(screen.getByRole('heading', { name: /Can you read music notes yet\?/ })).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).toBeNull()
  })

  it('never asks a reader who already has history', () => {
    recordSession(session())
    at('/learn')
    expect(screen.queryByText(/Can you read music notes yet\?/)).toBeNull()
  })

  it('sends a beginner into the first lesson, with Học underneath', async () => {
    const router = routed('/')
    await userEvent.click(await screen.findByRole('button', { name: /Not yet, I am just starting/ }))
    expect(await screen.findByText(/Lesson 1.1 · Pitch and note names/)).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/theory/pitch-staff/pitch-names')
    expect(getSettings().startPoint).toBe('beginner')
    await userEvent.click(screen.getByRole('button', { name: 'Close the lesson' }))
    expect(await screen.findByRole('heading', { name: 'Learn' })).toBeInTheDocument()
  })

  it('starts a reader on one minute of note reading at level 1, with Luyện underneath', async () => {
    const router = routed('/')
    await userEvent.click(screen.getByRole('button', { name: /Yes, I can read a little/ }))
    await screen.findByRole('button', { name: 'Quit this session' })
    expect(useDrillStore.getState()).toMatchObject({ phase: 'running', level: 1 })
    expect(useDrillStore.getState().settings.drills['note-id']).toMatchObject({ level: 1, durationSec: 60 })
    expect(getSettings().startPoint).toBe('reader')
    act(() => { void router.navigate(-1) })
    expect(await screen.findByRole('heading', { name: 'Practice' })).toBeInTheDocument()
  })
})

describe('tabs', () => {
  beforeEach(returning)

  it('serves Luyện at / and Học at /learn, with the tab bar on both and not in a drill', async () => {
    at('/')
    expect(screen.getByRole('heading', { name: 'Practice' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Practice' })).toHaveAttribute('aria-current', 'page')
    await userEvent.click(screen.getByRole('link', { name: 'Learn' }))
    expect(await screen.findByRole('heading', { name: 'Learn' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Learn' })).toHaveAttribute('aria-current', 'page')
  })

  it('opens Học above Luyện, so back and the Luyện tab both step back instead of piling up history', async () => {
    const router = routed('/')
    await userEvent.click(screen.getByRole('link', { name: 'Learn' }))
    await screen.findByRole('heading', { name: 'Learn' })
    expect(router.state.historyAction).toBe('PUSH')
    await userEvent.click(screen.getByRole('link', { name: 'Practice' }))
    await screen.findByRole('heading', { name: 'Practice' })
    expect(router.state.historyAction).toBe('POP')
  })

  it('replaces a Học opened any other way when switching to Luyện', async () => {
    const router = routed('/learn')
    await userEvent.click(await screen.findByRole('link', { name: 'Practice' }))
    await screen.findByRole('heading', { name: 'Practice' })
    expect(router.state.historyAction).toBe('REPLACE')
  })

  it('hides the tab bar inside a drill', async () => {
    at('/train/note-id')
    expect(await screen.findByRole('button', { name: /Start/ })).toBeInTheDocument()
    expect(screen.queryByRole('navigation')).toBeNull()
  })

  it('sends unknown paths to Luyện', () => {
    at('/nowhere')
    expect(screen.getByRole('heading', { name: 'Practice' })).toBeInTheDocument()
  })

  it('lands back on Luyện as it was, with no slide, when going back', async () => {
    const { container } = at('/', '/train/note-id')
    await userEvent.click(await screen.findByRole('link', { name: 'Back to home' }))
    expect(await screen.findByRole('heading', { name: 'Practice' })).toBeInTheDocument()
    const page = [...container.children].find(el => el.tagName === 'DIV') as HTMLElement
    expect(page.style.opacity).not.toBe('0')
  })
})

describe('a drill added to the registry alone', () => {
  let remove = () => {}
  afterEach(() => remove())

  it('gets its route, wrapped in its colour scope', async () => {
    remove = addDrills(fakeDrill())
    at('/train/fake')
    expect(await screen.findByText('fake drill page')).toBeInTheDocument()
    expect(document.documentElement.dataset.drill).toBe('fake')
  })

  it('opens on Luyện with its lesson, marked as just opened, and its settings come from its defaults', async () => {
    returning()
    // Real drills waiting on a lesson count too.
    const locked = listedDrills().filter(d => d.unlockedBy).length + 1
    remove = addDrills(fakeDrill({ unlockedBy: 'pitch-staff/staff-clefs' }))
    const first = at('/')
    expect(screen.queryByRole('link', { name: 'Fake drill' })).toBeNull()
    expect(screen.getByText(new RegExp(`${locked} more drills? opens? as you learn`))).toBeInTheDocument()
    first.unmount()

    markLessonDone('pitch-staff/staff-clefs', { correct: 3, total: 3 })
    at('/')
    expect(await screen.findByRole('link', { name: 'Fake drill' })).toHaveAttribute('href', '/train/fake')
    expect(screen.getByText('Just opened')).toBeInTheDocument()
  })
})
