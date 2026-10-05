import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { CaretRightIcon, TimerIcon, TrophyIcon } from '@phosphor-icons/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { CHANGE_START, WELCOME_ROUTE } from '@/app/firstOpen'
import { loadDrill, prefetchWhenIdle } from '@/app/routes'
import { LanguageToggle } from '@/core/components/molecules'
import { DrillCard } from '@/core/components/organisms'
import { plainText } from '@/core/lesson/text'
import { formatDuration } from '@/core/i18n/formatDuration'
import { getBest, getLastPlayed, getLessonsDone } from '@/progress/progressStore'
import review from '@/drills/review/drill'
import { CHAPTERS } from '@/theory/registry'
import { FROM_LIST, allLessons, doneInChapter, lessonKey, nextLesson } from '@/theory/outline'
import { LessonRow } from '@/theory/components/molecules'
import { NextLessonCard } from '@/theory/components/organisms'
import type { LessonState } from '@/theory/components/atoms'

const link = 'inline-flex items-center gap-1 rounded-lg py-1 text-sm font-medium text-ink-soft underline decoration-line '
  + 'underline-offset-4 transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent'

/**
 * Page: Học, the lessons tab. One "Học tiếp" card into the next lesson on the
 * path (the first one for a new reader), Ôn tập once a lesson is finished,
 * then only the current chapter's lessons; the other chapters are one link
 * away (the chapter list at /theory). Nothing is locked.
 */
export function LearnTab() {
  const { settings, updateSettings, pausedSession } = useAppStore()
  const { lang, naming } = settings
  const t = useT()
  const reduce = useReducedMotion()
  useEffect(() => prefetchWhenIdle(() => loadDrill(review)), [])

  const done = getLessonsDone()
  const next = nextLesson(CHAPTERS, done)
  const started = Object.keys(done).length > 0
  // The chapter the reader is in; the last one once every lesson is done.
  const chapter = next?.chapter ?? CHAPTERS[CHAPTERS.length - 1]
  const name = (text: { vi: string; en: string }) => plainText(text[lang], naming)
  const others = CHAPTERS.length - 1

  const reviewPlayed = review.id in getLastPlayed()
  const reviewOwn = review.of(settings)
  const reviewBest = getBest(review.id, reviewOwn.level)

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.32, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <div className={'mx-auto w-full max-w-md px-4 pt-8 md:max-w-4xl md:px-8 md:pt-10 ' + (pausedSession ? 'pb-48 md:pb-32' : 'pb-28 md:pb-12')}>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t('tab.learn')}</h1>
        <LanguageToggle lang={lang} onChange={l => updateSettings({ lang: l })} className="-mr-1" />
      </header>

      <div className="mt-5 grid gap-7 md:mt-8 md:grid-cols-2 md:items-start md:gap-8">
        <div className="flex flex-col gap-7">
          <motion.div {...enter(0)}>
            <NextLessonCard
              eyebrow={next ? t(started ? 'theory.home.next' : 'theory.home.first') : t('theory.title')}
              title={next ? name(next.lesson.title) : t('theory.home.allDone', { count: allLessons(CHAPTERS).length })}
              line={next?.lesson.recap[0] && name(next.lesson.recap[0])}
              action={next && {
                label: t('learn.go', { count: next.lesson.minutes }),
                to: `/theory/${next.key}`,
                state: FROM_LIST,
              }}
            />
          </motion.div>

          {started && (
            <motion.section {...enter(0.05)} className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold tracking-wide text-ink-faint uppercase">{t('learn.review')}</h2>
              <div data-drill={review.id}>
                <DrillCard
                  icon={<review.icon size={22} weight="fill" />}
                  title={t(review.title)}
                  description={t(review.description)}
                  to={review.route}
                  toState={{ setup: true }}
                  chip={reviewPlayed ? undefined : { label: t('practice.notPlayed') }}
                  stats={reviewPlayed ? [
                    { icon: <TimerIcon size={12} weight="bold" />, label: t('stat.length'), value: formatDuration(reviewOwn.durationSec, t) },
                    { icon: <TrophyIcon size={12} weight="fill" />, label: t('stat.best'), value: reviewBest ? String(reviewBest.practiceScore) : t('stat.none') },
                  ] : undefined}
                  action={reviewPlayed ? { label: t('practice.go'), to: review.route, state: { autostart: true } } : undefined}
                />
              </div>
            </motion.section>
          )}
        </div>

        <motion.section {...enter(0.1)} className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="min-w-0 text-xs font-semibold tracking-wide text-ink-faint uppercase">
              {t('theory.chapter', { number: chapter.number, title: name(chapter.title) })}
            </h2>
            <span className="shrink-0 text-xs font-semibold whitespace-nowrap text-ink-faint">
              {t('theory.lessonsDone', { done: doneInChapter(chapter, done), total: chapter.lessons.length })}
            </span>
          </div>
          <div className="rounded-2xl border border-line bg-raised px-4 [&>a:first-child]:border-t-0">
            {chapter.lessons.map((lesson, i) => {
              const key = lessonKey(chapter, lesson)
              const state: LessonState = key in done ? 'done' : next?.key === key ? 'current' : 'todo'
              return (
                <LessonRow
                  key={lesson.id}
                  to={`/theory/${key}`}
                  linkState={FROM_LIST}
                  title={name(lesson.title)}
                  state={state}
                  mark={String(i + 1)}
                  stateLabel={state === 'done' ? t('theory.lessonDone') : state === 'current' ? t('theory.upNext') : undefined}
                  tag={state === 'current' ? t('theory.minutes', { count: lesson.minutes }) : undefined}
                />
              )
            })}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <Link to="/theory" className={link}>
              {others > 0 ? t('learn.otherChapters', { count: others }) : t('learn.allChapters')}
              <CaretRightIcon size={13} weight="bold" aria-hidden />
            </Link>
            <Link to={WELCOME_ROUTE} state={CHANGE_START} className={link}>
              {t('learn.changeStart')}
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
