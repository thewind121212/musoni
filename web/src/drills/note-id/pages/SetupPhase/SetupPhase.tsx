import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  CaretLeftIcon, MusicNoteIcon, PlayIcon, SlidersHorizontalIcon, TrophyIcon,
} from '@phosphor-icons/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { useDrillStore } from '@/drills/note-id/store'
import { getBest } from '@/progress/progressStore'
import { Button, FieldLegend, Switch } from '@/core/components/atoms'
import { DurationPicker, OptionCards, SegmentedControl, SettingRow } from '@/core/components/molecules'
import { ClefGlyph } from '@/core/components/organisms'
import { sessionSummary } from '@/app/drillPreset'
import noteId from '@/drills/note-id/drill'
import { S, levelDetailKey, levelKey } from '@/drills/note-id/strings'

const LEVELS = [1, 2, 3, 4] as const

/** Page: the drill's settings, read from and written to the app store, and the start button. */
export function SetupPhase() {
  const { settings, updateSettings, updateDrill } = useAppStore()
  const own = noteId.of(settings)
  const level = own.level
  const reduce = useReducedMotion()
  const t = useT()
  const backLink = useBackLink()
  const best = getBest('note-id', level)

  const levelOptions = LEVELS.map(l => ({
    value: l,
    label: t(levelKey(l)),
    hint: t(levelDetailKey(l)),
    visual: l === 3
      ? <ClefGlyph clef="bass" />
      : l === 4
        ? (
          <span className="flex h-full items-center gap-1.5">
            <ClefGlyph clef="treble" />
            <ClefGlyph clef="bass" />
          </span>
        )
        : <ClefGlyph clef="treble" />,
  }))

  const namingSegments = [
    { value: 'letters' as const, label: 'C D E' },
    { value: 'solfege' as const, label: 'Do Re Mi' },
  ]

  const padStyleSegments = [
    { value: 'piano' as const, label: t('setup.padStyle.piano') },
    { value: 'boxes' as const, label: t('setup.padStyle.boxes') },
  ]

  const summary = sessionSummary(noteId, own, t)

  // Level and length are what a session practises, so they keep their large
  // controls; the rest are yes-or-no or two-way preferences, one row each.
  const groups = [
    <OptionCards
      key="level"
      layout="row"
      label={t(S.clef)}
      icon={<MusicNoteIcon size={15} weight="fill" />}
      options={levelOptions} value={level} onChange={l => updateDrill(noteId.id, { level: l })}
    />,
    <DurationPicker
      key="length"
      durationSec={own.durationSec}
      onChange={durationSec => updateDrill(noteId.id, { durationSec })}
      t={t}
    />,
    <fieldset key="prefs" className="border-0 p-0">
      <FieldLegend icon={<SlidersHorizontalIcon size={15} weight="bold" />} label={t('setup.notesAndSound')} />
      <div className="divide-y divide-line rounded-2xl border border-line bg-raised">
        <SettingRow label={t('setup.accidentals')} hint={t('setup.accidentals.hint')}>
          <Switch
            checked={own.accidentals}
            label={t('setup.accidentals')}
            onChange={accidentals => updateDrill(noteId.id, { accidentals })}
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
        <SettingRow label={t('setup.padStyle')}>
          <SegmentedControl
            compact
            label={t('setup.padStyle')}
            segments={padStyleSegments}
            value={settings.padStyle}
            onChange={padStyle => updateSettings({ padStyle })}
          />
        </SettingRow>
        <SettingRow label={t('setup.keyLabels')} hint={t('setup.keyLabels.hint')}>
          <Switch
            checked={settings.keyLabels}
            label={t('setup.keyLabels')}
            onChange={keyLabels => updateSettings({ keyLabels })}
          />
        </SettingRow>
        <SettingRow label={t('setup.sound')} hint={t('setup.sound.hint')}>
          <Switch
            checked={settings.sound}
            label={t('setup.sound')}
            onChange={sound => updateSettings({ sound })}
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
          <h1 className="text-lg font-semibold md:text-2xl">{t(noteId.title)}</h1>
        </div>

        <div className="mt-4 flex flex-col gap-6 md:mt-8 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-7">
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

      {/* Sticky, so Start is on screen however far the settings run. Sticky
          rather than fixed: the phase wrapper animates a transform, which
          would pin a fixed bar to the wrapper instead of the viewport. */}
      <div className="sticky bottom-0 border-t border-line bg-raised/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-md flex-col gap-2.5 px-4 pt-3
                        pb-[max(1rem,env(safe-area-inset-bottom))] md:max-w-3xl md:flex-row
                        md:items-center md:justify-between md:gap-6 md:px-8 md:py-4">
          <div className="flex items-center justify-between gap-3 text-sm text-ink-soft md:flex-col md:items-start md:gap-0.5">
            <span>{summary}</span>
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
            onClick={() => useDrillStore.getState().start(settings)}
          >
            <PlayIcon size={20} weight="fill" /> {t('setup.start')}
          </Button>
        </div>
      </div>
    </div>
  )
}
