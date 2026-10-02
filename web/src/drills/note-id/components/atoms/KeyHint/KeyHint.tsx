/**
 * The computer key that answers with this piano key. Desktop only: a phone has
 * no keyboard to learn. On a piano key it is a small keycap under the name; on
 * a box key it is tucked in the top-left corner.
 */
export function KeyHint({ hint, corner = false }: { hint: string; corner?: boolean }) {
  return (
    <span
      className={
        corner
          ? 'absolute top-1 left-1.5 hidden font-mono text-[10px] uppercase opacity-50 md:block'
          : 'hidden rounded border border-current/25 px-1 font-mono text-[10px] leading-4 uppercase opacity-60 md:block'
      }
    >
      {hint}
    </span>
  )
}
