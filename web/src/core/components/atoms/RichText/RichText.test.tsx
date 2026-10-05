import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RichText } from './RichText'

describe('RichText', () => {
  it('prints note names in the naming given and bolds terms', () => {
    const { container, rerender } = render(<p><RichText text="**Khóa Sol** marks {G4}." naming="solfege" /></p>)
    expect(container.textContent).toBe('Khóa Sol marks Sol4.')
    expect(screen.getByText('Khóa Sol').tagName).toBe('STRONG')
    rerender(<p><RichText text="**Khóa Sol** marks {G4}." naming="letters" /></p>)
    expect(container.textContent).toBe('Khóa Sol marks G4.')
  })
})
