import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { resetStores } from '@/test/fixtures'
import { fakeDrill } from '@/test/fakeDrill'
import { addDrills } from '@/app/drills'

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

beforeEach(() => resetStores({ lang: 'en' }))

describe('tabs', () => {
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

  it('colours the page by mode: practice on Luyện and in drills, learning on Học and in lessons', async () => {
    const router = routed('/')
    const mode = () => document.documentElement.dataset.mode
    expect(mode()).toBe('practice')
    await userEvent.click(screen.getByRole('link', { name: 'Learn' }))
    await screen.findByRole('heading', { name: 'Learn' })
    expect(mode()).toBe('learn')
    act(() => { void router.navigate('/theory') })
    expect(mode()).toBe('learn')
    act(() => { void router.navigate('/train/note-id') })
    expect(mode()).toBe('practice')
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

  it('is listed on Luyện from the start, its settings from its defaults', async () => {
    remove = addDrills(fakeDrill())
    at('/')
    expect(await screen.findByRole('link', { name: 'Fake drill' })).toHaveAttribute('href', '/train/fake')
  })
})
