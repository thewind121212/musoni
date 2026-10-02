interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
  /** Accessible name; the visible label sits beside the switch in its row. */
  label: string
}

/** An on/off setting. Use for a yes-or-no choice that needs no picture. */
export function Switch({ checked, onChange, label }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={
        'relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150 ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
        (checked ? 'bg-accent' : 'bg-line')
      }
    >
      <span
        aria-hidden
        className={
          'absolute top-1 left-1 size-5 rounded-full bg-raised shadow-sm transition-transform duration-150 ' +
          (checked ? 'translate-x-5' : 'translate-x-0')
        }
      />
    </button>
  )
}
