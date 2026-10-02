import { Drawer } from 'vaul'
import { InfoIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { Button } from '@/core/components/atoms'
import type { Translate } from '@/core/i18n/translate'

interface Props {
  /** Whether the sprint is paused. Kept mounted while closed, so the sheet can slide away. */
  open: boolean
  /** `menu`: the reader paused (quit, Esc). `away`: the page was hidden or left, so it greets them back. */
  reason: 'menu' | 'away'
  /** Time left on the clock, as a clock ("9:40"), so any length fits its column. */
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
 * The paused sprint as a bottom sheet (vaul: slides in and out, drags down,
 * traps focus, closes on Esc or a tap on the scrim). Every way of closing it
 * resumes, since that is what almost everyone wants; ending is the quiet
 * action, and says what it costs (the score) and keeps (the time) first.
 */
export function PausePanel({ open, reason, timeLeft, played, correct, wrong, onResume, onEnd, t }: Props) {
  const away = reason === 'away'
  return (
    <Drawer.Root open={open} onOpenChange={next => { if (!next) onResume() }}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-ink/35" />
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-md flex-col rounded-t-3xl bg-raised
                     px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl outline-none"
        >
          <Drawer.Handle className="mb-4 h-1! w-10! bg-line!" />
          {away ? (
            <div className="text-center">
              <div className="mx-auto mb-3 flex size-14 items-center justify-center rounded-2xl bg-accent/12 text-accent">
                <PauseIcon size={26} weight="fill" />
              </div>
              <Drawer.Title className="text-xl font-semibold">{t('away.title')}</Drawer.Title>
              <Drawer.Description className="mt-1.5 text-[15px] leading-snug text-ink-soft">
                {t('away.body')}
              </Drawer.Description>
              <div className="tnum mt-4 text-5xl font-bold">{timeLeft}</div>
              <div className="mt-1 text-sm text-ink-faint">{t('away.detail', { correct, wrong })}</div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                  <PauseIcon size={20} weight="fill" />
                </div>
                <div className="min-w-0">
                  <Drawer.Title className="text-lg font-semibold">{t('pause.title')}</Drawer.Title>
                  <Drawer.Description className="text-sm text-ink-faint">{t('pause.clockStopped')}</Drawer.Description>
                </div>
              </div>
              <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line">
                <Figure value={timeLeft} label={t('pause.left')} />
                <Figure value={String(correct)} label={t('pause.correct')} className="text-correct" />
                <Figure value={String(wrong)} label={t('pause.wrong')} className="text-wrong" />
              </dl>
              <p className="mt-3 flex gap-2 rounded-2xl bg-surface px-3 py-2.5 text-sm leading-snug text-ink-soft">
                <InfoIcon size={18} className="mt-px shrink-0 text-ink-faint" />
                <span>{t('pause.endNote', { time: played })}</span>
              </p>
            </>
          )}
          <Button variant="cta" className="mt-5 h-14 w-full text-lg" onClick={onResume}>
            <PlayIcon size={18} weight="fill" /> {t('pause.resume')}
          </Button>
          <Button
            variant="quiet"
            className={'mt-1 w-full ' + (away ? '' : 'text-wrong hover:text-wrong')}
            onClick={onEnd}
          >
            {t('pause.end')}
          </Button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

function Figure({ value, label, className = '' }: { value: string; label: string; className?: string }) {
  return (
    <div className="flex min-w-0 flex-col-reverse items-center px-1 py-3">
      <dt className="text-xs text-ink-faint">{label}</dt>
      <dd className={'tnum truncate text-xl font-semibold ' + className}>{value}</dd>
    </div>
  )
}
