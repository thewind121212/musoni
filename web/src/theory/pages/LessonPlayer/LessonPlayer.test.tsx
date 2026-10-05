import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Link, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LessonPlayer } from './LessonPlayer'
import { getDailyMinutes, getLessonsDone, localDayKey } from '@/progress/progressStore'
import { useTheoryStore } from '@/theory/store'
import { resetStores } from '@/test/fixtures'

/** Where a link went, and the route state it carried. */
function Landed({ name }: { name: string }) {
  const location = useLocation()
  return <p data-testid="landed">{name} {JSON.stringify(location.state)}</p>
}

function renderLesson(path: string, state?: unknown) {
  return render(
    <MemoryRouter initialEntries={['/theory', { pathname: path, state }]} initialIndex={1}>
      <Routes>
        <Route path="/theory" element={<Landed name="list" />} />
        <Route path="/theory/:chapter/:lesson" element={<LessonPlayer />} />
        <Route path="/train/note-id" element={<Landed name="note-id" />} />
      </Routes>
    </MemoryRouter>,
  )
}

const next = () => screen.getByRole('button', { name: /^(Next|Finish)$/ })

beforeEach(() => resetStores({ lang: 'en', naming: 'letters', sound: false }))

describe('LessonPlayer', () => {
  it('walks a lesson: explain steps go on, a check waits for its answer, the end saves the lesson', async () => {
    const user = userEvent.setup()
    renderLesson('/theory/pitch-staff/pitch-names')
    expect(await screen.findByRole('heading', { name: 'High and low' })).toBeInTheDocument()
    expect(screen.getByText(/Lesson 1\.1/)).toBeInTheDocument()

    await user.click(next())
    await screen.findByRole('heading', { name: 'Seven note names' })
    await user.click(next())
    await screen.findByRole('heading', { name: 'Finding notes by the black keys' })
    await user.click(next())

    // Check 1 (choices): Next stays off until it is answered; a wrong pick says so and why.
    await screen.findByText('Which note is the coloured key?')
    expect(next()).toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'D' }))
    expect(screen.getByRole('status')).toHaveTextContent(/^Not quite/)
    expect(next()).toBeEnabled()
    // One answer per check.
    await user.click(screen.getByRole('button', { name: 'E' }))
    expect(useTheoryStore.getState().answers[3]).toMatchObject({ correct: false })
    await user.click(next())

    // Check 2 (piano pad): answered right.
    await screen.findByText(/group of three black keys/)
    await user.click(screen.getByRole('button', { name: /^F[a-z]?$/ }))
    expect(screen.getByRole('status')).toHaveTextContent(/Right/)
    await user.click(next())

    await screen.findByText(/Moving right on the keyboard/)
    await user.click(screen.getByRole('button', { name: 'Higher' }))
    expect(screen.getByRole('button', { name: 'Finish' })).toBeEnabled()
    await user.click(next())

    // End screen: recap, score, the way on, the credit.
    expect(await screen.findByText('What you learned')).toBeInTheDocument()
    expect(screen.getByText('2/3 right')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Next: The staff and clefs/ })).toHaveAttribute('href', '/theory/pitch-staff/staff-clefs')
    expect(screen.getByRole('link', { name: '1.1' })).toHaveAttribute('href', expect.stringContaining('Pitch.html'))
    expect(getLessonsDone()['pitch-staff/pitch-names']).toMatchObject({ correct: 2, total: 3 })
  })

  it('shows note names in the reader\'s naming', async () => {
    resetStores({ lang: 'en', naming: 'solfege', sound: false })
    useTheoryStore.setState({ lesson: 'pitch-staff/pitch-names', steps: 6, step: 3, answers: {} })
    renderLesson('/theory/pitch-staff/pitch-names')
    // A step back (POP) keeps the place, so the check is shown at once.
    expect(await screen.findByRole('button', { name: 'Mi' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'E' })).toBeNull()
  })

  it('offers the practice preset on the end screen and starts the drill with it', async () => {
    const user = userEvent.setup()
    useTheoryStore.setState({ lesson: 'pitch-staff/staff-clefs', steps: 7, step: 7, answers: { 1: { choice: 0, correct: true } } })
    renderLesson('/theory/pitch-staff/staff-clefs')
    const card = (await screen.findByText('Practice what you just read')).closest('section')!
    const go = within(card).getByRole('link', { name: /Practice now/ })
    expect(go).toHaveAttribute('href', '/train/note-id')
    await user.click(go)
    expect(screen.getByTestId('landed')).toHaveTextContent(
      'note-id {"autostart":true,"preset":{"drill":"note-id","level":1,"durationSec":60}}',
    )
  })

  it('starts a finished lesson over on a fresh visit, but keeps its end screen on a step back', async () => {
    const user = userEvent.setup()
    useTheoryStore.setState({ lesson: 'pitch-staff/pitch-names', steps: 6, step: 6, answers: {} })
    render(
      <MemoryRouter initialEntries={['/theory']}>
        <Routes>
          <Route path="/theory" element={<Link to="/theory/pitch-staff/pitch-names">open</Link>} />
          <Route path="/theory/:chapter/:lesson" element={<LessonPlayer />} />
        </Routes>
      </MemoryRouter>,
    )
    await user.click(screen.getByRole('link', { name: 'open' }))
    expect(await screen.findByRole('heading', { name: 'High and low' })).toBeInTheDocument()
    expect(useTheoryStore.getState().step).toBe(0)
  })

  it('keeps the end screen when the reader steps back to it from the drill', async () => {
    useTheoryStore.setState({ lesson: 'pitch-staff/pitch-names', steps: 6, step: 6, answers: {} })
    renderLesson('/theory/pitch-staff/pitch-names')
    expect(await screen.findByText('What you learned')).toBeInTheDocument()
  })

  it('closes back to the list it came from', async () => {
    const user = userEvent.setup()
    renderLesson('/theory/pitch-staff/octaves', { from: 'theory' })
    await screen.findByRole('heading', { name: 'The octave' })
    await user.click(screen.getByRole('button', { name: 'Close the lesson' }))
    expect(screen.getByTestId('landed')).toHaveTextContent('list')
    expect(useTheoryStore.getState().lesson).toBeNull()
  })

  it('sends an unknown lesson to the list', () => {
    renderLesson('/theory/pitch-staff/nope')
    expect(screen.getByTestId('landed')).toHaveTextContent('list')
  })

  it('counts the time read toward today\'s minutes', async () => {
    const user = userEvent.setup()
    renderLesson('/theory/pitch-staff/pitch-names')
    await screen.findByRole('heading', { name: 'High and low' })
    useTheoryStore.setState({ activeAt: Date.now() - 60_000 })
    await user.click(screen.getByRole('button', { name: 'Close the lesson' }))
    expect(getDailyMinutes()[localDayKey(new Date())]).toBe(1)
  })
})
