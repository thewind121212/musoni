import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowsVerticalIcon, CaretLeftIcon, PlayIcon, SlidersHorizontalIcon, TrophyIcon } from '@phosphor-icons/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { useIntervalsStore } from '@/drills/intervals/store'
import { getBest } from '@/progress/progressStore'
import { Button, FieldLegend, Switch } from '@/core/components/atoms'
import { DurationPicker, OptionCards, SegmentedControl, SettingRow } from '@/core/components/molecules'
import { sessionSummary } from '@/app/drillPreset'
import intervals from '@/drills/intervals/drill'
import { cellLabel } from '@/drills/intervals/names'
import { S, levelDetailKey, levelKey } from '@/drills/intervals/strings'
import type { Translate } from '@/core/i18n/translate'

const LEVELS = [1, 2, 3, 4] as const

/** What each level asks, in the grid's own labels: "2–8", "3T 5Đ", "♯ ♭", "4+ 5°". */
function levelSample(level: (typeof LEVELS)[number], t: Translate) {
  if (level === 1) return '2–8'
  if (level === 3) return '♯ ♭'
  return level === 2
    ? `${cellLabel({ row: 'MP', size: 3 }, t)} ${cellLabel({ row: 'MP', size: 5 }, t)}`
    : `${cellLabel({ row: 'A', size: 4 }, t)} ${cellLabel({ row: 'd', size: 5 }, t)}`
}

/** Page: Quãng's settings, read from and written to the app store, and the start button. */
export function SetupPhase() {
  const { settings, updateSettings, updateDrill } = useAppStore()
  const own = intervals.of(settings)
  const level = own.level
  const reduce = useReducedMotion()
  const t = useT()
  const backLink = useBackLink()
  const best = getBest(intervals.id, level)

  const levelOptions = LEVELS.map(l => ({
    value: l,
    label: t(levelKey(l)),
    hint: t(levelDetailKey(l)),
    visual: <span className="text-[15px] font-semibold whitespace-nowrap tnum">{levelSample(l, t)}</span>,
  }))

  const namingSegments = [
    { value: 'letters' as const, label: 'C D E' },
    { value: 'solfege' as const, label: 'Do Re Mi' },
  ]

  const groups = [
    <OptionCards
      key="level"
      layout="row"
      label={t(S['setup.level'])}
      icon={<ArrowsVerticalIcon size={15} weight="bold" />}
      options={levelOptions} value={level} onChange={l => updateDrill(intervals.id, { level: l })}
    />,
    <DurationPicker
      key="length"
      durationSec={own.durationSec}
      onChange={durationSec => updateDrill(intervals.id, { durationSec })}
      t={t}
    />,
    <fieldset key="prefs" className="border-0 p-0">
      <FieldLegend icon={<SlidersHorizontalIcon size={15} weight="bold" />} label={t('setup.notesAndSound')} />
      <div className="divide-y divide-line rounded-2xl border border-line bg-raised">
        <SettingRow label={t(S['setup.hear'])} hint={t(S['setup.hear.hint'])}>
          <Switch
            checked={own.hear}
            label={t(S['setup.hear'])}
            onChange={hear => updateDrill(intervals.id, { hear })}
          />
        </SettingRow>
        <SettingRow label={t('setup.naming')}>
          <SegmentedControl
            compact
            label={t('setup.naming')}
            segments={namingSegments}
            value={settings.naming}
            onChange={naming => updateSettings({ naming })}
          />
        </SettingRow>
      </div>
    </fieldset>,
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-md flex-1 px-4 pt-4 pb-8 md:max-w-3xl md:px-8 md:pt-8">
        <div className="flex items-center gap-1">
          <Link to="/" onClick={backLink} aria-label={t('setup.back')}>
            <Button variant="quiet" className="px-2"><CaretLeftIcon size={22} weight="bold" /></Button>
          </Link>
          <h1 className="text-lg font-semibold md:text-2xl">{t(intervals.title)}</h1>
        </div>
        <p className="mt-1 text-sm leading-snug text-ink-faint md:mt-2 md:text-base">{t(S['setup.hint'])}</p>

        <div className="mt-5 flex flex-col gap-6 md:mt-8 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-7">
          {groups.map((group, i) => (
            <motion.div
              key={group.key}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={group.key === 'level' ? 'md:col-span-2' : undefined}
            >
              {group}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky rather than fixed: the phase wrapper animates a transform. */}
      <div className="sticky bottom-0 border-t border-line bg-raised/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-md flex-col gap-2.5 px-4 pt-3
                        pb-[max(1rem,env(safe-area-inset-bottom))] md:max-w-3xl md:flex-row
                        md:items-center md:justify-between md:gap-6 md:px-8 md:py-4">
          <div className="flex items-center justify-between gap-3 text-sm text-ink-soft md:flex-col md:items-start md:gap-0.5">
            <span>{sessionSummary(intervals, own, t)}</span>
            <span className="flex items-center gap-1.5">
              <TrophyIcon size={15} weight="fill" className="text-ink-faint" />
              {best
                ? <span>{t('setup.bestHere')} <span className="tnum font-semibold text-ink">{best.practiceScore}</span></span>
                : <span>{t('setup.noScoreYet')}</span>}
            </span>
          </div>
          <Button
            variant="cta"
            className="h-14 w-full text-lg md:w-56"
            onClick={() => useIntervalsStore.getState().start(settings)}
          >
            <PlayIcon size={20} weight="fill" /> {t('setup.start')}
          </Button>
        </div>
      </div>
    </div>
  )
}
