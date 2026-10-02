import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SettingRow } from './SettingRow'

describe('SettingRow', () => {
  it('renders the label and its control', () => {
    render(<SettingRow label="Sound"><button>toggle</button></SettingRow>)
    expect(screen.getByText('Sound')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'toggle' })).toBeInTheDocument()
  })

  it('shows a hint only when given one', () => {
    const { rerender } = render(<SettingRow label="Sound"><span /></SettingRow>)
    expect(screen.queryByText('Hear each answer')).toBeNull()
    rerender(<SettingRow label="Sound" hint="Hear each answer"><span /></SettingRow>)
    expect(screen.getByText('Hear each answer')).toBeInTheDocument()
  })
})
