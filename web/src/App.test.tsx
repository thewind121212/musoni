import { beforeEach, describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { resetStores } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({ playPitch: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()) }))

const { default: App } = await import('./App')

const at = (path: string) => render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

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
})
