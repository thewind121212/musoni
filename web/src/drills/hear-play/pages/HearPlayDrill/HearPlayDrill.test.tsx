import { beforeEach, describe, it, expect, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { resetStores } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))
vi.mock('@/core/components/organisms/Staff', () => ({ Staff: () => <div data-testid="staff" /> }))

const { HearPlayDrill } = await import('./HearPlayDrill')
const { useEarStore } = await import('@/drills/hear-play/store')
const { useAppStore } = await import('@/app/store')

beforeEach(() => resetStores({ lang: 'en' }))

describe('HearPlayDrill', () => {
  it('opens on setup', () => {
    render(<MemoryRouter><HearPlayDrill /></MemoryRouter>)
    expect(screen.getByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it("starts straight away on home's one tap, at its own saved level and length", () => {
    useAppStore.getState().updateSettings({ earLevel: 3, earDurationSec: 300, level: 2 })
    render(
      <MemoryRouter initialEntries={[{ pathname: '/train/hear-play', state: { autostart: true } }]}>
        <HearPlayDrill />
      </MemoryRouter>,
    )
    expect(screen.getByRole('button', { name: 'Quit this session' })).toBeInTheDocument()
    expect(useEarStore.getState().level).toBe(3)
    expect(useEarStore.getState().endsAt! - Date.now()).toBeGreaterThan(290_000)
  })

  it('goes back to setup from a session started on setup', async () => {
    const router = createMemoryRouter(
      [{ path: '/', element: <p>home</p> }, { path: '/train/hear-play', element: <HearPlayDrill /> }],
      { initialEntries: ['/', '/train/hear-play'], initialIndex: 1 },
    )
    render(<RouterProvider router={router} />)
    await userEvent.click(screen.getByRole('button', { name: /Start/ }))
    await act(() => router.navigate(-1))
    expect(router.state.location.pathname).toBe('/train/hear-play')
    expect(useEarStore.getState().phase).toBe('setup')
  })

  it('sets its colour scope on <html> while open, and removes it after', () => {
    const { unmount } = render(<MemoryRouter><HearPlayDrill /></MemoryRouter>)
    expect(document.documentElement.dataset.drill).toBe('hear-play')
    unmount()
    expect(document.documentElement.dataset.drill).toBeUndefined()
  })
})
