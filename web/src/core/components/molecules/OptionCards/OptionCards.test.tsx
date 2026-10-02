import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { OptionCards, type Option } from './OptionCards'

const options: Option<'letters' | 'solfege'>[] = [
  { value: 'letters', label: 'Letters', hint: 'C D E', visual: <span>CDE</span> },
  { value: 'solfege', label: 'Solfège', visual: <span>DoReMi</span> },
]

const setup = (value: 'letters' | 'solfege' = 'letters', onChange = vi.fn()) => {
  render(
    <OptionCards
      label="Note names" description="How answers are written" icon={<svg />}
      options={options} value={value} onChange={onChange}
    />,
  )
  return onChange
}

describe('OptionCards', () => {
  it('renders one radio per option inside a named group', () => {
    setup()
    expect(screen.getByRole('group', { name: /Note names/ })).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(2)
  })

  it('checks only the selected option', () => {
    setup('solfege')
    expect(screen.getByRole('radio', { name: /Solfège/ })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: /Letters/ })).toHaveAttribute('aria-checked', 'false')
  })

  it('reports the value of the option tapped', async () => {
    const onChange = setup('letters')
    await userEvent.click(screen.getByRole('radio', { name: /Solfège/ }))
    expect(onChange).toHaveBeenCalledWith('solfege')
  })

  it('shows a hint only for options that have one', () => {
    setup()
    expect(screen.getByRole('radio', { name: /Letters/ })).toHaveTextContent('C D E')
    expect(screen.getByRole('radio', { name: /Solfège/ }).textContent).toBe('DoReMiSolfège')
  })

  it('works with boolean values', async () => {
    const onChange = vi.fn()
    render(
      <OptionCards
        label="Sound" description="" icon={null} value={false} onChange={onChange}
        options={[{ value: true, label: 'On', visual: null }, { value: false, label: 'Off', visual: null }]}
      />,
    )
    expect(screen.getByRole('radio', { name: 'Off' })).toHaveAttribute('aria-checked', 'true')
    await userEvent.click(screen.getByRole('radio', { name: 'On' }))
    expect(onChange).toHaveBeenCalledWith(true)
  })
})
