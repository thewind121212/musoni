import type { Translate } from '@/core/i18n/translate'
import { KEY_SIG_MISSED_STAFF_WIDTH, MISSED_NOTES_SHOWN } from '@/config/constants'
import { SignatureStaff } from '../SignatureStaff'
import { S } from '@/drills/key-sig/strings'
import { groupMissedKeys, type MissedKey } from './groupMissedKeys'

interface Props {
  misses: readonly MissedKey[]
  t: Translate
}

/**
 * The key signatures this session got wrong, each on a small staff with its
 * key and what was picked instead. Note reading's "notes to review", for keys.
 */
export function MissedKeys({ misses, t }: Props) {
  if (misses.length === 0) return null
  const groups = groupMissedKeys(misses).slice(0, MISSED_NOTES_SHOWN)
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold">{t(S['result.toReview'])}</h2>
        <span className="text-xs text-ink-faint">{t('result.missCount', { count: misses.length })}</span>
      </div>
      <ul className="mt-2.5 grid grid-cols-2 gap-2 min-[400px]:grid-cols-3 md:grid-cols-6">
        {groups.map(g => (
          <li
            key={`${g.fifths}${g.clef}${g.keyName}>${g.chosen}`}
            className="flex flex-col items-center rounded-2xl border border-line bg-raised px-1.5 pt-1 pb-2.5 text-center"
          >
            <div className="flex h-20 w-full items-center">
              <SignatureStaff fifths={g.fifths} clef={g.clef} width={KEY_SIG_MISSED_STAFF_WIDTH} />
            </div>
            <span className="text-sm leading-tight font-semibold">{g.keyName}</span>
            <span className="mt-0.5 text-[11px] leading-tight text-wrong">
              {t('result.youPicked', { chosen: g.chosen })}{g.count > 1 ? ` ×${g.count}` : ''}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
