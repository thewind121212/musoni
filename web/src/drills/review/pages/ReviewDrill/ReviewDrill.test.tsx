import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { ReviewDrill } from './ReviewDrill'
import { useReviewStore } from '@/drills/review/store'
import { getReviewMarks, markLessonDone } from '@/progress/progressStore'
import { resetStores } from '@/test/fixtures'

vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(), playSequence: vi.fn(), stopSounds: vi.fn(), preloadPiano: vi.fn(() => Promise.resolve()),
}))

function open(state: unknown = null) {
  const router = createMemoryRouter(
    [
      { path: '/learn', element: <p>Học</p> },
      { path: '/train/review', element: <ReviewDrill /> },
      { path: '/theory/:chapter/:lesson', element: <p>lesson</p> },
    ],
    { initialEntries: ['/learn', { pathname: '/train/review', state }], initialIndex: 1 },
  )
  render(<RouterProvider router={router} />)
  return router
}

beforeEach(() => {
  resetStores({ lang: 'en', naming: 'letters' })
  useReviewStore.setState({ phase: 'setup', checkId: null, feedback: null, lastResult: null, misses: [], pausedAt: null, pauseReason: null })
  markLessonDone('pitch-staff/pitch-names', { correct: 3, total: 3 })
  // The weighted pick takes the first check of the pool: "Which note is the coloured key?" (E).
  vi.spyOn(Math, 'random').mockReturnValue(0)
})
afterEach(() => vi.restoreAllMocks())

describe('ReviewDrill', () => {
  it('runs a session from setup: a miss shows its reason and waits, then the result links back to its lesson', async () => {
    const router = open({ setup: true })
    await userEvent.click(screen.getByRole('button', { name: /Start/ }))
    expect(await screen.findByText('Which note is the coloured key?')).toBeInTheDocument()
    expect(screen.getByText('Lesson 1.1 · Pitch and note names')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'D' }))
    expect(screen.getByText(/Count the white keys from/)).toBeInTheDocument()
    expect(Object.values(getReviewMarks())).toEqual([expect.objectContaining({ missed: true })])
    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(await screen.findByText(/Tap the white key just left of the group of three/)).toBeInTheDocument()

    act(() => useReviewStore.getState().tick(Date.now() + 10 * 60_000))
    const lesson = await screen.findByRole('link', { name: /Which note is the coloured key\?/ })
    expect(lesson).toHaveAttribute('href', '/theory/pitch-staff/pitch-names')

    // Back from the result returns to setup, as in every drill.
    act(() => { void router.navigate(-1) })
    expect(await screen.findByRole('button', { name: /Start/ })).toBeInTheDocument()
  })

  it('moves on by itself after a right answer', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    open({ autostart: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    await user.click(await screen.findByRole('button', { name: 'E' }))
    expect(screen.getByText(/Count the white keys from/)).toBeInTheDocument()
    await act(async () => { vi.advanceTimersByTime(1500) })
    expect(await screen.findByText(/Tap the white key just left of the group of three/)).toBeInTheDocument()
    vi.useRealTimers()
  })
})
