import { Link } from 'react-router-dom'
import { CaretRightIcon, MusicNotesIcon, WaveformIcon } from '@phosphor-icons/react'
import { WeekStrip } from './WeekStrip'
import { useAppStore } from './store'
import { getBest } from '../progress/progressStore'
import { LEVEL_INFO } from '../config/constants'

export function HomeScreen() {
  const { level, settings } = useAppStore()
  const best = getBest('note-id', level, settings.durationSec)

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pt-10 pb-12">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">musoni</h1>
        <p className="mt-1 text-ink-soft">Read sheet music faster, a few minutes a day.</p>
      </header>

      <WeekStrip />

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-ink-soft">Training</h2>

        <Link
          to="/train/note-id"
          className="group flex items-center gap-4 rounded-2xl border border-line bg-raised p-5
                     transition-[border-color,transform] duration-150 hover:border-accent active:scale-[0.99]
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
            <MusicNotesIcon size={22} weight="fill" />
          </span>
          <span className="flex-1">
            <span className="block font-medium">Note reading</span>
            <span className="block text-sm text-ink-faint">
              {LEVEL_INFO[level].name}
              {best ? ` · best ${best.practiceScore}` : ' · not played yet'}
            </span>
          </span>
          <CaretRightIcon size={18} className="text-ink-faint transition-transform group-hover:translate-x-0.5" />
        </Link>

        <div className="flex items-center gap-4 rounded-2xl border border-dashed border-line p-5 opacity-70">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-line text-ink-faint">
            <WaveformIcon size={22} />
          </span>
          <span className="flex-1">
            <span className="block font-medium text-ink-soft">Complete the measure</span>
            <span className="block text-sm text-ink-faint">Rhythm training, coming next</span>
          </span>
        </div>
      </div>
    </div>
  )
}
