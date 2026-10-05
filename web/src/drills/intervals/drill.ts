import { ArrowsVerticalIcon } from '@phosphor-icons/react'
import { defineDrill } from '@/app/drill'
import { DEFAULT_DURATION_SECONDS } from '@/config/constants'
import { S, levelDetailKey, levelKey } from './strings'

// A type, not an interface: it must fit `DrillOptions` (a record).
export type IntervalsOptions = {
  /** Play the interval after each answer, as written: note by note, or together. */
  hear: boolean
}

/** Quãng: name the interval between two notes on the staff. Design: docs/fe/drill-intervals.md. */
export default defineDrill<IntervalsOptions>({
  id: 'intervals',
  page: () => import('./pages/IntervalsDrill').then(m => m.IntervalsDrill),
  icon: ArrowsVerticalIcon,
  title: S.title,
  description: S.what,
  short: S.short,
  starter: S.starter,
  group: 'read',
  order: 30,
  levels: [1, 2, 3, 4].map(l => ({ name: levelKey(l), detail: levelDetailKey(l) })),
  // Hearing is the reader's own: a lesson preset never turns it on or off.
  defaults: { level: 1, durationSec: DEFAULT_DURATION_SECONDS, hear: true },
  // Half and whole steps are 2nds: the drill opens with the lesson that teaches them.
  unlockedBy: 'accidentals-steps/half-whole-steps',
})
