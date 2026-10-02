import { useId } from 'react'
import { InfoIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { Button } from '@/core/components/atoms'
import type { Translate } from '@/core/i18n/translate'

interface Props {
  /** `menu`: the reader paused (quit, Esc), shown as a sheet. `away`: the page was left, shown as a welcome back. */
  reason: 'menu' | 'away'
  secondsLeft: number
  /** `secondsLeft` as words ("18 sec"). */
  timeLeft: string
  /** Time played so far as words, for what ending now keeps. */
  played: string
  correct: number
  wrong: number
  onResume: () => void
  onEnd: () => void
  t: Translate
}

/**
 * The paused sprint, over a scrim. Resuming is the amber action because it is
 * what almost everyone wants; ending is quiet, and says what it costs (the
 * score) and what it keeps (the time) before the reader commits.
 */
export function PausePanel({ reason, secondsLeft, timeLeft, played, correct, wrong, onResume, onEnd, t }: Props) {
  const titleId = useId()
  const away = reason === 'away'
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/35 md:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={
          'w-full max-w-md bg-raised shadow-2xl ' +
          (away
            ? 'mx-4 mb-auto mt-auto rounded-3xl px-5 pt-6 pb-5 text-center'
            : 'rounded-t-3xl px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:rounded-3xl md:pt-6')
        }
      >
        {away ? (
          <>
            <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-accent/12 text-accent">
              <PauseIcon size={26} weight="fill" />
            </div>
            <h2 id={titleId} className="text-xl font-semibold">{t('away.title')}</h2>
            <p className="mt-1.5 text-[15px] leading-snug text-ink-soft">{t('away.body')}</p>
            <div className="tnum mt-4 text-5xl font-bold">{secondsLeft}</div>
            <div className="mt-1 text-sm text-ink-faint">{t('away.detail', { correct, wrong })}</div>
          </>
        ) : (
          <>
            {/* The grab bar says "sheet" on a phone; desktop shows a plain dialog. */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line md:hidden" aria-hidden />
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                <PauseIcon size={20} weight="fill" />
              </div>
              <div>
                <h2 id={titleId} className="text-lg font-semibold">{t('pause.title')}</h2>
                <p className="text-sm text-ink-faint">{t('pause.clockStopped')}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line">
              <Figure value={timeLeft} label={t('pause.left')} />
              <Figure value={String(correct)} label={t('pause.correct')} className="tnum text-correct" />
              <Figure value={String(wrong)} label={t('pause.wrong')} className="tnum text-wrong" />
            </dl>
            <p className="mt-3 flex gap-2 rounded-2xl bg-surface px-3 py-2.5 text-sm leading-snug text-ink-soft">
              <InfoIcon size={18} className="mt-px shrink-0 text-ink-faint" />
              <span>{t('pause.endNote', { time: played })}</span>
            </p>
          </>
        )}
        <Button variant="cta" autoFocus className="mt-5 h-14 w-full text-lg" onClick={onResume}>
          <PlayIcon size={18} weight="fill" /> {t('pause.resume')}
        </Button>
        <Button
          variant="quiet"
          className={'mt-1 w-full ' + (away ? '' : 'text-wrong hover:text-wrong')}
          onClick={onEnd}
        >
          {t('pause.end')}
        </Button>
      </div>
    </div>
  )
}

function Figure({ value, label, className = '' }: { value: string; label: string; className?: string }) {
  return (
    <div className="flex flex-col-reverse items-center py-3">
      <dt className="text-xs text-ink-faint">{label}</dt>
      {/* Mono digits for counts only; the time left is words ("18 sec"). */}
      <dd className={'text-xl font-semibold ' + className}>{value}</dd>
    </div>
  )
}
