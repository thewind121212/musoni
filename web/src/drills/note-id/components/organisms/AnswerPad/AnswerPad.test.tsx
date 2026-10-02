import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnswerPad } from './AnswerPad'
import { buildOptions } from '@/drills/note-id/generator'

const naturalsOnly = buildOptions('letters', false, '#')
const withSharps = buildOptions('letters', true, '#')

// A key's name is its label, plus its keyboard hint (one lowercase letter) while it can be pressed.
const keyNamed = (name: string) => screen.getByRole('button', { name: new RegExp(`^${name}[a-z]?$`) })
const labelOf = (el: Element) => el.textContent!.replace(/[a-z]$/, '')
const rows = (container: HTMLElement) => container.firstElementChild!.children

describe('AnswerPad', () => {
  it('renders the seven white keys alone when accidentals are off', () => {
    const { container } = render(<AnswerPad options={naturalsOnly} feedback={null} onAnswer={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(7)
    expect(rows(container)).toHaveLength(1)
  })

  it('puts black keys in a row above, in the gaps of a real keyboard', () => {
    const { container } = render(<AnswerPad options={withSharps} feedback={null} onAnswer={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(12)
    const [blackRow, whiteRow] = rows(container)
    expect([...blackRow.children].map(labelOf)).toEqual(['C#', 'D#', 'F#', 'G#', 'A#'])
    // Gap after E: F# skips a column, so it starts at 8, not 6.
    const columnOf = (label: string) =>
      [...blackRow.children].find(k => labelOf(k) === label)!.getAttribute('style')
    expect(columnOf('C#')).toContain('grid-column-start: 2')
    expect(columnOf('D#')).toContain('grid-column-start: 4')
    expect(columnOf('F#')).toContain('grid-column-start: 8')
    expect(columnOf('A#')).toContain('grid-column-start: 12')
    expect([...whiteRow.children].map(labelOf)).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
  })

  it("reports the option's index in the full list, not its place within its row", async () => {
    // The rows are filtered views; the store answers by index into `options`.
    const onAnswer = vi.fn()
    render(<AnswerPad options={withSharps} feedback={null} onAnswer={onAnswer} />)
    await userEvent.click(keyNamed('F#'))
    expect(onAnswer).toHaveBeenLastCalledWith(withSharps.findIndex(o => o.label === 'F#'))
    await userEvent.click(keyNamed('E'))
    expect(onAnswer).toHaveBeenLastCalledWith(withSharps.findIndex(o => o.label === 'E'))
  })

  it('on a miss, marks the right key green and the pick red, and locks the pad', async () => {
    const onAnswer = vi.fn()
    const correctIndex = withSharps.findIndex(o => o.label === 'D')
    const chosenIndex = withSharps.findIndex(o => o.label === 'C#')
    render(<AnswerPad options={withSharps} feedback={{ correctIndex, chosenIndex }} onAnswer={onAnswer} />)
    expect(keyNamed('D')).toHaveClass('bg-correct')
    expect(keyNamed('C#')).toHaveClass('bg-wrong')
    expect(keyNamed('E')).not.toHaveClass('bg-correct')
    expect(keyNamed('E')).not.toHaveClass('bg-wrong')
    for (const button of screen.getAllByRole('button')) expect(button).toBeDisabled()
    await userEvent.click(keyNamed('E'))
    expect(onAnswer).not.toHaveBeenCalled()
  })

  it('on a hit, marks only the right key', () => {
    const index = withSharps.findIndex(o => o.label === 'G')
    render(<AnswerPad options={withSharps} feedback={{ correctIndex: index, chosenIndex: index }} onAnswer={() => {}} />)
    expect(keyNamed('G')).toHaveClass('bg-correct')
    expect(document.querySelectorAll('.bg-wrong')).toHaveLength(0)
  })

  it('with labels off, leaves unmarked keys bare and names only the marked ones', () => {
    const correctIndex = withSharps.findIndex(o => o.label === 'D')
    const chosenIndex = withSharps.findIndex(o => o.label === 'E')
    render(
      <AnswerPad options={withSharps} feedback={{ correctIndex, chosenIndex }} onAnswer={() => {}} showLabels={false} />,
    )
    const shown = screen.getAllByRole('button').map(b => b.textContent).filter(Boolean)
    expect(shown).toEqual(['D', 'E'])
  })
})
