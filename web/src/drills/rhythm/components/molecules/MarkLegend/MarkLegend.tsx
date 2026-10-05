import type { Translate } from '@/core/i18n/translate'
import { MarkDot } from '../../atoms/MarkDot'
import { S } from '../../../strings'

interface Props {
  t: Translate
}

/** What the marks over the notes mean: on time, early or late, missed or extra. */
export function MarkLegend({ t }: Props) {
  const items = [
    { kind: 'on' as const, label: t(S['legend.on']) },
    { kind: 'late' as const, label: t(S['legend.off']) },
    { kind: 'missed' as const, label: t(S['legend.miss']) },
  ]
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-xs text-ink-soft md:text-sm">
      {items.map(i => (
        <li key={i.kind} className="flex items-center gap-1.5">
          <MarkDot kind={i.kind} small />
          <span>{i.label}</span>
        </li>
      ))}
    </ul>
  )
}
