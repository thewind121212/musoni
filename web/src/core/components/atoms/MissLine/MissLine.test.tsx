import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MissLine } from './MissLine'

describe('MissLine', () => {
  it('announces the sentence it is given', () => {
    render(<MissLine text="That was G, you picked A" />)
    expect(screen.getByRole('status')).toHaveTextContent('That was G, you picked A')
  })
})
