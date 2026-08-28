import { MinusIcon, PlusIcon, TimerIcon } from '@phosphor-icons/react'
import {
  DURATIONS, CUSTOM_MINUTES_MIN, CUSTOM_MINUTES_MAX,
  customOpeningSeconds, isPresetDuration,
} from '../../../config/constants'
import type { TranslationKey } from '../../../core/i18n/translations'
import type { TranslationParams } from '../../../core/i18n/translate'

interface Props {
  durationSec: number
  onChange: (durationSec: number) => void
  t: (key: TranslationKey, params?: TranslationParams) => string
}

/**
 * Session length: the offered lengths as a pill row, plus a stepper for
 * anything else.
 *
 * Pills rather than the picture cards the other settings use, because five
 * time choices do not fit that two-column grid and time has no picture worth
 * showing. A free length is only safe because the score is a per-minute pace,
 * so a longer session buys practice rather than points.
 */
export function DurationPicker({ durationSec, onChange, t }: Props) {
  const isPreset = isPresetDuration(durationSec)
  const minutes = Math.max(CUSTOM_MINUTES_MIN, Math.round(durationSec / 60))

  const step = (delta: number) => {
    const next = Math.min(CUSTOM_MINUTES_MAX, Math.max(CUSTOM_MINUTES_MIN, minutes + delta))
    onChange(next * 60)
  }

  const pill = (selected: boolean) =>
    'min-h-11 flex-1 basis-16 rounded-full px-2 text-sm font-medium ' +
    'transition-[background-color,border-color,color] duration-150 active:scale-[0.97] ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
    (selected ? 'bg-accent text-accent-ink' : 'border border-line bg-raised text-ink-soft hover:text-ink')

  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-3 flex w-full items-start gap-2.5">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg
                         border border-line bg-raised text-ink-soft">
          <TimerIcon size={15} weight="bold" />
        </span>
        <span className="flex flex-col">
          <span className="text-[15px] leading-snug font-semibold text-ink">{t('setup.length')}</span>
          <span className="text-xs leading-snug text-ink-faint">{t('setup.length.what')}</span>
        </span>
      </legend>

      <div role="radiogroup" aria-label={t('setup.length')} className="flex flex-wrap gap-2">
        {DURATIONS.map(d => (
          <button
            key={d.seconds}
            role="radio"
            aria-checked={durationSec === d.seconds}
            onClick={() => onChange(d.seconds)}
            className={pill(durationSec === d.seconds)}
          >
            {t(`duration.${d.seconds}` as 'duration.60')}
          </button>
        ))}
        <button
          role="radio"
          aria-checked={!isPreset}
          // Opens on a length that is deliberately not one of the presets:
          // reopening on the current one would leave the stepper hidden and the
          // option looking dead.
          onClick={() => onChange(customOpeningSeconds(durationSec))}
          className={pill(!isPreset)}
        >
          {t('duration.custom')}
        </button>
      </div>

      {!isPreset && (
        <div className="mt-2 flex items-center justify-between rounded-2xl border border-accent
                        bg-accent/10 px-2 py-1.5">
          <button
            onClick={() => step(-1)}
            disabled={minutes <= CUSTOM_MINUTES_MIN}
            aria-label={t('duration.less')}
            className="flex size-10 items-center justify-center rounded-full text-ink
                       transition-colors duration-150 hover:bg-raised disabled:opacity-30
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <MinusIcon size={18} weight="bold" />
          </button>
          <span className="tnum text-lg font-semibold">
            {t('duration.minutes', { count: minutes })}
          </span>
          <button
            onClick={() => step(1)}
            disabled={minutes >= CUSTOM_MINUTES_MAX}
            aria-label={t('duration.more')}
            className="flex size-10 items-center justify-center rounded-full text-ink
                       transition-colors duration-150 hover:bg-raised disabled:opacity-30
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <PlusIcon size={18} weight="bold" />
          </button>
        </div>
      )}
    </fieldset>
  )
}
