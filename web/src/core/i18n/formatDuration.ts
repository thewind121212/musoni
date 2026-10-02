import { isPresetDuration } from '../../config/constants'
import type { TranslationKey } from './translations'
import type { TranslationParams } from './translate'

type Translate = (key: TranslationKey, params?: TranslationParams) => string

/**
 * A readable label for any session length.
 *
 * Offered lengths have their own phrasing ("30s", "1 min"); anything from the
 * custom stepper is rendered in minutes. Building the key by interpolating the
 * seconds cannot work, because a custom length has no key: an eight-minute
 * session looked up `duration.480` and printed that string into the UI.
 */
export function formatDuration(seconds: number, t: Translate): string {
  if (isPresetDuration(seconds)) return t(`duration.${seconds}` as 'duration.60')
  return t('duration.minutes', { count: Math.round(seconds / 60) })
}

/**
 * Time actually played, for a session that stopped part-way: seconds under a
 * minute, then minutes and seconds ("12 sec", "2 min 5 sec").
 */
export function formatElapsed(seconds: number, t: Translate): string {
  const total = Math.max(0, Math.round(seconds))
  if (total < 60) return t('duration.seconds', { count: total })
  const min = Math.floor(total / 60)
  const sec = total % 60
  return sec === 0 ? t('duration.minutes', { count: min }) : t('duration.minSec', { min, sec })
}
