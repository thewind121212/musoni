import { useCallback, useMemo, useRef, useState } from 'react'
import { NoteStaff, type NoteStaffLayout } from '@/core/components/organisms'
import { parseNotation } from '@/core/music/notation'
import type { Translate } from '@/core/i18n/translate'
import { RHYTHM_MARK_ROOM_PX, RHYTHM_STAFF_WIDTH } from '@/config/constants'
import type { RhythmMeasure } from '../../../generator'
import type { Judgement } from '../../../judge'
import { MarkDot } from '../../atoms/MarkDot'
import { S } from '../../../strings'
import { placeAt } from './place'

interface Props {
  measure: RhythmMeasure
  /** The measure's marks once it is judged; null while it is read and tapped. */
  judgement: Judgement | null
  /** Milliseconds per tick at the session's tempo, to place extra taps. */
  tickMs: number
  /** Smaller marks (the result screen's list). */
  small?: boolean
  t: Translate
}

/**
 * One measure on a percussion staff with its time signature, and once it is
 * judged a mark over each note to tap (tied-over notes have none) and a red
 * cross where an extra tap landed. A right measure turns green.
 */
export function RhythmStaff({ measure, judgement, tickMs, small = false, t }: Props) {
  const { base, perEvent, min, max } = RHYTHM_STAFF_WIDTH
  const width = Math.min(max, Math.max(min, base + perEvent * measure.events.length))
  const events = useMemo(() => parseNotation(measure.notation), [measure.notation])
  const [layout, setLayout] = useState<NoteStaffLayout | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const [boxPx, setBoxPx] = useState(0)
  const onLayout = useCallback((l: NoteStaffLayout) => {
    setLayout(l)
    setBoxPx(box.current?.clientWidth ?? 0)
  }, [])
  // The event each onset is: notes not held over by a tie.
  const onsetEvent = measure.events.flatMap((e, i) => (!e.rest && !measure.events[i - 1]?.tie ? [i] : []))
  const starts = measure.events.map(e => e.start)
  const shown = judgement && layout && layout.xs.length === measure.events.length ? layout : null
  const label = (mark: string) => t(S[`mark.${mark}` as 'mark.on'])
  // Sixteenths on a phone sit closer than a full-size mark is wide: then every mark is drawn small.
  const xs = shown ? onsetEvent.map(i => shown.xs[i] * boxPx) : []
  const tight = xs.some((x, k) => k > 0 && x - xs[k - 1] < RHYTHM_MARK_ROOM_PX)
  const smallMarks = small || tight

  return (
    <div ref={box} className="w-full" data-testid="rhythm-staff">
      {/* Note marks on the upper line, extra taps on the lower, so a stray tap beside a note never hides its mark. */}
      <div className={'relative ' + (small ? 'h-7' : 'h-9')}>
        {shown && judgement?.notes.map((n, k) => (
          <span
            key={`n${k}`}
            className="absolute top-0 -translate-x-1/2"
            style={{ left: `${shown.xs[onsetEvent[k]] * 100}%` }}
          >
            <MarkDot kind={n.mark} label={label(n.mark)} small={smallMarks} />
          </span>
        ))}
        {shown && judgement?.extras.map((ms, k) => (
          <span
            key={`x${k}`}
            className="absolute bottom-0 -translate-x-1/2"
            style={{ left: `${placeAt(ms / tickMs, starts, shown.xs, measure.length, shown.end) * 100}%` }}
          >
            <MarkDot kind="extra" label={label('extra')} small={smallMarks} />
          </span>
        ))}
      </div>
      <NoteStaff
        clef="percussion"
        time={measure.meter}
        events={events}
        width={width}
        tone={judgement?.correct ? 'correct' : 'neutral'}
        onLayout={onLayout}
      />
    </div>
  )
}
