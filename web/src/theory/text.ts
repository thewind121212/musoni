import type { Naming } from '@/core/music/types'
import { label } from '@/core/music/pitch'
import { parsePitchName, type PitchName } from '@/core/music/notation'

/** A run of lesson text: plain words or a note name, bold or not. */
export type Segment =
  | { kind: 'text'; text: string; bold: boolean }
  | { kind: 'pitch'; pitch: PitchName; bold: boolean }

export class TextError extends Error {}

const ACC: Record<string, string> = { '2': '##', '1': '#', '0': '', '-1': 'b', '-2': 'bb' }

/** A note name in the reader's naming: `Sol`, `Sol4`, `Fa#`, `Sib3` (or `G`, `G4`, `F#`, `Bb3`). */
export function pitchLabel(p: PitchName, naming: Naming): string {
  const acc = p.natural ? '♮' : ACC[String(p.alter)]
  return label(p.letter, '', naming) + acc + (p.octave ?? '')
}

/**
 * Splits lesson text into runs: `**bold**` and pitch tokens (`{G4}`, `{G}`,
 * `{F#}`). Strict, so a typo fails the content test instead of printing
 * braces: a token that is not a pitch, an unclosed brace, or an odd `**`.
 */
export function parseText(text: string): Segment[] {
  const parts = text.split('**')
  if (parts.length % 2 === 0) throw new TextError(`unbalanced ** in "${text}"`)
  const out: Segment[] = []
  parts.forEach((part, i) => {
    const bold = i % 2 === 1
    for (const piece of part.split(/(\{[^{}]*\})/)) {
      if (!piece) continue
      if (piece.startsWith('{') && piece.endsWith('}')) {
        const pitch = parsePitchName(piece.slice(1, -1))
        if (!pitch) throw new TextError(`not a pitch token: ${piece} in "${text}"`)
        out.push({ kind: 'pitch', pitch, bold })
      } else {
        if (/[{}]/.test(piece)) throw new TextError(`stray brace in "${text}"`)
        out.push({ kind: 'text', text: piece, bold })
      }
    }
  })
  return out
}

/** The error in a piece of lesson text, or null. */
export function textError(text: string): string | null {
  try {
    parseText(text)
    return null
  } catch (e) {
    return e instanceof Error ? e.message : String(e)
  }
}

/** Lesson text as one plain string in the reader's naming, for titles and screen readers. */
export function plainText(text: string, naming: Naming): string {
  return parseText(text).map(s => (s.kind === 'pitch' ? pitchLabel(s.pitch, naming) : s.text)).join('')
}
