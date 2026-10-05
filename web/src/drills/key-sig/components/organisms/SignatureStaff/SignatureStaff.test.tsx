import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

const noteStaff = vi.fn((_props: Record<string, unknown>) => <div data-testid="note-staff" />)
vi.mock('@/core/components/organisms', () => ({ NoteStaff: (p: Record<string, unknown>) => noteStaff(p) }))
const { SignatureStaff } = await import('./SignatureStaff')

describe('SignatureStaff', () => {
  it('draws the signature as its major key, with no notes, on the clef asked', () => {
    render(<SignatureStaff fifths={-7} clef="bass" width={170} />)
    expect(screen.getByTestId('note-staff')).toBeInTheDocument()
    expect(noteStaff).toHaveBeenLastCalledWith(expect.objectContaining({ clef: 'bass', keySignature: 'Cb', events: [], width: 170 }))
  })

  it('keeps the same empty note list between signatures, so only the signature redraws', () => {
    const { rerender } = render(<SignatureStaff fifths={3} clef="treble" width={170} />)
    const first = noteStaff.mock.lastCall![0].events
    rerender(<SignatureStaff fifths={-2} clef="treble" width={170} />)
    expect(noteStaff.mock.lastCall![0]).toMatchObject({ keySignature: 'Bb' })
    expect(noteStaff.mock.lastCall![0].events).toBe(first)
  })
})
