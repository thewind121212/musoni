import { CheckIcon, PlayIcon, XIcon } from '@phosphor-icons/react'
import { Button } from '@/core/components/atoms'
import type { Translate } from '@/core/i18n/translate'
import type { Calibration } from '../../../calibrate'
import { BeatDots } from '../../atoms/BeatDots'
import { TapPad } from '../../atoms/TapPad'
import { S } from '../../../strings'

export type CalibrationStatus = 'idle' | 'running' | 'done'

interface Props {
  status: CalibrationStatus
  /** Clicks sounded so far. */
  heard: number
  /** Clicks in the run. */
  total: number
  /** The last run's outcome, once done. */
  outcome: Calibration | null
  onStart: () => void
  onTap: (timeStamp: number) => void
  onClose: () => void
  t: Translate
}

/**
 * Setup's latency check: play eight clicks, tap along on the pad, and see the
 * delay that will be taken off each tap (or why it could not be measured).
 */
export function CalibrationPanel({ status, heard, total, outcome, onStart, onTap, onClose, t }: Props) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-accent/40 bg-accent/5 p-4">
      <div>
        <div className="text-[15px] font-semibold">{t(S['calibrate.title'])}</div>
        <p className="mt-0.5 text-xs leading-snug text-ink-soft">{t(S['calibrate.body'])}</p>
      </div>
      <div className="flex h-5 items-center justify-center">
        <BeatDots count={total} lit={status === 'idle' ? 0 : heard} label={t(S.countIn)} />
      </div>
      <TapPad compact label={t(S.pad)} onTap={onTap} />
      <div className="flex min-h-12 flex-wrap items-center justify-between gap-2">
        <div role="status" className="min-w-0 flex-1 text-sm">
          {status === 'running' && <span className="text-ink-soft">{t(S['calibrate.listen'])}</span>}
          {status === 'done' && outcome?.ok && (
            <span className="inline-flex items-center gap-1.5 font-medium text-correct">
              <CheckIcon size={15} weight="bold" aria-hidden /> {t(S['calibrate.saved'], { ms: outcome.latencyMs })}
            </span>
          )}
          {status === 'done' && outcome && !outcome.ok && (
            <span className="inline-flex items-start gap-1.5 font-medium text-wrong">
              <XIcon size={15} weight="bold" aria-hidden className="mt-0.5 shrink-0" />
              {t(outcome.reason === 'few' ? S['calibrate.few'] : S['calibrate.uneven'])}
            </span>
          )}
        </div>
        {status === 'idle' && (
          <Button variant="primary" className="min-h-10 px-4 text-sm" onClick={onStart}>
            <PlayIcon size={15} weight="fill" /> {t(S['calibrate.go'])}
          </Button>
        )}
        {status === 'done' && (
          <div className="flex gap-2">
            <Button className="min-h-10 px-4 text-sm" onClick={onStart}>{t(S['calibrate.again'])}</Button>
            <Button variant="primary" className="min-h-10 px-4 text-sm" onClick={onClose}>{t(S['calibrate.close'])}</Button>
          </div>
        )}
      </div>
    </div>
  )
}
