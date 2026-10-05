import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  title: string
  /** What choosing it starts: "Học bài đầu tiên: 3 phút". */
  detail: string
  onChoose: () => void
}

/** One answer to the first-open question: a large card that starts where it says. */
export function StartOption({ icon, title, detail, onChoose }: Props) {
  return (
    <button
      onClick={onChoose}
      className="flex w-full items-center gap-4 rounded-2xl border border-line bg-raised p-5 text-left
                 transition-[border-color,transform] duration-150 hover:border-ink-faint active:scale-[0.99]
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[17px] leading-snug font-semibold text-ink">{title}</span>
        <span className="block text-sm text-ink-soft">{detail}</span>
      </span>
    </button>
  )
}
