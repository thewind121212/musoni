interface Props {
  /** Progress so far, in the same unit as the goal. */
  value: number
  goal: number
  /** The unit under the number, e.g. "min". */
  unit: string
}

const R = 36
const C = 2 * Math.PI * R

/** Progress toward a goal as a ring, with "value/goal" in the middle. */
export function GoalRing({ value, goal, unit }: Props) {
  const done = Math.min(1, goal > 0 ? value / goal : 0)
  return (
    <div className="relative size-20 shrink-0">
      <svg viewBox="0 0 84 84" className="size-full -rotate-90" aria-hidden>
        <circle cx="42" cy="42" r={R} fill="none" strokeWidth="9" className="stroke-line" />
        <circle
          cx="42" cy="42" r={R} fill="none" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - done)}
          data-testid="goal-arc"
          className={'transition-[stroke-dashoffset] duration-500 ' + (done >= 1 ? 'stroke-correct' : 'stroke-accent')}
          // A zero-length round cap still draws a dot; hide the arc until there is progress.
          opacity={done > 0 ? 1 : 0}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="tnum text-xl font-semibold">
          {value}<span className="text-sm text-ink-faint">/{goal}</span>
        </span>
        <span className="mt-0.5 text-[11px] text-ink-faint">{unit}</span>
      </div>
    </div>
  )
}
