import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { PlayIcon } from '@phosphor-icons/react'

interface Props {
  /** "Bài đầu tiên", "Bài tiếp", or the all-done line's heading. */
  eyebrow: string
  title: string
  /** One line on what the lesson teaches. */
  line?: string
  /** The amber button into the lesson; none once every lesson is done. */
  action: { label: string; to: string; state?: unknown } | null
}

/**
 * Học's first card: the next lesson on the path and one amber button into
 * it. For a new reader, the first lesson.
 */
export function NextLessonCard({ eyebrow, title, line, action }: Props) {
  const reduce = useReducedMotion()
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-5">
      <div>
        <p className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{eyebrow}</p>
        <h2 className="mt-1 text-xl leading-snug font-semibold text-ink">{title}</h2>
        {line && <p className="mt-1 text-[15px] leading-snug text-ink-soft">{line}</p>}
      </div>
      {action && (
        <motion.div whileTap={reduce ? undefined : { scale: 0.98 }}>
          <Link
            to={action.to}
            state={action.state}
            className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-cta px-3 text-base font-semibold
                       text-cta-ink shadow-sm transition-[filter] duration-150 hover:brightness-95
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mr-auto md:w-64"
          >
            <PlayIcon size={18} weight="fill" aria-hidden />
            {action.label}
          </Link>
        </motion.div>
      )}
    </section>
  )
}
