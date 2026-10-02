/**
 * The computer key that answers with this piano key, a small keycap under its
 * name. Desktop only: a phone has no keyboard to learn.
 */
export function KeyHint({ hint }: { hint: string }) {
  return (
    <span className="hidden rounded border border-current/25 px-1 font-mono text-[10px] leading-4 uppercase opacity-60 md:block">
      {hint}
    </span>
  )
}
