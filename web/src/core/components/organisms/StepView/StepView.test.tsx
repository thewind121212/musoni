import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StepView } from './StepView'
import { padFor } from '@/core/lesson/blocks'
import { t } from '@/test/i18n'
import type { CheckStep, Step } from '@/core/lesson/types'

const L = (vi: string, en = vi) => ({ vi, en })
const keyCheck: CheckStep = {
  kind: 'check', prompt: L('Nốt này là nốt gì?', 'What is this note?'),
  blocks: [{ type: 'staff', clef: 'treble', notes: 'E4' }],
  answer: { type: 'key', note: 'E' }, reason: L('Dòng 1 là {E4}.', 'Line 1 is {E4}.'),
}
const choiceCheck: CheckStep = {
  kind: 'check', prompt: L('Đâu?', 'Where?'),
  answer: { type: 'choice', choices: [{ text: L('Khe 2', 'Space 2'), correct: true }, { text: L('Dòng 2', 'Line 2') }] },
  reason: L('Vì vậy.', 'Because.'),
}
const keyNamed = (name: string) => screen.getByRole('button', { name: new RegExp(`^${name}[a-z]?$`) })
const props = { eyebrow: 'Try it', lang: 'en' as const, naming: 'letters' as const, t, onPlay: () => {}, padLabels: true, padLayout: 'piano' as const }

describe('StepView', () => {
  it('renders an explain step: eyebrow, title and blocks', () => {
    const step: Step = { kind: 'explain', title: L('Khóa Sol', 'Treble clef'), blocks: [{ type: 'text', text: L('x', 'Circles line 2.') }] }
    render(<StepView step={step} {...props} eyebrow="Lesson 1.2" answer={null} onAnswer={() => {}} />)
    expect(screen.getByRole('heading', { name: 'Treble clef' })).toBeInTheDocument()
    expect(screen.getByText('Circles line 2.')).toBeInTheDocument()
  })

  it('answers a key check on the pad and reports whether it was right', async () => {
    const onAnswer = vi.fn()
    render(<StepView step={keyCheck} {...props} answer={null} onAnswer={onAnswer} />)
    await userEvent.click(keyNamed('F'))
    expect(onAnswer).toHaveBeenLastCalledWith(3, false)
    await userEvent.click(keyNamed('E'))
    expect(onAnswer).toHaveBeenLastCalledWith(2, true)
  })

  it('names the right note after a miss and gives the reason', () => {
    render(<StepView step={keyCheck} {...props} answer={{ choice: 3, correct: false }} onAnswer={() => {}} />)
    expect(screen.getByRole('status')).toHaveTextContent('Not quite: it is ELine 1 is E4.')
  })

  it('answers a choice check and locks it', async () => {
    const onAnswer = vi.fn()
    const { rerender } = render(<StepView step={choiceCheck} {...props} answer={null} onAnswer={onAnswer} />)
    await userEvent.click(screen.getByRole('button', { name: 'Space 2' }))
    expect(onAnswer).toHaveBeenCalledWith(0, true)
    rerender(<StepView step={choiceCheck} {...props} answer={{ choice: 0, correct: true }} onAnswer={onAnswer} />)
    expect(screen.getByRole('status')).toHaveTextContent('RightBecause.')
    expect(screen.getByRole('button', { name: 'Line 2' })).toBeDisabled()
  })

  it('hides the names on the pad when the check asks where a key is', () => {
    render(<StepView step={{ ...keyCheck, answer: { type: 'key', note: 'F', labels: false } }} {...props} answer={null} onAnswer={() => {}} />)
    // The keys keep their names for screen readers but print none.
    expect(keyNamed('F')).not.toHaveTextContent(/^F/)
  })
})

describe('padFor', () => {
  it('adds black keys spelled like the answer when it has an accidental', () => {
    const flat = padFor({ type: 'key', note: 'Bb' }, 'solfege')
    expect(flat.options).toHaveLength(12)
    expect(flat.options[flat.correctIndex].label).toBe('Sib')
    const natural = padFor({ type: 'key', note: 'G' }, 'letters')
    expect(natural.options).toHaveLength(7)
    expect(natural.options[natural.correctIndex].label).toBe('G')
  })
})
