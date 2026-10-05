import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { BookOpenIcon, PlayIcon } from '@phosphor-icons/react'
import { ProgressBar } from '@/core/components/atoms'

export interface TheoryNext {
  /** "Bài tiếp" or "Bài đầu tiên". */
  label: string
  title: string
  /** The lesson's route. */
  to: string
  /** "Học tiếp · 4 phút". */
  action: string
}

interface Props {
  title: string
  /** The next lesson on the path; null once every lesson is done. */
  next: TheoryNext | null
  /** The chapter the next lesson is in: "Chương 1 · Cao độ & khuông nhạc", "1/5 bài". */
  chapter: { label: string; progress: string; fraction: number } | null
  /** Shown instead of the next lesson once all are done. */
  doneLabel: string
  allLabel: string
  allTo: string
  /** The lesson list is still loading: hold the card's place. */
  loading?: boolean
}

/**
 * Home's theory card: where the reader is in the lessons and one amber tap to
 * carry on with the next one, plus the way to the full list.
 */
export function TheoryCard({ title, next, chapter, doneLabel, allLabel, allTo, loading = false }: Props) {
  const reduce = useReducedMotion()
  if (loading) return <div aria-busy="true" className="h-60 rounded-2xl border border-line bg-raised" />
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-5">
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-ink">
          <BookOpenIcon size={24} weight="fill" />
        </span>
        <div className="min-w-0">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-ink-faint">
            {next ? <>{next.label}: <b className="font-semibold text-ink">{next.title}</b></> : doneLabel}
          </p>
        </div>
      </div>

      {chapter && (
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between gap-3 text-xs font-semibold text-ink-faint">
            <span className="min-w-0 tracking-wide uppercase">{chapter.label}</span>
            <span className="shrink-0 whitespace-nowrap">{chapter.progress}</span>
          </div>
          <ProgressBar fraction={chapter.fraction} />
        </div>
      )}

      <div className="flex flex-col items-stretch gap-1 sm:flex-row-reverse sm:items-center sm:gap-4">
        {next && (
          <motion.div whileTap={reduce ? undefined : { scale: 0.98 }} className="sm:w-56">
            <Link
              to={next.to}
              className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-cta px-3 text-base font-semibold
                         text-cta-ink shadow-sm transition-[filter] duration-150 hover:brightness-95
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <PlayIcon size={18} weight="fill" aria-hidden />
              {next.action}
            </Link>
          </motion.div>
        )}
        <Link
          to={allTo}
          className="self-center rounded-lg px-3 py-2 text-sm font-medium text-ink-soft underline decoration-line
                     underline-offset-4 transition-colors duration-150 hover:text-ink focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {allLabel}
        </Link>
      </div>
    </div>
  )
}
