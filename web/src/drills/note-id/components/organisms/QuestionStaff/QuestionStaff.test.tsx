import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { Pitch } from '@/core/music/types'

// VexFlow drawing is covered by Staff's own tests; here only what reaches it matters.
vi.mock('@/core/components/organisms/Staff', () => ({
  Staff: (p: { clef: string; pitch: Pitch; tone: string; chosen: Pitch | null }) => (
    <div data-testid="staff">
      {p.clef} {p.pitch.letter}{p.pitch.accidental}{p.pitch.octave} {p.tone} {p.chosen ? p.chosen.letter : '-'}
    </div>
  ),
}))

const { QuestionStaff } = await import('./QuestionStaff')

describe('QuestionStaff', () => {
  it('hands the note, clef, tone and wrong pick to the staff', () => {
    render(
      <QuestionStaff
        clef="bass" pitch={{ letter: 'F', accidental: '#', octave: 2 }}
        tone="wrong" chosen={{ letter: 'G', accidental: '', octave: 2 }}
      />,
    )
    expect(screen.getByTestId('staff')).toHaveTextContent('bass F#2 wrong G')
  })

  it('renders with no wrong pick', () => {
    render(<QuestionStaff clef="treble" pitch={{ letter: 'C', accidental: '', octave: 4 }} tone="neutral" chosen={null} />)
    expect(screen.getByTestId('staff')).toHaveTextContent('treble C4 neutral -')
  })
})
