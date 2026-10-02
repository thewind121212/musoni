/**
 * The computer key that answers with this piano key, tucked in its corner.
 * Desktop only: a phone has no keyboard to learn.
 */
export function KeyHint({ hint }: { hint: string }) {
  return (
    <span className="absolute top-1 left-1.5 hidden font-mono text-[10px] uppercase opacity-50 md:block">
      {hint}
    </span>
  )
}
