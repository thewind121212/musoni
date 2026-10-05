import { EarIcon } from '@phosphor-icons/react'
import { defineDrill } from '@/app/drill'
import { EAR_DEFAULT_DURATION_SECONDS } from '@/config/constants'
import { S, levelDetailKey, levelKey } from './strings'

// A type, not an interface: it must fit `DrillOptions` (a record).
export type HearPlayOptions = {
  /** Listening aid: the key's cadence before every question, not only when the key changes. */
  cadenceEach: boolean
  /** Listening aid: C at every level (no effect at level 1). */
  oneKey: boolean
}

/** Nghe & Đàn: hear a note in a key, play it on the keys. Design: docs/fe/drill-hear-play.md. */
export default defineDrill<HearPlayOptions>({
  id: 'hear-play',
  page: () => import('./pages/HearPlayDrill').then(m => m.HearPlayDrill),
  icon: EarIcon,
  title: S.title,
  description: S.what,
  short: S.short,
  starter: S.starter,
  group: 'ear',
  order: 10,
  levels: [1, 2, 3, 4].map(l => ({ name: levelKey(l), detail: levelDetailKey(l) })),
  // The listening aids are the reader's own: presets never turn them on or off.
  defaults: { level: 1, durationSec: EAR_DEFAULT_DURATION_SECONDS, cadenceEach: false, oneKey: false },
  // Violet: AA contrast 5.2 (light) and 7.3 (dark) with its ink.
  colour: {
    light: { cta: 'oklch(0.55 0.2 300)', ink: 'oklch(0.99 0 0)' },
    dark: { cta: 'oklch(0.72 0.15 300)', ink: 'oklch(0.17 0.012 258)' },
  },
})
