import { XIcon } from '@phosphor-icons/react'
import { CountPill } from '@/core/components/atoms'
import type { Translate } from '@/core/i18n/translate'
import { formatClock } from '@/core/i18n/formatDuration'

interface Props {
  secondsLeft: number
  /** The last seconds: the timer turns red. */
  urgent: boolean
  correct: number
  wrong: number
  onQuit: () => void
  t: Translate
}

/** The sprint's top bar: quit, the countdown, and the right and wrong tallies. */
export function RunHeader({ secondsLeft, urgent, correct, wrong, onQuit, t }: Props) {
  return (
    // Equal side columns keep the timer centred; they grow with the counts
    // rather than letting long ones overlap it.
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 pt-5">
      <button
        onClick={onQuit}
        aria-label={t('run.quit')}
        title={t('run.quit')}
        className="-ml-2 flex size-10 items-center justify-center rounded-full text-ink-faint
                   transition-colors duration-150 hover:bg-line hover:text-ink active:scale-95
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <XIcon size={20} weight="bold" />
      </button>
      <div className={'tnum text-center text-3xl font-semibold md:text-5xl ' + (urgent ? 'text-wrong' : 'text-ink')}>
        {/* Bare seconds in the last minute; minutes and seconds above it, so a
            long session reads "9:40" rather than "580". */}
        {secondsLeft >= 60 ? formatClock(secondsLeft) : secondsLeft}
      </div>
      {/* Right and wrong side by side, each with its icon, so a miss is counted
          where the reader can see it rather than only resetting the streak. */}
      <div className="flex justify-end gap-1.5">
        <CountPill
          data-testid="run-correct" tone="correct" count={correct}
          label={t('run.correct', { count: correct })}
        />
        <CountPill
          data-testid="run-wrong" tone="wrong" count={wrong}
          label={t('run.wrong', { count: wrong })}
        />
      </div>
    </header>
  )
}
