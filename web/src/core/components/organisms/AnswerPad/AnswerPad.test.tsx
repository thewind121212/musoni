import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnswerPad } from './AnswerPad'
import { buildOptions } from '@/core/music/pianoKeys'

const naturalsOnly = buildOptions('letters', false, '#')
const withSharps = buildOptions('letters', true, '#')

// A key's name is its label, plus its keyboard hint (one lowercase letter) while it can be pressed.
const keyNamed = (name: string) => screen.getByRole('button', { name: new RegExp(`^${name}[a-z]?$`) })
const labelOf = (el: Element) => el.textContent!.replace(/[a-z]$/, '')

describe('AnswerPad', () => {
  it('without accidentals, answers on seven white keys and draws the black keys as landmarks only', () => {
    render(<AnswerPad options={naturalsOnly} feedback={null} onAnswer={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(7)
    expect(screen.getByTestId('black-keys').children).toHaveLength(5)
    for (const landmark of screen.getByTestId('black-keys').children) {
      expect(landmark).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('with accidentals, lays the five black keys over the gaps of a real keyboard', () => {
    render(<AnswerPad options={withSharps} feedback={null} onAnswer={() => {}} />)
    expect(screen.getAllByRole('button')).toHaveLength(12)
    const black = [...screen.getByTestId('black-keys').children]
    expect(black.map(labelOf)).toEqual(['C#', 'D#', 'F#', 'G#', 'A#'])
    expect([...screen.getByTestId('white-keys').children].map(labelOf))
      .toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
    const leftOf = (label: string) =>
      parseFloat((black.find(k => labelOf(k) === label) as HTMLElement).style.left)
    // Gap where E meets F: F# sits two white keys right of D#, G# only one right of F#.
    expect(leftOf('D#') - leftOf('C#')).toBeCloseTo(100 / 7)
    expect(leftOf('F#') - leftOf('D#')).toBeCloseTo(200 / 7)
    expect(leftOf('G#') - leftOf('F#')).toBeCloseTo(100 / 7)
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

  it('in the box layout, hides the black keys without accidentals and sets them in the gaps with them', () => {
    const { unmount } = render(<AnswerPad options={naturalsOnly} feedback={null} onAnswer={() => {}} layout="boxes" />)
    expect(screen.getAllByRole('button')).toHaveLength(7)
    expect(screen.queryByTestId('black-keys')).toBeNull()
    unmount()
    render(<AnswerPad options={withSharps} feedback={null} onAnswer={() => {}} layout="boxes" />)
    const columnOf = (label: string) =>
      [...screen.getByTestId('black-keys').children]
        .find(k => labelOf(k) === label)!.getAttribute('style')
    // Gap after E: F# skips a column, so it starts at 8, not 6.
    expect(columnOf('D#')).toContain('grid-column-start: 4')
    expect(columnOf('F#')).toContain('grid-column-start: 8')
  })

  it('dots only the home key it is given', () => {
    render(<AnswerPad options={withSharps} feedback={null} onAnswer={() => {}} home={{ index: 4, label: 'home' }} />)
    expect(screen.getAllByTestId('home-dot')).toHaveLength(1)
    expect(screen.getByTestId('home-dot').closest('button')).toHaveTextContent(withSharps[4].label)
  })

  it('marks the selected key until the answer is in, then only the answer marks', () => {
    const { rerender } = render(<AnswerPad options={withSharps} feedback={null} onAnswer={() => {}} selected={2} />)
    const pressed = () => screen.getAllByRole('button').filter(b => b.getAttribute('aria-pressed') === 'true')
    expect(pressed()).toHaveLength(1)
    expect(labelOf(pressed()[0])).toBe(withSharps[2].label)
    rerender(<AnswerPad options={withSharps} feedback={{ correctIndex: 0, chosenIndex: 2 }} onAnswer={() => {}} selected={2} />)
    expect(pressed()).toHaveLength(0)
  })
})
