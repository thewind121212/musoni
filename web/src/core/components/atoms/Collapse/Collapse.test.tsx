import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Collapse } from './Collapse'

describe('Collapse', () => {
  it('renders its content only while open, and removes it after folding shut', async () => {
    const { rerender } = render(<Collapse open={false} id="c"><button>inside</button></Collapse>)
    expect(screen.queryByRole('button', { name: 'inside' })).toBeNull()
    rerender(<Collapse open id="c"><button>inside</button></Collapse>)
    expect(screen.getByRole('button', { name: 'inside' }).parentElement).toHaveAttribute('id', 'c')
    rerender(<Collapse open={false} id="c"><button>inside</button></Collapse>)
    await waitFor(() => expect(screen.queryByRole('button', { name: 'inside' })).toBeNull())
  })
})
