import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  CaretLeftIcon, LightningIcon, MusicNoteIcon, PlayIcon, SpeakerHighIcon,
  SpeakerSlashIcon, TextAaIcon, TimerIcon, TrophyIcon,
} from '@phosphor-icons/react'
import { useAppStore } from '../../../app/store'
import { useDrillStore } from '../store'
import { getBest } from '../../../progress/progressStore'
import { Button } from '../../../core/components/Button'
import { OptionCards } from '../../../core/components/OptionCard'
import { ClefGlyph } from '../../../core/components/Staff'
import { DURATIONS } from '../../../config/constants'
import { useT } from '../../../app/useT'





const LEVELS = [1, 2, 3, 4] as const

export function SetupPhase() {
  const { settings, updateSettings, setLevel } = useAppStore()
  const level = settings.level
  const reduce = useReducedMotion()
  const t = useT()
  const best = getBest('note-id', level, settings.durationSec)

  const levelOptions = LEVELS.map(l => ({
    value: l,
    label: t(`level.${l}` as 'level.1'),
    hint: t(`level.${l}.detail` as 'level.1.detail'),
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

  const durationOptions = DURATIONS.map(d => ({
    value: d.seconds,
    label: t(`duration.${d.seconds}` as 'duration.60'),
    visual: d.seconds <= 30
      ? <LightningIcon size={26} weight="duotone" />
      : <TimerIcon size={26} weight="duotone" />,
  }))

  const namingOptions = [
    { value: 'letters' as const, label: t('naming.letters'), hint: t('naming.letters.hint'),
      visual: <span className="text-xl font-semibold tracking-tight">C D E</span> },
    { value: 'solfege' as const, label: t('naming.solfege'), hint: t('naming.solfege.hint'),
      visual: <span className="text-xl font-semibold tracking-tight">Do Re Mi</span> },
  ]

  const accidentalOptions = [
    { value: false, label: t('accidentals.off'), hint: t('accidentals.off.hint'),
      visual: <span className="text-3xl leading-none">&#9838;</span> },
    { value: true, label: t('accidentals.on'), hint: t('accidentals.on.hint'),
      visual: <span className="text-3xl leading-none">&#9839; &#9837;</span> },
  ]

  const soundOptions = [
    { value: true, label: t('sound.on'), hint: t('sound.on.hint'),
      visual: <SpeakerHighIcon size={30} weight="duotone" /> },
    { value: false, label: t('sound.off'), hint: t('sound.off.hint'),
      visual: <SpeakerSlashIcon size={30} weight="duotone" /> },
  ]

  const groups = [
    <OptionCards
      key="level"
      label={t('setup.clef')}
      description={t('setup.clef.what')}
      icon={<MusicNoteIcon size={15} weight="fill" />}
      options={levelOptions} value={level} onChange={setLevel}
    />,
    <OptionCards
      key="length"
      label={t('setup.length')}
      description={t('setup.length.what')}
      icon={<TimerIcon size={15} weight="bold" />}
      columns={4} options={durationOptions}
      value={settings.durationSec} onChange={durationSec => updateSettings({ durationSec })}
    />,
    <OptionCards
      key="naming"
      label={t('setup.naming')}
      description={t('setup.naming.what')}
      icon={<TextAaIcon size={15} weight="bold" />}
      options={namingOptions}
      value={settings.naming} onChange={naming => updateSettings({ naming })}
    />,
    <OptionCards
      key="accidentals"
      label={t('setup.accidentals')}
      description={t('setup.accidentals.what')}
      icon={<span className="text-[15px] leading-none font-semibold">&#9839;</span>}
      options={accidentalOptions}
      value={settings.accidentals} onChange={accidentals => updateSettings({ accidentals })}
    />,
    <OptionCards
      key="sound"
      label={t('setup.sound')}
      description={t('setup.sound.what')}
      icon={<SpeakerHighIcon size={15} weight="bold" />}
      options={soundOptions}
      value={settings.sound} onChange={sound => updateSettings({ sound })}
    />,
  ]

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-4 pb-8 md:max-w-3xl md:px-8 md:pt-8">
      <div className="flex items-center gap-1">
        <Link to="/" aria-label={t('setup.back')}>
          <Button variant="quiet" className="px-2"><CaretLeftIcon size={22} weight="bold" /></Button>
        </Link>
        <h1 className="text-lg font-semibold md:text-2xl">{t('home.noteReading')}</h1>
      </div>

      <div className="mt-4 flex flex-col gap-6 md:mt-8 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-7">
        {groups.map((group, i) => (
          <motion.div
            key={group.key}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            {group}
          </motion.div>
        ))}

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: groups.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between md:gap-6"
        >
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <TrophyIcon size={16} weight="fill" className="text-ink-faint" />
            {best
              ? <span>{t('setup.bestHere')} <span className="tnum font-semibold text-ink">{best.practiceScore}</span></span>
              : <span>{t('setup.noScoreYet')}</span>}
          </div>
          <Button
            variant="primary"
            className="h-14 w-full text-lg md:w-56"
            onClick={() => useDrillStore.getState().start(level, settings)}
          >
            <PlayIcon size={20} weight="fill" /> {t('setup.start')}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
