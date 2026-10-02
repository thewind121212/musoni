import { MinusIcon, PlusIcon, TimerIcon } from '@phosphor-icons/react'
import {
  DURATIONS, CUSTOM_MINUTES_MIN, CUSTOM_MINUTES_MAX,
  customOpeningSeconds, isPresetDuration,
} from '@/config/constants'
import type { Translate } from '@/core/i18n/translate'
import { FieldLegend } from '@/core/components/atoms'

interface Props {
  durationSec: number
  onChange: (durationSec: number) => void
  t: Translate
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
    'min-h-11 flex-1 basis-14 rounded-full px-1.5 text-sm font-medium whitespace-nowrap ' +
    'transition-[background-color,border-color,color] duration-150 active:scale-[0.97] ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
    (selected ? 'bg-accent text-accent-ink' : 'border border-line bg-raised text-ink-soft hover:text-ink')

  return (
    <fieldset className="border-0 p-0">
      <FieldLegend
        icon={<TimerIcon size={15} weight="bold" />}
        label={t('setup.length')}
      />

      <div role="radiogroup" aria-label={t('setup.length')} className="flex flex-wrap gap-1.5">
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
