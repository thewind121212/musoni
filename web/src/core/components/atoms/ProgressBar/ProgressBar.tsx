interface Props {
  /** How full the bar is, 0..1. */
  fraction: number
  /** Turns the bar red, e.g. for the last seconds of a timer. */
  urgent?: boolean
  /** Length of the linear slide between updates, matched to the update rate. */
  transitionMs?: number
}

/** A thin track that fills from the left. */
export function ProgressBar({ fraction, urgent = false, transitionMs = 0 }: Props) {
  return (
    <div className="h-1 overflow-hidden rounded-full bg-line">
      <div
        className={'h-full rounded-full ' + (urgent ? 'bg-wrong' : 'bg-accent')}
        style={{ width: `${fraction * 100}%`, transition: `width ${transitionMs}ms linear` }}
      />
    </div>
  )
}
