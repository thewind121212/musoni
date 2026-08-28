import { MinusIcon, PlusIcon, SlidersIcon } from '@phosphor-icons/react'
import { OptionCards } from '../../../core/components/OptionCard'
import { DURATIONS, CUSTOM_MINUTES_MIN, CUSTOM_MINUTES_MAX } from '../../../config/constants'
import { LightningIcon, TimerIcon } from '@phosphor-icons/react'
import type { TranslationKey } from '../../../core/i18n/translations'
import type { TranslationParams } from '../../../core/i18n/translate'

const CUSTOM = 'custom' as const
type Choice = number | typeof CUSTOM

interface Props {
  durationSec: number
  onChange: (durationSec: number) => void
  t: (key: TranslationKey, params?: TranslationParams) => string
}

/**
 * The offered lengths, plus a stepper for anything else.
 *
 * A free length is only safe because the score is a per-minute pace: someone
 * practising ten minutes is not buying a higher score, just more practice.
 */
export function DurationPicker({ durationSec, onChange, t }: Props) {
  const isPreset = DURATIONS.some(d => d.seconds === durationSec)
  const minutes = Math.max(CUSTOM_MINUTES_MIN, Math.round(durationSec / 60))

  const options = [
    ...DURATIONS.map(d => ({
      value: d.seconds as Choice,
      label: t(`duration.${d.seconds}` as 'duration.60'),
      visual: d.seconds <= 30
        ? <LightningIcon size={26} weight="duotone" />
        : <TimerIcon size={26} weight="duotone" />,
    })),
    {
      value: CUSTOM as Choice,
      label: t('duration.custom'),
      visual: <SlidersIcon size={26} weight="duotone" />,
    },
  ]

  const step = (delta: number) => {
    const next = Math.min(CUSTOM_MINUTES_MAX, Math.max(CUSTOM_MINUTES_MIN, minutes + delta))
    onChange(next * 60)
  }

  return (
    <div>
      <OptionCards
        label={t('setup.length')}
        description={t('setup.length.what')}
        icon={<TimerIcon size={15} weight="bold" />}
        columns={4}
        options={options}
        value={isPreset ? (durationSec as Choice) : CUSTOM}
        onChange={choice => onChange(choice === CUSTOM ? minutes * 60 : (choice as number))}
      />

      {!isPreset && (
        <div className="mt-2 flex items-center justify-between rounded-2xl border border-accent bg-accent/10 px-3 py-2">
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
    </div>
  )
}
