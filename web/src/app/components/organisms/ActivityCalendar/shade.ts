import type { Lang, Translate } from '@/core/i18n/translate'

/**
 * Practice minutes to a heatmap shade.
 *
 * Thresholds are absolute minutes rather than quantiles of the reader's own
 * history, so the shades mean the same thing forever: reaching the third shade
 * is reaching the daily practice the drill is built around, and a light week
 * cannot quietly redefine what "a lot" looks like.
 */
const LEVEL_MINUTES = [0, 2, 5, 10] as const

export type ShadeLevel = 0 | 1 | 2 | 3 | 4

export function shadeLevel(minutes: number | undefined): ShadeLevel {
  if (!minutes) return 0
  if (minutes <= LEVEL_MINUTES[1]) return 1
  if (minutes <= LEVEL_MINUTES[2]) return 2
  if (minutes <= LEVEL_MINUTES[3]) return 3
  return 4
}

export const SHADE: Record<ShadeLevel, string> = {
  0: 'bg-line/60',
  1: 'bg-accent/25',
  2: 'bg-accent/50',
  3: 'bg-accent/75',
  4: 'bg-accent',
}

export interface CalendarProps {
  minutesByDay: Record<string, number>
  /** Locale for day and month names. */
  lang: Lang
  t: Translate
}
