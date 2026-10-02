import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { translate } from '@/core/i18n/translate'

// Audio and notation are covered by their own tests; here they only get in the
// way (jsdom has no Web Audio and no canvas).
vi.mock('@/core/audio/playPitch', () => ({
  playPitch: vi.fn(),
  preloadPiano: vi.fn(() => Promise.resolve()),
}))
vi.mock('@/core/components/organisms/Staff', () => ({
  Staff: () => <div data-testid="staff" />,
}))

const { RunPhase } = await import('./RunPhase')
const { useDrillStore } = await import('@/drills/note-id/store')
const { useAppStore } = await import('@/app/store')
const { playPitch, preloadPiano } = await import('@/core/audio/playPitch')

const settings = {
  level: 1 as const, durationSec: 60, accidentals: true, naming: 'letters' as const,
  sound: true, keyLabels: true, lang: 'vi' as const, activityExpanded: false,
}

const renderRun = () =>
  render(<MemoryRouter initialEntries={['/train/note-id']}><RunPhase /></MemoryRouter>)

/** RunPhase listens on window, so keys go there rather than to an element. */
const pressKey = (init: KeyboardEventInit) => fireEvent.keyDown(window, init)

function count(id: 'run-correct' | 'run-wrong') {
  return screen.getByTestId(id).querySelector('[aria-hidden="true"]:not(svg)')!.textContent
}
function srText(id: 'run-correct' | 'run-wrong') {
  return screen.getByTestId(id).querySelector('.sr-only')!.textContent
}
/** The shortcut key for the right answer, and one for a wrong answer. */
function keys() {
  const q = useDrillStore.getState().question!
  const right = q.options[q.correctIndex].keyHint
  const wrong = q.options.find((_, i) => i !== q.correctIndex)!.keyHint
  return { right, wrong }
}

beforeEach(() => {
  vi.useFakeTimers()
  vi.mocked(playPitch).mockClear()
  vi.mocked(preloadPiano).mockClear()
  localStorage.clear()
  useAppStore.setState({ settings, pausedSession: null })
  useDrillStore.setState({ phase: 'setup' })
  useDrillStore.getState().start(1, settings, Date.now())
})
afterEach(() => {
  vi.useRealTimers()
})

describe('RunPhase header', () => {
  it('starts with zero right and zero wrong', () => {
    renderRun()
    expect(count('run-correct')).toBe('0')
    expect(count('run-wrong')).toBe('0')
  })

  it('counts a wrong answer in the red pill (regression: misses were never shown)', () => {
    renderRun()
    pressKey({ key: keys().wrong, code: `Key${keys().wrong.toUpperCase()}` })
    expect(count('run-wrong')).toBe('1')
    expect(count('run-correct')).toBe('0')
    expect(srText('run-wrong')).toBe('sai 1')
  })

  it('counts a right answer in the green pill', () => {
    renderRun()
    pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
    expect(count('run-correct')).toBe('1')
    expect(count('run-wrong')).toBe('0')
    expect(srText('run-correct')).toBe('đúng 1')
  })

  it('shows the streak only from three in a row', () => {
    renderRun()
    const answerRight = () => {
      pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
      act(() => { vi.advanceTimersByTime(2000) }) // feedback clears, next note
    }
    answerRight()
    answerRight()
    expect(screen.queryByText(/liên tiếp/)).toBeNull()
    answerRight()
    expect(screen.getByText('3 liên tiếp')).toBeInTheDocument()
  })
})

describe('RunPhase screen lock', () => {
  it('stops the page bouncing or pulling to refresh while running, and lets go after', () => {
    const { unmount } = renderRun()
    expect(document.documentElement.style.overscrollBehavior).toBe('none')
    unmount()
    expect(document.documentElement.style.overscrollBehavior).toBe('')
  })
})

