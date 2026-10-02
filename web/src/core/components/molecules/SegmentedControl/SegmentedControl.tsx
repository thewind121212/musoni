export interface Segment<T> {
  value: T
  label: string
  hint?: string
}

interface Props<T extends string | number | boolean> {
  label: string
  segments: readonly Segment<T>[]
  value: T
  onChange: (value: T) => void
  columns?: number
  /**
   * A small track with no visible heading, for the right side of a SettingRow.
   * The label still names the group for screen readers.
   */
  compact?: boolean
}

/**
 * One-tap choice row. Used for every drill setting so the setup screen reads as
 * one consistent control rather than a pile of different widgets.
 * Radius lock exception, documented: segments are pills, surfaces are rounded-2xl.
 */
export function SegmentedControl<T extends string | number | boolean>({
  label, segments, value, onChange, columns = segments.length, compact = false,
}: Props<T>) {
  if (compact) {
    return (
      <div role="radiogroup" aria-label={label} className="flex shrink-0 rounded-xl bg-line/60 p-0.5">
        {segments.map(seg => {
          const selected = seg.value === value
          return (
            <button
              key={String(seg.value)}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(seg.value)}
              className={
                'min-h-9 rounded-[10px] px-3 text-sm font-medium transition-[background-color,color] duration-150 ' +
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
                (selected ? 'bg-raised text-ink shadow-sm' : 'text-ink-soft hover:text-ink')
              }
            >
              {seg.label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-2 text-sm font-medium text-ink-soft">{label}</div>
      <div
        role="radiogroup"
        aria-label={label}
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {segments.map(seg => {
          const selected = seg.value === value
          return (
            <button
              key={String(seg.value)}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(seg.value)}
              className={
                'min-h-12 rounded-full px-3 text-center transition-[background-color,color,border-color] ' +
                'duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 ' +
                'focus-visible:outline-accent ' +
                (selected
                  ? 'bg-accent text-accent-ink'
                  : 'border border-line bg-raised text-ink-soft hover:text-ink')
              }
            >
              <span className="block text-[15px] leading-tight font-medium">{seg.label}</span>
              {seg.hint && (
                <span className={'block text-[11px] leading-tight ' + (selected ? 'opacity-80' : 'text-ink-faint')}>
                  {seg.hint}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
