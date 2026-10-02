import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
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
  sound: true, lang: 'vi' as const, activityExpanded: false,
}

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
  useAppStore.setState({ settings })
  useDrillStore.getState().start(1, settings, Date.now())
})
afterEach(() => {
  vi.useRealTimers()
})

describe('RunPhase header', () => {
  it('starts with zero right and zero wrong', () => {
    render(<RunPhase />)
    expect(count('run-correct')).toBe('0')
    expect(count('run-wrong')).toBe('0')
  })

  it('counts a wrong answer in the red pill (regression: misses were never shown)', () => {
    render(<RunPhase />)
    pressKey({ key: keys().wrong, code: `Key${keys().wrong.toUpperCase()}` })
    expect(count('run-wrong')).toBe('1')
    expect(count('run-correct')).toBe('0')
    expect(srText('run-wrong')).toBe('sai 1')
  })

  it('counts a right answer in the green pill', () => {
    render(<RunPhase />)
    pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
    expect(count('run-correct')).toBe('1')
    expect(count('run-wrong')).toBe('0')
    expect(srText('run-correct')).toBe('đúng 1')
  })

  it('shows the streak only from three in a row', () => {
    render(<RunPhase />)
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

describe('RunPhase input', () => {
  it('ignores auto-repeat, so a held key cannot answer the next note', () => {
    render(<RunPhase />)
    const { right } = keys()
    pressKey({ key: right, code: `Key${right.toUpperCase()}`, repeat: true })
    expect(useDrillStore.getState().feedback).toBeNull()
    expect(count('run-correct')).toBe('0')
  })

  it('leaves browser shortcuts alone (Cmd/Ctrl + key)', () => {
    render(<RunPhase />)
    const { right } = keys()
    pressKey({ key: right, code: `Key${right.toUpperCase()}`, metaKey: true })
    pressKey({ key: right, code: `Key${right.toUpperCase()}`, ctrlKey: true })
    expect(useDrillStore.getState().feedback).toBeNull()
  })

  it('takes one answer per note, ignoring keys pressed during feedback', () => {
    render(<RunPhase />)
    const { right, wrong } = keys()
    pressKey({ key: right, code: `Key${right.toUpperCase()}` })
    pressKey({ key: wrong, code: `Key${wrong.toUpperCase()}` })
    expect(count('run-correct')).toBe('1')
    expect(count('run-wrong')).toBe('0')
  })

  it('plays the printed note on answer and preloads the piano on mount', () => {
    render(<RunPhase />)
    expect(preloadPiano).toHaveBeenCalledTimes(1)
    const printed = useDrillStore.getState().question!.pitch
    pressKey({ key: keys().wrong, code: `Key${keys().wrong.toUpperCase()}` })
    expect(playPitch).toHaveBeenCalledWith(printed)
  })

  it('answers from a tap on the pad as well as from the keyboard', () => {
    render(<RunPhase />)
    const q = useDrillStore.getState().question!
    const printed = q.pitch
    const wrong = q.options.find((_, i) => i !== q.correctIndex)!
    fireEvent.click(screen.getByRole('button', { name: new RegExp(`^${wrong.label}${wrong.keyHint}?$`) }))
    expect(count('run-wrong')).toBe('1')
    expect(playPitch).toHaveBeenCalledWith(printed)
  })

  it('quits back to setup', () => {
    render(<RunPhase />)
    fireEvent.click(screen.getByRole('button', { name: translate('vi', 'run.quit') }))
    expect(useDrillStore.getState().phase).toBe('setup')
  })

  it('stays silent with sound off', () => {
    useDrillStore.getState().start(1, { ...settings, sound: false }, Date.now())
    render(<RunPhase />)
    expect(preloadPiano).not.toHaveBeenCalled()
    pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
    expect(playPitch).not.toHaveBeenCalled()
  })
})
