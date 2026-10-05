import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageToggle } from './LanguageToggle'

describe('LanguageToggle', () => {
  it('shows the current language and asks for the next one', async () => {
    const onChange = vi.fn()
    render(<LanguageToggle lang="vi" onChange={onChange} />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('VI')
    await userEvent.click(button)
    expect(onChange).toHaveBeenCalledWith('en')
  })

  it('wraps from the last language back to the first', async () => {
    const onChange = vi.fn()
    render(<LanguageToggle lang="en" onChange={onChange} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith('vi')
  })

  it('is named in the language it switches to', () => {
    const { rerender } = render(<LanguageToggle lang="vi" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument()
    rerender(<LanguageToggle lang="en" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Tiếng Việt' })).toBeInTheDocument()
  })
})
