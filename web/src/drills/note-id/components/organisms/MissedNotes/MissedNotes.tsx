import { Staff } from '@/core/components/organisms'
import type { Translate } from '@/core/i18n/translate'
import { groupMisses, type MissedNote } from './groupMisses'
import { MISSED_NOTES_SHOWN, MISSED_NOTE_STAFF_WIDTH } from '@/config/constants'

interface Props {
  misses: MissedNote[]
  t: Translate
}

/**
 * The notes this session got wrong, each on a small staff with what was
 * picked instead: the part of a session worth looking at again.
 */
export function MissedNotes({ misses, t }: Props) {
  if (misses.length === 0) return null
  const groups = groupMisses(misses).slice(0, MISSED_NOTES_SHOWN)
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold">{t('result.toReview')}</h2>
        <span className="text-xs text-ink-faint">{t('result.missCount', { count: misses.length })}</span>
      </div>
      <ul className="mt-2.5 grid grid-cols-3 gap-2 md:grid-cols-6">
        {groups.map(g => (
          <li
            key={`${g.clef}${g.pitch.letter}${g.pitch.accidental}${g.pitch.octave}>${g.chosen}`}
            className="flex flex-col items-center rounded-2xl border border-line bg-raised px-1.5 pt-1 pb-2.5 text-center"
          >
            {/* Staff keeps room for any ledger note; a tile only needs the middle. */}
            <div className="flex h-24 w-full items-center overflow-hidden">
              <Staff clef={g.clef} pitch={g.pitch} width={MISSED_NOTE_STAFF_WIDTH} />
            </div>
            <span className="text-sm font-semibold">{g.answer}</span>
            <span className="text-[11px] leading-tight text-wrong">
              {t('result.youPicked', { chosen: g.chosen })}{g.count > 1 ? ` ×${g.count}` : ''}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
