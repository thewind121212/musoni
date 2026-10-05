import { useMemo } from 'react'
import { NoteStaff } from '@/core/components/organisms'
import { parseNotation } from '@/core/music/notation'
import type { Translate } from '@/core/i18n/translate'
import { intervalNotation } from '@/drills/intervals/generator'
import { rowOf, type Cell, type Row } from '@/drills/intervals/grid'
import { cellLabel, cellName } from '@/drills/intervals/names'
import { S } from '@/drills/intervals/strings'
import { INTERVAL_MISS_STAFF_WIDTH, INTERVAL_STAFF_ROOM, MISSED_NOTES_SHOWN } from '@/config/constants'
import { groupMissedIntervals, missKey, type MissedInterval } from './groupMissedIntervals'

interface Props {
  misses: readonly MissedInterval[]
  /** The level's grid rows, so the answer is labelled as the reader would have tapped it. */
  rows: readonly Row[]
  t: Translate
}

function Tile({ miss, rows, t }: { miss: MissedInterval & { count: number }; rows: readonly Row[]; t: Translate }) {
  const notation = intervalNotation(miss.question)
  const events = useMemo(() => parseNotation(notation), [notation])
  const answer: Cell = { row: rowOf(miss.question.interval, rows), size: miss.question.interval.size }
  return (
    <li className="flex flex-col items-center rounded-2xl border border-line bg-raised px-1.5 pt-1 pb-2.5 text-center">
      <div className="flex h-24 w-full items-center overflow-hidden">
        <NoteStaff clef={miss.question.clef} events={events} width={INTERVAL_MISS_STAFF_WIDTH} room={INTERVAL_STAFF_ROOM} />
      </div>
      <span className="text-sm font-semibold" title={cellName(answer, t)}>{cellLabel(answer, t)}</span>
      <span className="text-[11px] leading-tight text-wrong">
        {t('result.youPicked', { chosen: cellLabel(miss.chosen, t) })}{miss.count > 1 ? ` ×${miss.count}` : ''}
      </span>
    </li>
  )
}

/**
 * The intervals this session got wrong, each on a small staff as it was
 * asked, with its name and what was picked instead. Names are the grid's own
 * short labels ("6t", "bạn chọn 6T"), the way the reader answered.
 */
export function MissedIntervals({ misses, rows, t }: Props) {
  if (misses.length === 0) return null
  const groups = groupMissedIntervals(misses).slice(0, MISSED_NOTES_SHOWN)
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold">{t(S.toReview)}</h2>
        <span className="text-xs text-ink-faint">{t('result.missCount', { count: misses.length })}</span>
      </div>
      <ul className="mt-2.5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {groups.map(g => (
          <Tile key={missKey(g)} miss={g} rows={rows} t={t} />
        ))}
      </ul>
    </section>
  )
}
