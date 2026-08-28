import { motion, useReducedMotion } from 'motion/react'
import { ArrowClockwiseIcon, HouseIcon, TrophyIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../../app/store'
import { useDrillStore } from '../store'
import { getBest } from '../../../progress/progressStore'
import { Button } from '../../../core/components/Button'
import { useT } from '../../../app/useT'

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-raised px-4 py-3">
      <div className="tnum text-xl font-semibold">{value}</div>
      <div className="text-xs text-ink-faint">{label}</div>
    </div>
  )
}

export function ResultPhase() {
  const settings = useAppStore(s => s.settings)
  const result = useDrillStore(s => s.lastResult)
  const reduce = useReducedMotion()
  const t = useT()
  if (!result) return null

  const best = getBest('note-id', result.level, result.durationSec)
  const isBest = best !== null && best.practiceScore === result.practiceScore
  const again = () => useDrillStore.getState().start(result.level as 1 | 2 | 3 | 4, settings)

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center gap-6 px-4 py-10 md:max-w-2xl md:px-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-6"
      >
        <div>
          {isBest && (
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-ink">
              <TrophyIcon size={13} weight="fill" /> {t('result.personalBest')}
            </div>
          )}
          <div className="text-sm text-ink-soft">
            {t('result.session', { level: t(`level.${result.level}` as 'level.1') })}
          </div>
          <div className="tnum text-6xl font-semibold tracking-tight md:text-7xl">{result.practiceScore}</div>
          <div className="text-sm text-ink-faint">
            {t('result.scoreCaption', { weight: result.weight.toFixed(2) })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Stat value={String(result.correct)} label={t('result.correct')} />
          <Stat value={`${Math.round(result.accuracy * 100)}%`} label={t('result.accuracy')} />
          <Stat value={`${(result.avgMs / 1000).toFixed(1)}s`} label={t('result.avgAnswer')} />
          <Stat value={String(result.bestStreak)} label={t('result.bestStreak')} />
        </div>

        {!isBest && best && (
          <p className="text-sm text-ink-faint">
            {t('result.yourBest', { score: best.practiceScore })}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <Button variant="primary" className="h-14 text-lg" onClick={again}>
            <ArrowClockwiseIcon size={20} weight="bold" /> {t('result.again')}
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => useDrillStore.getState().backToSetup()}>{t('result.changeSetup')}</Button>
            <Link to="/" className="contents">
              <Button className="w-full"><HouseIcon size={18} weight="bold" /> {t('result.home')}</Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
