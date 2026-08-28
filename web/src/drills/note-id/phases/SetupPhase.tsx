import { CaretLeftIcon, PlayIcon } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useAppStore } from '../../../app/store'
import { useDrillStore } from '../store'
import { getBest } from '../../../progress/progressStore'
import { Button } from '../../../core/components/Button'
import { Panel } from '../../../core/components/Panel'
import { SegmentedControl } from '../../../core/components/SegmentedControl'
import { DURATIONS, LEVEL_INFO } from '../../../config/constants'

const LEVELS = [1, 2, 3, 4] as const

export function SetupPhase() {
  const { settings, level, updateSettings, setLevel } = useAppStore()
  const best = getBest('note-id', level, settings.durationSec)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 pt-4 pb-10">
      <div className="flex items-center gap-2">
        <Link to="/" aria-label="Back to home">
          <Button variant="quiet" className="px-2"><CaretLeftIcon size={22} weight="bold" /></Button>
        </Link>
        <h1 className="text-lg font-semibold">Note reading</h1>
      </div>

      <SegmentedControl
        label="Level"
        columns={4}
        value={level}
        onChange={setLevel}
        segments={LEVELS.map(l => ({ value: l, label: LEVEL_INFO[l].name, hint: `L${l}` }))}
      />
      <p className="-mt-2 text-sm text-ink-faint">{LEVEL_INFO[level].detail}</p>

      <SegmentedControl
        label="Session length"
        columns={4}
        value={settings.durationSec}
        onChange={durationSec => updateSettings({ durationSec })}
        segments={DURATIONS.map(d => ({ value: d.seconds, label: d.label }))}
      />

      <SegmentedControl
        label="Note names"
        value={settings.naming}
        onChange={naming => updateSettings({ naming })}
        segments={[
          { value: 'letters' as const, label: 'C D E' },
          { value: 'solfege' as const, label: 'Do Re Mi' },
        ]}
      />

      <SegmentedControl
        label="Sharps and flats"
        value={settings.accidentals}
        onChange={accidentals => updateSettings({ accidentals })}
        segments={[
          { value: false, label: 'Naturals only' },
          { value: true, label: 'Include # and b' },
        ]}
      />

      <SegmentedControl
        label="Sound"
        value={settings.sound}
        onChange={sound => updateSettings({ sound })}
        segments={[
          { value: true, label: 'Play the note' },
          { value: false, label: 'Silent' },
        ]}
      />

      <Panel className="flex items-center justify-between">
        <div>
          <div className="text-sm text-ink-soft">Your best here</div>
          <div className="text-xs text-ink-faint">
            {LEVEL_INFO[level].name} at {DURATIONS.find(d => d.seconds === settings.durationSec)?.label}
          </div>
        </div>
        <div className="tnum text-2xl font-semibold">
          {best ? best.practiceScore : <span className="text-base text-ink-faint">New</span>}
        </div>
      </Panel>

      <Button
        variant="primary"
        className="h-14 w-full text-lg"
        onClick={() => useDrillStore.getState().start(level, settings)}
      >
        <PlayIcon size={20} weight="fill" /> Start
      </Button>
    </div>
  )
}
