import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PianoKey, type KeyMark } from './PianoKey'

const key = (props: Partial<Parameters<typeof PianoKey>[0]> = {}) => (
  <PianoKey
    label="C" keyHint="a" row="natural" mark="none" disabled={false}
    onPress={() => {}} className="" {...props}
  />
)

describe('PianoKey', () => {
  it('renders an idle key with its keyboard hint', () => {
    render(key())
    expect(screen.getByRole('button')).toHaveTextContent('Ca')
    expect(screen.getByRole('button').querySelector('svg')).toBeNull()
  })

  it('reports a press', async () => {
    const onPress = vi.fn()
    render(key({ onPress }))
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('locks during feedback: no press, no hint', async () => {
    const onPress = vi.fn()
    render(key({ onPress, disabled: true }))
    await userEvent.click(screen.getByRole('button'))
    expect(onPress).not.toHaveBeenCalled()
    expect(screen.getByRole('button')).toHaveTextContent(/^C$/)
  })

  it.each<[KeyMark, string]>([['correct', 'bg-correct'], ['wrong', 'bg-wrong']])(
    'marks a %s key with its colour and an icon',
    (mark, colour) => {
      render(key({ mark, disabled: true }))
      expect(screen.getByRole('button')).toHaveClass(colour)
      expect(screen.getByRole('button').querySelector('svg')).not.toBeNull()
    },
  )

  it('gives the two marks different icons', () => {
    const { rerender } = render(key({ mark: 'correct', disabled: true }))
    const correct = screen.getByRole('button').querySelector('svg')!.innerHTML
    rerender(key({ mark: 'wrong', disabled: true }))
    expect(screen.getByRole('button').querySelector('svg')!.innerHTML).not.toBe(correct)
  })

  it('draws black keys dark and white keys light when unmarked', () => {
    const { rerender } = render(key({ row: 'accidental' }))
    expect(screen.getByRole('button')).toHaveClass('bg-ink')
    rerender(key({ row: 'natural' }))
    expect(screen.getByRole('button')).toHaveClass('bg-raised')
  })

  it('hides the note name when labels are off, but keeps it as the accessible name', () => {
    render(key({ showLabel: false }))
    expect(screen.getByRole('button', { name: 'C' })).toHaveTextContent(/^a$/)
  })

  it.each<KeyMark>(['correct', 'wrong'])('reveals a hidden name once the key is marked %s', mark => {
    render(key({ showLabel: false, mark, disabled: true }))
    expect(screen.getByRole('button')).toHaveTextContent(/^C$/)
  })

  it('dots the home note and names it after the note for screen readers', () => {
    const { rerender } = render(key())
    expect(screen.queryByTestId('home-dot')).toBeNull()
    rerender(key({ homeLabel: 'home note' }))
    expect(screen.getByTestId('home-dot')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAccessibleName('C, home notea')
  })

  it('marks a pick waiting for a second tap as pressed, without naming a bare key', () => {
    const { rerender } = render(key({ mark: 'selected', showLabel: false }))
    expect(screen.getByRole('button', { name: 'C' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button')).not.toHaveTextContent('C')
    rerender(key())
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed')
  })
})
