import type { KeyboardEvent, PointerEvent } from 'react'
import { MiniKeyboard } from '@/core/components/atoms'

interface Props {
  /** Lowest and highest octave offered, in scientific pitch (4 holds middle C). */
  min: number
  max: number
  value: number
  onChange: (octave: number) => void
  /** Names the control for screen readers ("Quãng tám để trả lời"). */
  label: string
  /** The value as words, read out and shown nowhere else ("Quãng 4"). */
  valueText: string
}

const STEP: Record<string, number> = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }

/**
 * A thin keyboard across a few octaves with a window over one of them, like
 * the range strip of a phone piano app: tap a point or drag along it and the
 * window snaps to that whole octave. Octave numbers sit under each one.
 *
 * A slider for assistive tech and the keyboard (arrows step, Home / End go to
 * the ends). Arrow keys it handles are marked handled (`preventDefault`), so a
 * page-wide shortcut on the same keys can leave them alone.
 */
export function OctaveStrip({ min, max, value, onChange, label, valueText }: Props) {
  const count = max - min + 1
  const clamp = (n: number) => Math.min(max, Math.max(min, n))
  const move = (n: number) => { if (n !== value) onChange(n) }

  const fromPointer = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    if (r.width > 0) move(clamp(min + Math.floor(((e.clientX - r.left) / r.width) * count)))
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = e.key in STEP ? clamp(value + STEP[e.key]) : e.key === 'Home' ? min : e.key === 'End' ? max : null
    if (n === null) return
    e.preventDefault()
    move(n)
  }

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={valueText}
      aria-orientation="horizontal"
      onPointerDown={e => {
        // Captured, a drag keeps steering the window past either end.
        e.currentTarget.setPointerCapture?.(e.pointerId)
        fromPointer(e)
      }}
      onPointerMove={e => { if (e.buttons) fromPointer(e) }}
      onKeyDown={onKeyDown}
      className="cursor-pointer touch-none rounded-lg select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative h-11">
        <MiniKeyboard lit={[]} octaves={count} stretch />
        <div
          data-testid="octave-window"
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 rounded-md border-2 border-cta bg-cta/30 transition-[left] duration-150 motion-reduce:transition-none"
          style={{ left: `${((value - min) / count) * 100}%`, width: `${100 / count}%` }}
        />
      </div>
      <div className="mt-0.5 flex" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => min + i).map(o => (
          <span
            key={o}
            className={'tnum flex-1 text-center text-xs ' + (o === value ? 'font-semibold text-ink' : 'text-ink-faint')}
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  )
}
