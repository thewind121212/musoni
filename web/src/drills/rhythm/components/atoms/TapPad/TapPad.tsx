import { useState, type PointerEvent } from 'react'

interface Props {
  /** "Gõ". */
  label: string
  /** One line under it ("chạm, phím cách hoặc phím chữ"). */
  hint?: string
  /** A tap, with the press's event time (`timeStamp`, page clock, ms). */
  onTap: (timeStamp: number) => void
  /** Smaller, for the calibration panel. */
  compact?: boolean
  className?: string
}

/**
 * The big surface the rhythm is tapped on. It answers on the press itself
 * (pointer down), not on release, and passes the press's own event time, so
 * the time judged is when the finger landed, not when the page got round to
 * it. Keys (Space, letters) are the page's to listen for.
 */
export function TapPad({ label, hint, onTap, compact = false, className = '' }: Props) {
  const [pressed, setPressed] = useState(false)
  const down = (e: PointerEvent<HTMLButtonElement>) => {
    // A second finger is a second tap; a mouse's other buttons are not taps.
    if (e.pointerType === 'mouse' && e.button !== 0) return
    e.preventDefault()
    setPressed(true)
    onTap(e.timeStamp)
  }
  const up = () => setPressed(false)
  return (
    <button
      type="button"
      data-pressed={pressed || undefined}
      onPointerDown={down}
      onPointerUp={up}
      onPointerLeave={up}
      onPointerCancel={up}
      onContextMenu={e => e.preventDefault()}
      className={
        'flex w-full touch-none flex-col items-center justify-center gap-1 rounded-[1.75rem] bg-accent text-accent-ink ' +
        'select-none [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] ' +
        'transition-[transform,filter] duration-75 data-[pressed]:scale-[0.985] data-[pressed]:brightness-125 ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
        (compact ? 'min-h-24 ' : 'min-h-36 ') + className
      }
    >
      <span className={(compact ? 'text-xl ' : 'text-3xl ') + 'font-semibold'}>{label}</span>
      {hint && <span className="text-sm opacity-85">{hint}</span>}
    </button>
  )
}
