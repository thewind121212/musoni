import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  CaretLeftIcon, ListNumbersIcon, PianoKeysIcon, PlayIcon, SpeakerHighIcon, StackSimpleIcon, TrophyIcon,
} from '@phosphor-icons/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { sessionSummary } from '@/app/drillPreset'
import { getBest } from '@/progress/progressStore'
import { Button, FieldLegend, Switch } from '@/core/components/atoms'
import { DurationPicker, OptionCards, SegmentedControl, SettingRow } from '@/core/components/molecules'
import { CHORD_LEVELS, CHORD_ROMAN_FROM } from '@/config/constants'
import { useChordStore } from '@/drills/chords/store'
import chords, { modeOf, sessionLevel, type ChordsMode } from '@/drills/chords/drill'
import { S, levelDetailKey, levelKey } from '@/drills/chords/strings'

const LEVELS = Object.keys(CHORD_LEVELS).map(Number)
/** What each level asks, written as it reads: a symbol or a numeral. */
const LEVEL_GLYPH: Record<number, string> = { 1: 'Dm', 2: 'F♯m', 3: 'B°', 4: 'C/E', 5: 'IV', 6: 'vi', 7: 'vii°' }
const NAME_LEVELS = CHORD_ROMAN_FROM - 1

function Glyph({ text }: { text: string }) {
  return <span className="text-lg leading-none font-semibold whitespace-nowrap">{text}</span>
}

/** Page: Hợp âm's settings, read from and written to the app store, and the start button. */
export function SetupPhase() {
  const { settings, updateSettings, updateDrill } = useAppStore()
  const own = chords.of(settings)
  const level = sessionLevel(own)
  const mode = modeOf(level)
  const reduce = useReducedMotion()
  const t = useT()
  const backLink = useBackLink()
  const best = getBest(chords.id, level)

  // Switching mode keeps the level's place: naming level 2 ↔ Roman level 2 (6).
  const setMode = (next: ChordsMode) => {
    if (next === mode) return
    const place = mode === 'roman' ? level - NAME_LEVELS : level
    const to = next === 'roman' ? Math.min(NAME_LEVELS + place, LEVELS.length) : Math.min(place, NAME_LEVELS)
    updateDrill(chords.id, { mode: next, level: to })
  }

  const modeOptions = (['name', 'roman'] as const).map(m => ({
    value: m,
    label: t(m === 'name' ? S['mode.name'] : S['mode.roman']),
    visual: <Glyph text={m === 'name' ? 'Am' : 'ii V'} />,
  }))
  const levelOptions = LEVELS.filter(l => modeOf(l) === mode).map(l => ({
    value: l,
    label: t(levelKey(l)),
    hint: t(levelDetailKey(l)),
    visual: <Glyph text={LEVEL_GLYPH[l]} />,
  }))

  const namingSegments = [
    { value: 'letters' as const, label: 'C D E' },
    { value: 'solfege' as const, label: 'Do Re Mi' },
  ]
  const padStyleSegments = [
    { value: 'piano' as const, label: t('setup.padStyle.piano') },
    { value: 'boxes' as const, label: t('setup.padStyle.boxes') },
  ]

  const groups = [
    <OptionCards
      key="mode"
      layout="row"
      label={t(S['setup.mode'])}
      icon={<ListNumbersIcon size={15} weight="fill" />}
      options={modeOptions} value={mode} onChange={setMode}
    />,
    <OptionCards
      key="level"
      layout="row"
      label={t(mode === 'roman' ? S['setup.level.roman'] : S['setup.level'])}
      icon={<StackSimpleIcon size={15} weight="fill" />}
      options={levelOptions} value={level} onChange={l => updateDrill(chords.id, { level: l, mode })}
    />,
    <DurationPicker
      key="length"
      durationSec={own.durationSec}
      onChange={durationSec => updateDrill(chords.id, { durationSec })}
      t={t}
    />,
    <fieldset key="listen" className="border-0 p-0">
      <FieldLegend icon={<SpeakerHighIcon size={15} weight="fill" />} label={t(S['setup.listen'])} />
      <div className="rounded-2xl border border-line bg-raised">
        <SettingRow label={t(S['setup.hear'])} hint={t(S['setup.hear.hint'])}>
          <Switch
            checked={own.listen}
            label={t(S['setup.hear'])}
            onChange={listen => updateDrill(chords.id, { listen })}
          />
        </SettingRow>
      </div>
    </fieldset>,
    <fieldset key="prefs" className="border-0 p-0">
      <FieldLegend icon={<PianoKeysIcon size={15} weight="fill" />} label={t(S['setup.answer'])} />
      <div className="divide-y divide-line rounded-2xl border border-line bg-raised">
        <SettingRow label={t('setup.naming')}>
          <SegmentedControl
            compact
            label={t('setup.naming')}
            segments={namingSegments}
            value={settings.naming}
            onChange={naming => updateSettings({ naming })}
          />
        </SettingRow>
        {mode === 'name' && (
          <>
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
          </>
        )}
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
          <h1 className="text-lg font-semibold md:text-2xl">{t(chords.title)}</h1>
        </div>
        <p className="mt-1 text-sm leading-snug text-ink-faint md:mt-2 md:text-base">
          {t(mode === 'roman' ? S['setup.hint.roman'] : S['setup.hint'])}
        </p>

        <div className="mt-5 flex flex-col gap-6 md:mt-8 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-7">
          {groups.map((group, i) => (
            <motion.div
              key={group.key}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={group.key === 'level' || group.key === 'mode' ? 'md:col-span-2' : undefined}
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
            <span>{sessionSummary(chords, { ...own, level }, t)}</span>
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
            onClick={() => useChordStore.getState().start(settings)}
          >
            <PlayIcon size={20} weight="fill" /> {t('setup.start')}
          </Button>
        </div>
      </div>
    </div>
  )
}
