import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { NoteStaffProps } from '@/core/components/organisms'

// The real NoteStaff draws; the spy records what it was asked to draw.
const noteStaff = vi.fn()
vi.mock('@/core/components/organisms', async importActual => {
  const { NoteStaff } = await importActual<typeof import('@/core/components/organisms')>()
  return { NoteStaff: (p: NoteStaffProps) => { noteStaff(p); return <NoteStaff {...p} /> } }
})
const { SignatureStaff } = await import('./SignatureStaff')

describe('SignatureStaff', () => {
  it('draws the signature as its major key, with no notes, on the clef asked', () => {
    render(<SignatureStaff fifths={-7} clef="bass" width={170} />)
    expect(screen.getByTestId('note-staff')).toBeInTheDocument()
    expect(noteStaff).toHaveBeenLastCalledWith(expect.objectContaining({ clef: 'bass', keySignature: 'Cb', events: [], width: 170 }))
  })

  it('draws as many sharps or flats as the signature has, on either clef', () => {
    for (const clef of ['treble', 'bass'] as const) {
      for (let fifths = -7; fifths <= 7; fifths++) {
        const { unmount } = render(<SignatureStaff fifths={fifths} clef={clef} width={170} />)
        const signature = screen.getByTestId('note-staff').querySelector('.vf-keysignature')
        expect(signature?.children, `${fifths} on ${clef}`).toHaveLength(Math.abs(fifths))
        unmount()
      }
    }
  })

  it('keeps the same empty note list between signatures, so only the signature redraws', () => {
    const { rerender } = render(<SignatureStaff fifths={3} clef="treble" width={170} />)
    const first = noteStaff.mock.lastCall![0].events
    rerender(<SignatureStaff fifths={-2} clef="treble" width={170} />)
    expect(noteStaff.mock.lastCall![0]).toMatchObject({ keySignature: 'Bb' })
    expect(noteStaff.mock.lastCall![0].events).toBe(first)
  })
})
