import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FieldLegend } from './FieldLegend'

describe('FieldLegend', () => {
  it('names the fieldset it heads', () => {
    render(
      <fieldset>
        <FieldLegend icon={<svg />} label="Clef" description="Which staff the notes sit on" />
      </fieldset>,
    )
    expect(screen.getByRole('group', { name: /Clef/ })).toBeInTheDocument()
    expect(screen.getByText('Which staff the notes sit on')).toBeInTheDocument()
  })
})
