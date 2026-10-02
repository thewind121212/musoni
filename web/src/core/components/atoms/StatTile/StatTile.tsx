interface Props {
  value: string
  label: string
  /**
   * No surface of its own, centred: for tiles that sit side by side inside one
   * shared frame rather than as separate cards.
   */
  compact?: boolean
}

/** One figure: the value large, its name underneath. */
export function StatTile({ value, label, compact = false }: Props) {
  return (
    <div className={compact ? 'px-1 py-3 text-center' : 'rounded-2xl border border-line bg-raised px-4 py-3'}>
      <div className={'tnum font-semibold ' + (compact ? 'text-lg' : 'text-xl')}>{value}</div>
      <div className="text-xs leading-tight text-ink-faint">{label}</div>
    </div>
  )
}
