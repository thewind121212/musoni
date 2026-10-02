import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/core/components/organisms/Staff', () => ({ Staff: () => <div data-testid="staff" /> }))
const { ListenStage } = await import('./ListenStage')

const C4 = { letter: 'C', accidental: '', octave: 4 } as const
const stage = (props: Partial<Parameters<typeof ListenStage>[0]> = {}) => (
  <ListenStage pitch={C4} revealed={false} listening={false} tone="neutral" chosen={null} prompt="Play it" {...props} />
)

describe('ListenStage', () => {
  it('hides the note until it is answered, and asks for it', () => {
    const { rerender } = render(stage())
    expect(screen.getByText('Play it')).toBeInTheDocument()
    expect(screen.getByTestId('staff').parentElement!.parentElement).toHaveClass('invisible')
    rerender(stage({ revealed: true }))
    expect(screen.queryByText('Play it')).toBeNull()
    expect(screen.getByTestId('staff').parentElement!.parentElement).not.toHaveClass('invisible')
  })

  it('pulses only while sound plays', () => {
    const { rerender } = render(stage())
    expect(screen.getByTestId('ear')).not.toHaveAttribute('data-listening')
    rerender(stage({ listening: true }))
    expect(screen.getByTestId('ear')).toHaveAttribute('data-listening')
  })
})
