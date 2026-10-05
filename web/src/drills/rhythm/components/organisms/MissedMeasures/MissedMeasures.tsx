import type { Translate } from '@/core/i18n/translate'
import { RHYTHM_MISSES_SHOWN } from '@/config/constants'
import type { RhythmMeasure } from '../../../generator'
import type { Judgement } from '../../../judge'
import { RhythmStaff } from '../RhythmStaff'
import { S } from '../../../strings'

export interface MissedMeasure {
  measure: RhythmMeasure
  judgement: Judgement
  /** Milliseconds per tick at the tempo it was played. */
  tickMs: number
}

interface Props {
  misses: readonly MissedMeasure[]
  t: Translate
}

/** The measures this session got wrong, each with its marks: what to read again. */
export function MissedMeasures({ misses, t }: Props) {
  if (misses.length === 0) return null
  return (
    <section>
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold">{t(S['result.toReview'])}</h2>
        <span className="text-xs text-ink-faint">{t(S['result.missCount'], { count: misses.length })}</span>
      </div>
      <ul className="mt-2.5 grid gap-2 md:grid-cols-2">
        {misses.slice(0, RHYTHM_MISSES_SHOWN).map((m, i) => (
          <li key={i} className="rounded-2xl border border-line bg-raised px-3 pt-1.5 pb-2">
            <RhythmStaff measure={m.measure} judgement={m.judgement} tickMs={m.tickMs} small t={t} />
          </li>
        ))}
      </ul>
    </section>
  )
}
