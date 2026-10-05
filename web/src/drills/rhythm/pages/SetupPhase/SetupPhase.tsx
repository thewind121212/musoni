import { useCallback, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { CaretLeftIcon, MetronomeIcon, MusicNotesIcon, PlayIcon, TrophyIcon } from '@phosphor-icons/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { sessionSummary } from '@/app/drillPreset'
import { getBest } from '@/progress/progressStore'
import { Button, FieldLegend, Switch } from '@/core/components/atoms'
import { DurationPicker, OptionCards, SegmentedControl, SettingRow } from '@/core/components/molecules'
import { NoteStaff } from '@/core/components/organisms'
import { parseNotation } from '@/core/music/notation'
import { RHYTHM_TEMPOS } from '@/config/constants'
import { useRhythmStore } from '@/drills/rhythm/store'
import { wakeAudio } from '@/drills/rhythm/metronome'
import { useCalibration } from '@/drills/rhythm/useCalibration'
import { CalibrationPanel } from '@/drills/rhythm/components/organisms'
import rhythm from '@/drills/rhythm/drill'
import { S, levelDetailKey, levelKey } from '@/drills/rhythm/strings'

const LEVELS = [1, 2, 3, 4] as const
/** A figure from each level, to show what it asks. */
const LEVEL_FIGURES: Record<(typeof LEVELS)[number], string> = {
  1: 'B4:h B4:q B4:q',
  2: 'B4:8 B4:8 R:q B4:q',
  3: 'B4:q. B4:8 B4:q~ B4:q',
  4: '3( B4:8 B4:8 B4:8 ) B4:16 B4:16 B4:8',
}

/** Page: Tiết tấu's settings (level, tempo, click, length, tap latency) and the start button. */
export function SetupPhase() {
  const { settings, updateDrill } = useAppStore()
  const own = rhythm.of(settings)
  const level = own.level
  const reduce = useReducedMotion()
  const t = useT()
  const backLink = useBackLink()
  const best = getBest(rhythm.id, level)
  const [calibrating, setCalibrating] = useState(false)
  const save = useCallback((latencyMs: number) => updateDrill(rhythm.id, { latencyMs }), [updateDrill])
  const calibration = useCalibration(save)
  const figures = useMemo(() => LEVELS.map(l => parseNotation(LEVEL_FIGURES[l])), [])

  const levelOptions = LEVELS.map(l => ({
    value: l,
    label: t(levelKey(l)),
    hint: t(levelDetailKey(l)),
    visual: (
      <span className="block w-24">
        <NoteStaff clef="none" events={figures[l - 1]} width={150} />
      </span>
    ),
  }))
  const tempoSegments = RHYTHM_TEMPOS.map(bpm => ({ value: bpm, label: String(bpm) }))

  const closeCalibration = () => {
    calibration.reset()
    setCalibrating(false)
  }

  const groups = [
    <OptionCards
      key="level"
      label={t(S['setup.level'])}
      icon={<MusicNotesIcon size={15} weight="fill" />}
      options={levelOptions} value={level} onChange={l => updateDrill(rhythm.id, { level: l })}
    />,
    <fieldset key="beat" className="border-0 p-0">
      <FieldLegend icon={<MetronomeIcon size={15} weight="fill" />} label={t(S['setup.beat'])} />
      <div className="divide-y divide-line rounded-2xl border border-line bg-raised">
        <SettingRow label={t(S['setup.tempo'])} hint={`♩ = ${own.tempo}`}>
          <SegmentedControl
            compact
            label={t(S['setup.tempo'])}
            segments={tempoSegments}
            value={own.tempo}
            onChange={tempo => updateDrill(rhythm.id, { tempo })}
          />
        </SettingRow>
        <SettingRow label={t(S['setup.click'])} hint={t(S['setup.click.hint'])}>
          <Switch checked={own.click} label={t(S['setup.click'])} onChange={click => updateDrill(rhythm.id, { click })} />
        </SettingRow>
        <SettingRow
          label={t(S['setup.latency'])}
          hint={own.latencyMs === null ? t(S['setup.latency.none']) : t(S['setup.latency.value'], { ms: own.latencyMs })}
        >
          <Button
            className="min-h-10 shrink-0 px-3.5 text-sm"
            aria-expanded={calibrating}
            onClick={() => (calibrating ? closeCalibration() : setCalibrating(true))}
          >
            {t(S['setup.calibrate'])}
          </Button>
        </SettingRow>
      </div>
      {calibrating && (
        <div className="mt-2">
          <CalibrationPanel
            status={calibration.status}
            heard={calibration.heard}
            total={calibration.total}
            outcome={calibration.outcome}
            onStart={calibration.start}
            onTap={calibration.tap}
            onClose={closeCalibration}
            t={t}
          />
        </div>
      )}
    </fieldset>,
    <DurationPicker
      key="length"
      durationSec={own.durationSec}
      onChange={durationSec => updateDrill(rhythm.id, { durationSec })}
      t={t}
    />,
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-md flex-1 px-4 pt-4 pb-8 md:max-w-3xl md:px-8 md:pt-8">
        <div className="flex items-center gap-1">
          <Link to="/" onClick={backLink} aria-label={t('setup.back')}>
            <Button variant="quiet" className="px-2"><CaretLeftIcon size={22} weight="bold" /></Button>
          </Link>
          <h1 className="text-lg font-semibold md:text-2xl">{t(rhythm.title)}</h1>
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
            <span>{sessionSummary(rhythm, own, t)}</span>
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
            onClick={() => {
              // The tap that starts is the gesture the browser needs to let the clicks sound.
              wakeAudio()
              useRhythmStore.getState().start(settings)
            }}
          >
            <PlayIcon size={20} weight="fill" /> {t('setup.start')}
          </Button>
        </div>
      </div>
    </div>
  )
}
