import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { FireIcon, PlayIcon } from '@phosphor-icons/react'
import { GoalRing } from '@/core/components/atoms'

interface Props {
  /** Minutes practised today, against the daily goal: the ring. */
  todayMinutes: number
  dailyGoal: number
  unit: string
  /** "Hôm nay · còn 2 phút". */
  eyebrow: string
  /** Current streak as words ("3 ngày"); null hides the pill. */
  streak: string | null
  /** The pick: drill and length ("Đọc nốt nhạc · 1 phút"). Null with nothing to suggest. */
  pick: {
    title: string
    /** One line on why this session. */
    reason: string
    actionLabel: string
    to: string
    state?: unknown
  } | null
  /** The pick waits on the lesson list: hold its place. */
  loading?: boolean
}

/**
 * Luyện's first card: today against the daily goal and the one session the
 * app suggests for it, with one amber button. The reader decides nothing to
 * start; the drill cards below are there for choosing.
 */
export function TodayCard({ todayMinutes, dailyGoal, unit, eyebrow, streak, pick, loading = false }: Props) {
  const reduce = useReducedMotion()
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line bg-raised p-5" aria-busy={loading || undefined}>
      <div className="flex items-center gap-4">
        <GoalRing value={todayMinutes} goal={dailyGoal} unit={unit} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{eyebrow}</span>
            {streak && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/12 px-2 py-0.5 text-xs font-semibold text-accent">
                <FireIcon size={12} weight="fill" aria-hidden />
                <span className="tnum">{streak}</span>
              </span>
            )}
          </div>
          {loading
            ? <div className="mt-1.5 h-6 w-40 max-w-full rounded-lg bg-line" />
            : pick && <h2 className="mt-0.5 text-lg leading-snug font-semibold text-ink">{pick.title}</h2>}
        </div>
      </div>

      {loading ? (
        <>
          <div className="h-5 w-3/4 rounded-lg bg-line" />
          <div className="h-13 rounded-2xl bg-line" />
        </>
      ) : pick && (
        <>
          <p className="text-[15px] leading-snug text-ink-soft">{pick.reason}</p>
          <motion.div whileTap={reduce ? undefined : { scale: 0.98 }}>
            {/* The drill reads `autostart` (with the pick as a preset) and opens straight into a session. */}
            <Link
              to={pick.to}
              state={pick.state}
              className="flex h-13 items-center justify-center gap-2 rounded-2xl bg-cta px-3 text-base font-semibold
                         text-cta-ink shadow-sm transition-[filter] duration-150 hover:brightness-95
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mr-auto md:w-64"
            >
              <PlayIcon size={18} weight="fill" aria-hidden />
              {pick.actionLabel}
            </Link>
          </motion.div>
        </>
      )}
    </section>
  )
}
