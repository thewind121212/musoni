import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, BookOpenIcon, MusicNoteIcon } from '@phosphor-icons/react'
import { StartOption } from '@/app/components/molecules'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useChapters } from '@/app/useChapters'
import { loadTheory } from '@/app/routes'
import { findDrill } from '@/app/drills'
import { starterPreset } from '@/app/practicePlan'
import { TAB_ROUTE } from '@/app/useTabs'
import { changingStart } from '@/app/firstOpen'
import { getLessonsDone } from '@/progress/progressStore'
import { FROM_LIST, allLessons, nextLesson } from '@/theory/outline'
import { formatDuration } from '@/core/i18n/formatDuration'
import { READER_START_DRILL, TODAY_SHORT_SECONDS } from '@/config/constants'

/**
 * Page: the first-open question, "Bạn đã đọc được nốt nhạc chưa?". A
 * beginner goes to the first lesson; a reader into a one-minute Đọc nốt at
 * level 1. Asked once (the answer is saved as `startPoint`); Học offers it
 * again. Either way the tab underneath is where back lands: Học for the
 * lesson, Luyện for the drill.
 */
export function FirstOpen() {
  const updateSettings = useAppStore(s => s.updateSettings)
  const t = useT()
  const navigate = useNavigate()
  const { state } = useLocation()
  const change = changingStart(state)
  const chapters = useChapters()
  const first = chapters ? nextLesson(chapters, getLessonsDone()) ?? allLessons(chapters)[0] : null
  const drill = findDrill(READER_START_DRILL)

  // First open: this page gives way to the tab, and the start opens over it.
  // Changing later (opened over Học): the start replaces this page.
  const open = (tab: string, to: string, linkState: unknown) => {
    if (change) {
      navigate(to, { replace: true, state: linkState })
    } else {
      navigate(tab, { replace: true })
      navigate(to, { state: linkState })
    }
  }

  const beginner = async () => {
    updateSettings({ startPoint: 'beginner' })
    const { CHAPTERS } = await loadTheory()
    const lesson = nextLesson(CHAPTERS, getLessonsDone()) ?? allLessons(CHAPTERS)[0]
    if (lesson) open(TAB_ROUTE.learn, `/theory/${lesson.key}`, FROM_LIST)
    else navigate(TAB_ROUTE.learn, { replace: true })
  }

  const reader = () => {
    updateSettings({ startPoint: 'reader' })
    if (drill) open(TAB_ROUTE.practice, drill.route, { autostart: true, preset: starterPreset(drill) })
    else navigate(TAB_ROUTE.practice, { replace: true })
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pt-6 pb-10 md:max-w-xl md:pt-16">
      <div className="h-11">
        {change && (
          <Link
            to={TAB_ROUTE.learn}
            onClick={e => { e.preventDefault(); navigate(-1) }}
            aria-label={t('theory.back')}
            className="-ml-2 flex size-11 items-center justify-center rounded-full text-ink-soft transition-colors duration-150
                       hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
          >
            <ArrowLeftIcon size={20} weight="bold" />
          </Link>
        )}
      </div>
      <h1 className="mt-8 text-[32px] leading-[1.15] font-bold tracking-tight md:text-4xl">
        {t('welcome.hello')}
        <br />
        {t('welcome.question')}
      </h1>
      <p className="mt-4 text-[17px] leading-snug text-ink-soft">{t('welcome.why')}</p>

      <div className="mt-8 flex flex-col gap-3">
        <StartOption
          icon={<BookOpenIcon size={24} weight="fill" />}
          title={t('welcome.beginner')}
          detail={first ? t('welcome.beginner.detail', { count: first.lesson.minutes }) : ' '}
          onChoose={beginner}
        />
        <StartOption
          icon={<MusicNoteIcon size={24} weight="fill" />}
          title={t('welcome.reader')}
          detail={t('welcome.reader.detail', { length: formatDuration(drill ? starterPreset(drill).durationSec : TODAY_SHORT_SECONDS, t) })}
          onChoose={reader}
        />
      </div>
    </div>
  )
}
