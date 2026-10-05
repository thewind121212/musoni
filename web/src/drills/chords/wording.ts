import type { Naming } from '@/core/music/types'
import type { Translate } from '@/core/i18n/translate'
import { label } from '@/core/music/pitch'
import type { ChordAnswer, ChordQuestion } from './generator'
import { parseKey } from './theory'
import { S, inversionKey, nameKey } from './strings'

/*
 * How the drill words a chord: in the reader's language, with note names in
 * their naming (La / A). The lead-sheet symbol is always letters (Am/C).
 */

/** "La thứ, thế đảo 1": the root in the reader's naming, the quality, and the inversion where the level has them. */
export function chordName(q: ChordQuestion, t: Translate, naming: Naming): string {
  const name = t(nameKey(q.quality), { root: label(q.root.letter, q.root.accidental, naming) })
  return q.kind === 'name' && q.inversions ? `${name}, ${t(inversionKey(q.inversion))}` : name
}

/** The answer as shown after it: "Am/C · La thứ, thế đảo 1", or "V · E · Mi trưởng" in a key. */
export function answerText(q: ChordQuestion, t: Translate, naming: Naming): string {
  const parts = [q.symbol, chordName(q, t, naming)]
  return (q.kind === 'roman' ? [q.numerals[q.degree], ...parts] : parts).join(' · ')
}

/** What the reader picked: "Do trưởng" (their root key and quality), or a numeral. */
export function chosenText(q: ChordQuestion, a: ChordAnswer, t: Translate): string {
  if (q.kind === 'roman') return 'degree' in a ? q.numerals[a.degree] : ''
  return 'root' in a ? t(nameKey(a.quality), { root: q.options[a.root].label }) : ''
}

/** "Giọng Sol trưởng", "Giọng Fa# thứ". */
export function keyText(key: string, t: Translate, naming: Naming): string {
  const k = parseKey(key)
  return t(k.mode === 'major' ? S['key.major'] : S['key.minor'], {
    key: label(k.tonic.letter, k.tonic.accidental, naming),
  })
}
