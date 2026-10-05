import { NoteStaff } from '@/core/components/organisms'
import type { Translate } from '@/core/i18n/translate'
import { CHORD_MISSED_STAFF_WIDTH, MISSED_NOTES_SHOWN } from '@/config/constants'
import { chordEvents } from '../../../staff'
import { groupMissedChords, type MissedChord } from './groupMissedChords'

interface Props {
  misses: readonly MissedChord[]
  /** "Chords to review". */
  title: string
  t: Translate
}

/**
 * The chords this session got wrong, each on a small staff with its symbol
 * and what was picked instead: the part of a session worth looking at again.
 */
export function MissedChords({ misses, title, t }: Props) {
  if (misses.length === 0) return null
  const groups = groupMissedChords(misses).slice(0, MISSED_NOTES_SHOWN)
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        <span className="text-xs text-ink-faint">{t('result.missCount', { count: misses.length })}</span>
      </div>
      <ul className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {groups.map(g => (
          <li
            key={`${g.keySignature}${g.answer}>${g.chosen}`}
            className="flex flex-col items-center rounded-2xl border border-line bg-raised px-2 pt-1.5 pb-2.5 text-center"
          >
            <div className="w-full max-w-36">
              <NoteStaff
                clef="treble"
                events={chordEvents(g.notes)}
                keySignature={g.keySignature ?? undefined}
                width={CHORD_MISSED_STAFF_WIDTH}
              />
            </div>
            <span className="mt-1 text-sm font-semibold">{g.answer}</span>
            <span className="text-[11px] leading-tight text-wrong">
              {t('result.youPicked', { chosen: g.chosen })}{g.count > 1 ? ` ×${g.count}` : ''}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
