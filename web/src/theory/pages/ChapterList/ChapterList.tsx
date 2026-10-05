import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeftIcon, InfoIcon } from '@phosphor-icons/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { SegmentedControl } from '@/core/components/molecules'
import { getLessonsDone } from '@/progress/progressStore'
import { CHAPTERS } from '@/theory/registry'
import { useTheoryStore } from '@/theory/store'
import { FROM_LIST, doneInChapter, lessonKey, nextLesson } from '@/theory/outline'
import { plainText } from '@/theory/text'
import { ChapterCard } from '@/theory/components/organisms'
import { LessonRow } from '@/theory/components/molecules'
import type { LessonState } from '@/theory/components/atoms'

/**
 * Page: every chapter and its lessons, with ticks for finished lessons and the
 * next one on the suggested path marked. Nothing is locked. The chapter
 * holding the next lesson opens by default.
 */
export function ChapterList() {
  const { settings, updateSettings } = useAppStore()
  const { naming, lang } = settings
  const t = useT()
  const backLink = useBackLink()
  const reduce = useReducedMotion()
  const openChapter = useTheoryStore(s => s.openChapter)
  const setOpenChapter = useTheoryStore(s => s.setOpenChapter)
  const done = getLessonsDone()
  const next = nextLesson(CHAPTERS, done)
  // Null until the reader toggles one: then the chapter they are in is open.
  const open = openChapter ?? next?.chapter.id ?? CHAPTERS[0]?.id

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12 md:max-w-2xl md:px-8">
      <header className="-ml-2 flex h-14 items-center gap-2 md:mt-6">
        <Link
          to="/" onClick={backLink} aria-label={t('theory.back')}
          className="flex size-11 items-center justify-center rounded-full text-ink-soft transition-colors duration-150
                     hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ArrowLeftIcon size={20} weight="bold" />
        </Link>
        <h1 className="text-lg font-semibold md:text-2xl">{t('theory.title')}</h1>
      </header>

      <p className="text-sm leading-relaxed text-ink-soft md:text-base">{t('theory.intro', { count: CHAPTERS.length })}</p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-sm text-ink-soft">{t('setup.naming')}</span>
        <SegmentedControl
          compact label={t('setup.naming')} value={naming} onChange={n => updateSettings({ naming: n })}
          segments={[{ value: 'solfege', label: 'Do Re Mi' }, { value: 'letters', label: 'C D E' }]}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {CHAPTERS.map((chapter, ci) => {
          const count = doneInChapter(chapter, done)
          const total = chapter.lessons.length
          const isOpen = open === chapter.id
          return (
            <motion.div
              key={chapter.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: ci * 0.04, ease: [0.16, 1, 0.3, 1] }}
            >
              <ChapterCard
                number={chapter.number}
                title={plainText(chapter.title[lang], naming)}
                detail={count ? t('theory.lessonsDone', { done: count, total }) : t('theory.lessonCount', { count: total })}
                current={next?.chapter.id === chapter.id}
                open={isOpen}
                onToggle={() => setOpenChapter(isOpen ? '' : chapter.id)}
              >
                {chapter.lessons.map((lesson, i) => {
                  const key = lessonKey(chapter, lesson)
                  const state: LessonState = key in done ? 'done' : next?.key === key ? 'current' : 'todo'
                  return (
                    <LessonRow
                      key={lesson.id}
                      to={`/theory/${key}`}
                      linkState={FROM_LIST}
                      title={plainText(lesson.title[lang], naming)}
                      state={state}
                      mark={String(i + 1)}
                      stateLabel={state === 'done' ? t('theory.lessonDone') : state === 'current' ? t('theory.upNext') : undefined}
                      tag={lesson.practice
                        ? `♪ ${t(`theory.tag.${lesson.practice.drill}` as 'theory.tag.note-id')}`
                        : t('theory.minutes', { count: lesson.minutes })}
                    />
                  )
                })}
              </ChapterCard>
            </motion.div>
          )
        })}
      </div>

      <Link
        to="/theory/about"
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg py-1 text-sm font-medium text-ink-soft underline
                   decoration-line underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
      >
        <InfoIcon size={16} aria-hidden /> {t('theory.about')}
      </Link>
    </div>
  )
}
