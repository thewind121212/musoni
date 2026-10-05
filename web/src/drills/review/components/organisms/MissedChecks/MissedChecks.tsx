import { Link } from 'react-router-dom'
import { BookOpenIcon, CaretRightIcon } from '@phosphor-icons/react'

export interface MissedCheck {
  id: string
  /** The question as asked, as plain text. */
  prompt: string
  /** Its lesson: "Bài 1.2 · Khuông nhạc và khóa". */
  lesson: string
  /** The lesson's route. */
  to: string
  /** Times missed this session; shown from two. */
  count: number
}

interface Props {
  heading: string
  /** "2 câu sai". */
  countLabel: string
  misses: MissedCheck[]
  /** Route state for the lesson page (it goes back here on ✕). */
  linkState?: unknown
}

/**
 * The questions a review session got wrong, each with the lesson it comes
 * from, one tap away: the part of the session worth reading again.
 */
export function MissedChecks({ heading, countLabel, misses, linkState }: Props) {
  if (misses.length === 0) return null
  return (
    <section>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold">{heading}</h2>
        <span className="shrink-0 text-xs text-ink-faint">{countLabel}</span>
      </div>
      <ul className="mt-2.5 divide-y divide-line rounded-2xl border border-line bg-raised">
        {misses.map(m => (
          <li key={m.id}>
            <Link
              to={m.to}
              state={linkState}
              className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-surface
                         focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] leading-snug text-ink">
                  {m.prompt}
                  {m.count > 1 && <span className="ml-1.5 text-xs font-semibold text-wrong">{'×'}{m.count}</span>}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-xs text-ink-faint">
                  <BookOpenIcon size={12} weight="fill" aria-hidden />
                  {m.lesson}
                </span>
              </span>
              <CaretRightIcon size={14} weight="bold" className="shrink-0 text-ink-faint" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
