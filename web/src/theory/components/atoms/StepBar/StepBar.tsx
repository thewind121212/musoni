interface Props {
  /** Steps in the lesson. */
  total: number
  /** Segments filled: the steps reached so far, the one shown included. */
  filled: number
  /** Spoken progress, e.g. "Step 3 of 6". */
  label: string
}

/** A lesson's progress as one short segment per step, filled up to the step shown. */
export function StepBar({ total, filled, label }: Props) {
  return (
    <div
      role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={total} aria-valuenow={filled}
      className="flex flex-1 gap-1"
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          data-filled={i < filled || undefined}
          className={'h-1.5 flex-1 rounded-full transition-colors duration-300 ' + (i < filled ? 'bg-accent' : 'bg-line')}
        />
      ))}
    </div>
  )
}
