import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DrillRoute } from './DrillRoute'
import { fakeDrill } from '@/test/fakeDrill'

describe('DrillRoute', () => {
  it("loads the drill's page and scopes its colour to the whole document while it is open", async () => {
    const { unmount } = render(<MemoryRouter><DrillRoute drill={fakeDrill()} /></MemoryRouter>)
    // Set before the page paints, so its Start button never shows amber first.
    expect(document.documentElement.dataset.drill).toBe('fake')
    expect(await screen.findByText('fake drill page')).toBeInTheDocument()
    unmount()
    expect(document.documentElement.dataset.drill).toBeUndefined()
  })
})
