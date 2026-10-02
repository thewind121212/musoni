import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DrillLoading } from './DrillLoading'
import { resetStores } from '@/test/fixtures'

describe('DrillLoading', () => {
  it('renders in the chosen language', () => {
    resetStores({ lang: 'en' })
    render(<DrillLoading />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading')
  })
})
