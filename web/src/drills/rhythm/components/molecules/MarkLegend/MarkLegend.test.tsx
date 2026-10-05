import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MarkLegend } from './MarkLegend'
import { t } from '@/test/i18n'

describe('MarkLegend', () => {
  it('renders the three marks with their meaning', () => {
    render(<MarkLegend t={t} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByText('On time')).toBeInTheDocument()
  })
})
