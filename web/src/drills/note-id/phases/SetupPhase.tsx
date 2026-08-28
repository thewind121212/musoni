import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  CaretLeftIcon, LightningIcon, PlayIcon, SpeakerHighIcon, SpeakerSlashIcon,
  TimerIcon, TrophyIcon,
} from '@phosphor-icons/react'
import { useAppStore } from '../../../app/store'
import { useDrillStore } from '../store'
import { getBest } from '../../../progress/progressStore'
import { Button } from '../../../core/components/Button'
import { OptionCards } from '../../../core/components/OptionCard'
import { ClefGlyph } from '../../../core/components/Staff'
import { DURATIONS, LEVEL_INFO } from '../../../config/constants'

const LEVEL_OPTIONS = [
  { value: 1 as const, label: LEVEL_INFO[1].name, hint: LEVEL_INFO[1].detail, visual: <ClefGlyph clef="treble" width={30} height={44} /> },
  { value: 2 as const, label: LEVEL_INFO[2].name, hint: LEVEL_INFO[2].detail, visual: <ClefGlyph clef="treble" width={30} height={44} /> },
  { value: 3 as const, label: LEVEL_INFO[3].name, hint: LEVEL_INFO[3].detail, visual: <ClefGlyph clef="bass" width={34} height={44} /> },
  { value: 4 as const, label: LEVEL_INFO[4].name, hint: LEVEL_INFO[4].detail, visual: (
    <span className="flex items-center gap-0.5">
      <ClefGlyph clef="treble" width={22} height={40} />
      <ClefGlyph clef="bass" width={26} height={40} />
    </span>
  ) },
]

const NAMING_OPTIONS = [
  { value: 'letters' as const, label: 'Letters', hint: 'A to G', visual: <span className="text-xl font-semibold tracking-tight">C D E</span> },
  { value: 'solfege' as const, label: 'Solfege', hint: 'Do to Si', visual: <span className="text-xl font-semibold tracking-tight">Do Re Mi</span> },
]

const ACCIDENTAL_OPTIONS = [
  { value: false, label: 'Naturals only', hint: 'White keys', visual: <span className="text-3xl leading-none">&#9838;</span> },
  { value: true, label: 'Sharps and flats', hint: 'Adds # and b', visual: <span className="text-3xl leading-none">&#9839; &#9837;</span> },
]

const SOUND_OPTIONS = [
  { value: true, label: 'Play the note', hint: 'Hear each answer', visual: <SpeakerHighIcon size={30} weight="duotone" /> },
  { value: false, label: 'Silent', hint: 'No audio', visual: <SpeakerSlashIcon size={30} weight="duotone" /> },
]

export function SetupPhase() {
  const { settings, level, updateSettings, setLevel } = useAppStore()
  const reduce = useReducedMotion()
  const best = getBest('note-id', level, settings.durationSec)

  const durationOptions = DURATIONS.map(d => ({
    value: d.seconds,
    label: d.label,
    visual: d.seconds <= 30
      ? <LightningIcon size={26} weight="duotone" />
      : <TimerIcon size={26} weight="duotone" />,
  }))

  const groups = [
    <OptionCards key="level" label="Clef and range" options={LEVEL_OPTIONS} value={level} onChange={setLevel} />,
    <OptionCards key="length" label="Session length" columns={4} options={durationOptions}
      value={settings.durationSec} onChange={durationSec => updateSettings({ durationSec })} />,
    <OptionCards key="naming" label="Note names" options={NAMING_OPTIONS}
      value={settings.naming} onChange={naming => updateSettings({ naming })} />,
    <OptionCards key="accidentals" label="Sharps and flats" options={ACCIDENTAL_OPTIONS}
      value={settings.accidentals} onChange={accidentals => updateSettings({ accidentals })} />,
    <OptionCards key="sound" label="Sound" options={SOUND_OPTIONS}
      value={settings.sound} onChange={sound => updateSettings({ sound })} />,
  ]

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-4 pb-8">
      <div className="flex items-center gap-1">
        <Link to="/" aria-label="Back to home">
          <Button variant="quiet" className="px-2"><CaretLeftIcon size={22} weight="bold" /></Button>
        </Link>
        <h1 className="text-lg font-semibold">Note reading</h1>
      </div>

      <div className="mt-4 flex flex-col gap-6">
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
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <TrophyIcon size={16} weight="fill" className="text-ink-faint" />
            {best
              ? <span>Best here <span className="tnum font-semibold text-ink">{best.practiceScore}</span></span>
              : <span>No score yet at this setup</span>}
          </div>
          <Button
            variant="primary"
            className="h-14 w-full text-lg"
            onClick={() => useDrillStore.getState().start(level, settings)}
          >
            <PlayIcon size={20} weight="fill" /> Start
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
