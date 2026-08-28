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
