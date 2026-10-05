import { Link } from 'react-router-dom'
import { LessonDot, type LessonState } from '../../atoms'

interface Props {
  to: string
  /** Route state for the lesson page (where the reader came from). */
  linkState?: unknown
  title: string
  state: LessonState
  /** The dot's mark: the lesson's number in its chapter. */
  mark: string
  /** Spoken state for done and current lessons. */
  stateLabel?: string
  /** On the right: the drill it practises ("♪ Đọc nốt"), else its minutes. */
  tag: string
}

/** One lesson on the chapter list. Nothing is locked: every row opens its lesson. */
export function LessonRow({ to, linkState, title, state, mark, stateLabel, tag }: Props) {
  return (
    <Link
      to={to}
      state={linkState}
      className="flex min-h-13 items-center gap-3 border-t border-line py-3 transition-colors duration-150
                 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <LessonDot state={state} mark={mark} label={stateLabel} />
      <span className={'min-w-0 flex-1 text-[15px] ' + (state === 'current' ? 'font-semibold text-ink' : state === 'done' ? 'text-ink' : 'text-ink-soft')}>
        {title}
      </span>
      <span className="shrink-0 rounded-full border border-line px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-ink-soft">
        {tag}
      </span>
    </Link>
  )
}
