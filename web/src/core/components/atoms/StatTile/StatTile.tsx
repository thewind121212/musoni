/** One figure on its own surface: the value large, its name underneath. */
export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-raised px-4 py-3">
      <div className="tnum text-xl font-semibold">{value}</div>
      <div className="text-xs text-ink-faint">{label}</div>
    </div>
  )
}
