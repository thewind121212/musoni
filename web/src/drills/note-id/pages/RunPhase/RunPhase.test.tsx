import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { act } from 'react'
import { render, pressKey, type Rendered } from '@/test/render'

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

let view: Rendered | null = null

function count(id: 'run-correct' | 'run-wrong') {
  const pill = view!.container.querySelector(`[data-testid="${id}"]`)!
  return pill.querySelector('[aria-hidden="true"]:not(svg)')!.textContent
}
function srText(id: 'run-correct' | 'run-wrong') {
  return view!.container.querySelector(`[data-testid="${id}"] .sr-only`)!.textContent
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
  view?.unmount()
  view = null
  vi.useRealTimers()
})

describe('RunPhase header', () => {
  it('starts with zero right and zero wrong', () => {
    view = render(<RunPhase />)
    expect(count('run-correct')).toBe('0')
    expect(count('run-wrong')).toBe('0')
  })

  it('counts a wrong answer in the red pill (regression: misses were never shown)', () => {
    view = render(<RunPhase />)
    pressKey({ key: keys().wrong, code: `Key${keys().wrong.toUpperCase()}` })
    expect(count('run-wrong')).toBe('1')
    expect(count('run-correct')).toBe('0')
    expect(srText('run-wrong')).toBe('sai 1')
  })

  it('counts a right answer in the green pill', () => {
    view = render(<RunPhase />)
    pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
    expect(count('run-correct')).toBe('1')
    expect(count('run-wrong')).toBe('0')
    expect(srText('run-correct')).toBe('đúng 1')
  })

  it('shows the streak only from three in a row', () => {
    view = render(<RunPhase />)
    const answerRight = () => {
      pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
      act(() => { vi.advanceTimersByTime(2000) }) // feedback clears, next note
    }
    answerRight()
    answerRight()
    expect(view.container.textContent).not.toContain('liên tiếp')
    answerRight()
    expect(view.container.textContent).toContain('3 liên tiếp')
  })
})

describe('RunPhase keyboard guards', () => {
  it('ignores auto-repeat, so a held key cannot answer the next note', () => {
    view = render(<RunPhase />)
    const { right } = keys()
    pressKey({ key: right, code: `Key${right.toUpperCase()}`, repeat: true })
    expect(useDrillStore.getState().feedback).toBeNull()
    expect(count('run-correct')).toBe('0')
  })

  it('leaves browser shortcuts alone (Cmd/Ctrl + key)', () => {
    view = render(<RunPhase />)
    const { right } = keys()
    pressKey({ key: right, code: `Key${right.toUpperCase()}`, metaKey: true })
    pressKey({ key: right, code: `Key${right.toUpperCase()}`, ctrlKey: true })
    expect(useDrillStore.getState().feedback).toBeNull()
  })

  it('takes one answer per note, ignoring keys pressed during feedback', () => {
    view = render(<RunPhase />)
    const { right, wrong } = keys()
    pressKey({ key: right, code: `Key${right.toUpperCase()}` })
    pressKey({ key: wrong, code: `Key${wrong.toUpperCase()}` })
    expect(count('run-correct')).toBe('1')
    expect(count('run-wrong')).toBe('0')
  })

  it('plays the printed note on answer and preloads the piano on mount', () => {
    view = render(<RunPhase />)
    expect(preloadPiano).toHaveBeenCalledTimes(1)
    const printed = useDrillStore.getState().question!.pitch
    pressKey({ key: keys().wrong, code: `Key${keys().wrong.toUpperCase()}` })
    expect(playPitch).toHaveBeenCalledWith(printed)
  })

  it('stays silent with sound off', () => {
    useDrillStore.getState().start(1, { ...settings, sound: false }, Date.now())
    view = render(<RunPhase />)
    expect(preloadPiano).not.toHaveBeenCalled()
    pressKey({ key: keys().right, code: `Key${keys().right.toUpperCase()}` })
    expect(playPitch).not.toHaveBeenCalled()
  })
})
