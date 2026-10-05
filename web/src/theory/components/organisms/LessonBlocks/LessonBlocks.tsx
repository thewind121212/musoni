import { useMemo, type ReactNode } from 'react'
import type { Naming, Pitch } from '@/core/music/types'
import type { Lang } from '@/core/i18n/translate'
import type { Translate } from '@/core/i18n/translate'
import { parseNotation } from '@/core/music/notation'
import { MiniKeyboard } from '@/core/components/atoms'
import { NoteStaff, type StaffTone } from '@/core/components/organisms'
import { RichText, TipBox } from '../../atoms'
import { PlayButton } from '../../molecules'
import { keyLabels, keysLayout, staffLabels, staffWidth } from '@/theory/blocks'
import type { Block, KeysBlock, PlayBlock, StaffBlock } from '@/theory/types'

interface Props {
  blocks: readonly Block[]
  lang: Lang
  naming: Naming
  t: Translate
  onPlay: (block: PlayBlock) => void
  /** The play block sounding now. */
  playing?: PlayBlock | null
  /** An answered check: notes turn green. */
  tone?: StaffTone
  /** A wrong pick on the pad, drawn beside a lone note. */
  chosen?: Pitch | null
}

/** Key length against key width, by octaves drawn: one octave reads as a short strip. */
const KEY_LENGTH: Record<number, number> = { 1: 17, 2: 24, 3: 30, 4: 34 }
/** How much larger than its notation units a staff may draw, so one note does not fill a desktop. */
const STAFF_MAX_SCALE = 1.7

function Staff({ block, naming, tone, chosen }: { block: StaffBlock; naming: Naming; tone?: StaffTone; chosen?: Pitch | null }) {
  const events = useMemo(() => parseNotation(block.notes), [block.notes])
  const labels = useMemo(() => staffLabels(block, events, naming), [block, events, naming])
  const width = staffWidth(block, events)
  return (
    <div className="mx-auto w-full" style={{ maxWidth: width * STAFF_MAX_SCALE }}>
      <NoteStaff
        clef={block.clef} events={events} keySignature={block.key} time={block.time}
        labels={labels} highlight={block.highlight} tone={tone} chosen={chosen} width={width}
      />
    </div>
  )
}

function Keys({ block, naming }: { block: KeysBlock; naming: Naming }) {
  const { octaves, lit } = useMemo(() => keysLayout(block), [block])
  return (
    <MiniKeyboard
      lit={lit} octaves={octaves} mark="fill" keyLength={KEY_LENGTH[octaves]}
      labels={keyLabels(block, naming)} className="mx-auto w-full max-w-md"
    />
  )
}

/**
 * A step's content, block by block: text, the staff (core NoteStaff), the
 * "Nghe" button, the keyboard and the tip. A play button followed by a
 * keyboard with a caption share a row, the caption beside the button, as in
 * "▶ Nghe Sol   Sol trên phím đàn:".
 */
export function LessonBlocks({ blocks, lang, naming, t, onPlay, playing = null, tone, chosen }: Props) {
  const text = (s: { vi: string; en: string }) => <RichText text={s[lang]} naming={naming} />
  const out: ReactNode[] = []
  blocks.forEach((block, i) => {
    switch (block.type) {
      case 'text':
        out.push(<p key={i} className="text-base leading-relaxed text-ink-soft md:text-lg">{text(block.text)}</p>)
        break
      case 'tip':
        out.push(<TipBox key={i}>{text(block.text)}</TipBox>)
        break
      case 'staff':
        out.push(<Staff key={i} block={block} naming={naming} tone={tone} chosen={chosen} />)
        break
      case 'play': {
        const after = blocks[i + 1]
        const caption = after?.type === 'keys' && after.caption ? after.caption : null
        out.push(
          <div key={i} className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <PlayButton onPlay={() => onPlay(block)} playing={playing === block}>
              {block.label ? text(block.label) : t('theory.listen')}
            </PlayButton>
            {caption && <span className="text-sm text-ink-faint">{text(caption)}</span>}
          </div>,
        )
        break
      }
      case 'keys': {
        const before = blocks[i - 1]
        const captionShown = before?.type === 'play'
        out.push(
          <div key={i} className="flex flex-col gap-2">
            {block.caption && !captionShown && <span className="text-sm text-ink-faint">{text(block.caption)}</span>}
            <Keys block={block} naming={naming} />
          </div>,
        )
        break
      }
    }
  })
  return <>{out}</>
}
