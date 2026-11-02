import { MusicNotesIcon } from '@phosphor-icons/react'
import { defineDrill } from '@/app/drill'
import { DEFAULT_DURATION_SECONDS } from '@/config/constants'
import { S, levelDetailKey, levelKey } from './strings'

// A type, not an interface: it must fit `DrillOptions` (a record).
export type NoteIdOptions = {
  /** Sharps and flats on the staff and the black keys as answers. */
  accidentals: boolean
  /** "Quãng tám": answer the octave too (Mi4), on the octave strip above the pad. */
  octave: boolean
}

/** Đọc nốt: name the note on the staff. Design: docs/fe/drill-note-identification.md. */
export default defineDrill<NoteIdOptions>({
  id: 'note-id',
  page: () => import('./pages/NoteIdDrill').then(m => m.NoteIdDrill),
  icon: MusicNotesIcon,
  title: S.title,
  description: S.what,
  short: S.short,
  starter: S.starter,
  group: 'read',
  order: 10,
  levels: [1, 2, 3, 4].map(l => ({ name: levelKey(l), detail: levelDetailKey(l) })),
  defaults: { level: 1, durationSec: DEFAULT_DURATION_SECONDS, accidentals: false, octave: false },
  // Not `octave`: it is how the reader answers (like naming), so a lesson link keeps theirs.
  presetOptions: ['accidentals'],
  tags: (s, t) => [...(s.accidentals ? ['♯ ♭'] : []), ...(s.octave ? [t(S.octave)] : [])],
})
