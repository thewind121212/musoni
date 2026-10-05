import { useMemo } from 'react'
import type { Naming } from '@/core/music/types'
import { parseText, pitchLabel } from '@/core/lesson/text'

interface Props {
  /** Lesson text: `**bold**` and pitch tokens (`{G4}`). */
  text: string
  naming: Naming
}

/**
 * Lesson text with its note names printed in the reader's naming. Bold marks
 * a term's first use; note names are a little heavier than the words round
 * them, so they read as names.
 */
export function RichText({ text, naming }: Props) {
  const segments = useMemo(() => parseText(text), [text])
  return (
    <>
      {segments.map((s, i) => {
        if (s.kind === 'pitch') {
          return <span key={i} className="font-semibold text-ink">{pitchLabel(s.pitch, naming)}</span>
        }
        return s.bold ? <strong key={i} className="font-semibold text-ink">{s.text}</strong> : s.text
      })}
    </>
  )
}