describe('RunPhase input', () => {
  it('ignores auto-repeat, so a held key cannot answer the next note', () => {
    renderRun()
    const { right } = keys()
    pressKey({ key: right, code: `Key${right.toUpperCase()}`, repeat: true })
    expect(useDrillStore.getState().feedback).toBeNull()
    expect(count('run-correct')).toBe('0')
  })

  it('leaves browser shortcuts alone (Cmd/Ctrl + key)', () => {
    renderRun()
    const { right } = keys()
    pressKey({ key: right, code: `Key${right.toUpperCase()}`, metaKey: true })
    pressKey({ key: right, code: `Key${right.toUpperCase()}`, ctrlKey: true })
    expect(useDrillStore.getState().feedback).toBeNull()
  })

  it('takes one answer per note, ignoring keys pressed during feedback', () => {
    renderRun()
    const { right, wrong } = keys()
    pressKey({ key: right, code: `Key${right.toUpperCase()}` })
    pressKey({ key: wrong, code: `Key${wrong.toUpperCase()}` })
    expect(count('run-correct')).toBe('1')
    expect(count('run-wrong')).toBe('0')
  })

  it('plays the printed note on answer and preloads the piano on mount', () => {
    renderRun()
    expect(preloadPiano).toHaveBeenCalledTimes(1)
    const printed = useDrillStore.getState().question!.pitch
    pressKey({ key: keys().wrong, code: `Key${keys().wrong.toUpperCase()}` })
    expect(playPitch).toHaveBeenCalledWith(printed)
  })

  it('answers from a tap on the pad as well as from the keyboard', () => {
    renderRun()
    const q = useDrillStore.getState().question!
    const printed = q.pitch
    const wrong = q.options.find((_, i) => i !== q.correctIndex)!
    fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${wrong.label}${wrong.keyHint}?$`) }))
    expect(count('run-wrong')).toBe('1')
    expect(playPitch).toHaveBeenCalledWith(printed)
  })

  it('quits straight back to setup when nothing was answered', () => {
    renderRun()
    fireEvent.click(screen.getByRole('button', { name: translate('vi', 'run.quit') }))
    expect(useDrillStore.getState().phase).toBe('setup')
  })

  it('stays silent with sound off', () => {
    useDrillStore.getState().start(1, { ...settings, sound: false }, Date.now())
    renderRun()
    expect(preloadPiano).not.toHaveBeenCalled()
    pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
    expect(playPitch).not.toHaveBeenCalled()
  })
})

describe('RunPhase leaving mid-session', () => {
  const quitButton = () => screen.getByRole('button', { name: translate('vi', 'run.quit') })
  const answerOnce = () => {
    pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
    act(() => { vi.advanceTimersByTime(2000) })
  }
  // `hidden`: while the sheet is open the page behind it is hidden from assistive tech.
  const timer = () => screen.getByRole('banner', { hidden: true }).children[1].textContent

  it('pauses on ✕ once something was answered, and the clock stands still', () => {
    renderRun()
    answerOnce()
    fireEvent.click(quitButton())
    expect(screen.getByRole('dialog', { name: translate('vi', 'pause.title') })).toBeInTheDocument()
    const frozen = timer()
    act(() => { vi.advanceTimersByTime(5000) })
    expect(timer()).toBe(frozen)
  })

  it('ignores answer keys while paused', () => {
    renderRun()
    answerOnce()
    fireEvent.click(quitButton())
    pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
    expect(useDrillStore.getState().correct).toBe(1)
  })

  // Esc goes to the focused element, so the sheet sees it as well as the page.
  const pressEsc = () => fireEvent.keyDown(document.activeElement ?? document.body, { key: 'Escape' })

  it('pauses on Esc, and a second Esc resumes without pausing again', () => {
    renderRun()
    answerOnce()
    pressEsc()
    expect(useDrillStore.getState().pausedAt).not.toBeNull()
    pressEsc()
    expect(useDrillStore.getState().pausedAt).toBeNull()
  })

  it('shows a long session\'s time left as a clock (regression: "9 phút 40 giây" overflowed the sheet)', () => {
    useDrillStore.getState().start(1, { ...settings, durationSec: 600 }, Date.now())
    renderRun()
    answerOnce()
    fireEvent.click(quitButton())
    expect(screen.getByRole('dialog')).toHaveTextContent(/9:5\d/)
  })

  it('resumes from the sheet, or ends early with the session marked partial', () => {
    renderRun()
    answerOnce()
    fireEvent.click(quitButton())
    fireEvent.click(screen.getByRole('button', { name: translate('vi', 'pause.resume') }))
    expect(useDrillStore.getState().pausedAt).toBeNull()
    fireEvent.click(quitButton())
    fireEvent.click(screen.getByRole('button', { name: translate('vi', 'pause.end') }))
    expect(useDrillStore.getState().phase).toBe('finished')
    expect(useDrillStore.getState().lastResult?.partial).toBe(true)
  })

  it('pauses and welcomes the reader back when the page is hidden', () => {
    renderRun()
    const hidden = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true)
    act(() => { document.dispatchEvent(new Event('visibilitychange')) })
    hidden.mockRestore()
    expect(screen.getByRole('dialog', { name: translate('vi', 'away.title') })).toBeInTheDocument()
  })

  it('leaving the route pauses the session and tells home (regression: the clock ran out unseen and saved a full session)', () => {
    const { unmount } = renderRun()
    answerOnce()
    unmount()
    act(() => { vi.advanceTimersByTime(120_000) })
    const s = useDrillStore.getState()
    expect(s.phase).toBe('running')
    expect(s.pauseReason).toBe('away')
    expect(useAppStore.getState().pausedSession).toMatchObject({ to: '/train/note-id', correct: 1, wrong: 0 })
  })

  it('leaving the route before any answer simply drops the session', () => {
    const { unmount } = renderRun()
    unmount()
    act(() => { vi.advanceTimersByTime(0) })
    expect(useDrillStore.getState().phase).toBe('setup')
    expect(useAppStore.getState().pausedSession).toBeNull()
  })
})

describe('RunPhase key labels', () => {
  it("follows the session's names-on-keys setting", () => {
    const q = () => useDrillStore.getState().question!
    act(() => useDrillStore.getState().start(1, { ...settings, keyLabels: false }, Date.now()))
    renderRun()
    const label = q().options[0].label
    expect(screen.getByRole('button', { name: label })).not.toHaveTextContent(label)
  })
})
