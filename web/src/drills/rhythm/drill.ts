import { MetronomeIcon } from '@phosphor-icons/react'
import { defineDrill } from '@/app/drill'
import { RHYTHM_DEFAULT_DURATION_SECONDS, RHYTHM_DEFAULT_TEMPO } from '@/config/constants'
import { S, levelDetailKey, levelKey } from './strings'

// A type, not an interface: it must fit `DrillOptions` (a record).
export type RhythmOptions = {
  /** Quarter notes per minute (in 6/8 the dotted-quarter beat runs at three quarters of it). */
  tempo: number
  /** The metronome keeps clicking through the measure, not only the count-in. */
  click: boolean
  /** The reader's tap latency from calibration, taken off every tap; null until calibrated (none taken off). */
  latencyMs: number | null
}

/** Tiết tấu: read one measure of rhythm and tap it in time. Design: docs/fe/drill-rhythm.md. */
export default defineDrill<RhythmOptions>({
  id: 'rhythm',
  page: () => import('./pages/RhythmDrill').then(m => m.RhythmDrill),
  icon: MetronomeIcon,
  title: S.title,
  description: S.what,
  short: S.short,
  starter: S.starter,
  group: 'ear',
  order: 20,
  levels: [1, 2, 3, 4].map(l => ({ name: levelKey(l), detail: levelDetailKey(l) })),
  defaults: { level: 1, durationSec: RHYTHM_DEFAULT_DURATION_SECONDS, tempo: RHYTHM_DEFAULT_TEMPO, click: true, latencyMs: null },
  // A lesson may slow the tempo down; the click and the calibration stay the reader's.
  presetOptions: ['tempo'],
  tags: s => [`♩ = ${s.tempo}`],
  unlockedBy: 'durations-time/note-values',
})
