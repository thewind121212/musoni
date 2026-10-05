import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LessonBlocks } from './LessonBlocks'
import { t } from '@/test/i18n'
import type { Block } from '@/core/lesson/types'

const blocks: Block[] = [
  { type: 'text', text: { vi: 'Nốt {G4}.', en: 'The note {G4}.' } },
  { type: 'staff', clef: 'treble', notes: 'G4', labels: 'names', highlight: [0] },
  { type: 'play', notes: 'G4', label: { vi: 'Nghe {G}', en: 'Hear {G}' } },
  { type: 'keys', notes: 'G4', caption: { vi: '{G} trên phím đàn:', en: '{G} on the keys:' } },
  { type: 'tip', text: { vi: 'Đếm từng dòng.', en: 'Count line by line.' } },
]

describe('LessonBlocks', () => {
  it('renders every block in the language and naming given', () => {
    render(<LessonBlocks blocks={blocks} lang="en" naming="letters" t={t} onPlay={() => {}} />)
    expect(screen.getByText(/The note/)).toHaveTextContent('The note G4.')
    expect(screen.getByText('Count line by line.')).toBeInTheDocument()
    expect(screen.getByTestId('note-staff')).toBeInTheDocument()
    // The keyboard's caption sits beside the play button, once.
    expect(screen.getAllByText(/on the keys/)).toHaveLength(1)
  })

  it('plays the block whose button is tapped', async () => {
    const onPlay = vi.fn()
    render(<LessonBlocks blocks={blocks} lang="vi" naming="solfege" t={t} onPlay={onPlay} />)
    await userEvent.click(screen.getByRole('button', { name: 'Nghe Sol' }))
    expect(onPlay).toHaveBeenCalledWith(blocks[2])
  })

  it('falls back to the plain listen label and shows a lone caption above its keys', () => {
    render(
      <LessonBlocks
        blocks={[{ type: 'play', notes: 'C4' }, { type: 'text', text: { vi: 'x', en: 'x' } }, { type: 'keys', notes: 'C4', caption: { vi: 'Phím', en: 'Keys' } }]}
        lang="en" naming="letters" t={t} onPlay={() => {}}
      />,
    )
    expect(screen.getByRole('button', { name: 'Listen' })).toBeInTheDocument()
    expect(screen.getByText('Keys')).toBeInTheDocument()
  })
})
