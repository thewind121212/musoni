import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { resetStores } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({ playPitch: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()) }))

const { default: App } = await import('./App')

const at = (...paths: string[]) =>
  render(<MemoryRouter initialEntries={paths} initialIndex={paths.length - 1}><App /></MemoryRouter>)

beforeEach(() => resetStores({ lang: 'en' }))

describe('App routes', () => {
  it('serves home at /', () => {
    at('/')
    expect(screen.getByRole('heading', { name: 'musoni' })).toBeInTheDocument()
  })

  it('loads the note-id drill on its own route', async () => {
    at('/train/note-id')
    expect(await screen.findByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('sends unknown paths home', () => {
    at('/nowhere')
    expect(screen.getByRole('heading', { name: 'musoni' })).toBeInTheDocument()
  })

  it('lands back on home as it was, with no slide, when going back', async () => {
    const { container } = at('/', '/train/note-id')
    await userEvent.click(await screen.findByRole('link', { name: 'Back to home' }))
    expect(await screen.findByRole('heading', { name: 'musoni' })).toBeInTheDocument()
    expect((container.firstElementChild as HTMLElement).style.opacity).not.toBe('0')
  })
})
