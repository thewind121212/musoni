interface Props {
  /** How many dots (the count-in's clicks). */
  count: number
  /** How many have sounded. */
  lit: number
  /** Screen-reader name for the row ("count-in"). */
  label: string
}

/** A row of dots that fill one by one as the clicks sound: the count-in, seen. */
export function BeatDots({ count, lit, label }: Props) {
  return (
    <div role="img" aria-label={`${label} ${Math.min(lit, count)}/${count}`} className="flex items-center gap-2">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          data-lit={i < lit || undefined}
          className="size-3 rounded-full border-2 border-accent/35 transition-[background-color,border-color,transform]
                     duration-100 data-[lit]:scale-110 data-[lit]:border-accent data-[lit]:bg-accent md:size-3.5"
        />
      ))}
    </div>
  )
}
