import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { Navigate, NavigationType, useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { presetSummary } from '@/app/drillPreset'
import { findDrill } from '@/app/drills'
import { playPitch, stopSounds } from '@/core/audio/playPitch'
import { Button } from '@/core/components/atoms'
import { CHAPTERS } from '@/theory/registry'
import { useTheoryStore } from '@/theory/store'
import {
  findLesson, fromList, lessonAfter, lessonAt, lessonNumber, openerState, reviewOf, lessonKey, type LessonRef,
} from '@/theory/outline'
import { plainText } from '@/core/lesson/text'
import { answerFromKey, loneStaffNote } from '@/core/lesson/blocks'
import { usePlayBlock } from '@/core/lesson/usePlayBlock'
import { RichText } from '@/core/components/atoms'
import { PracticeOffer, SourceLine } from '@/theory/components/molecules'
import { LessonEnd } from '@/theory/components/organisms'
import { StepView } from '@/core/components/organisms'
import { LessonFrame } from '@/theory/components/templates'

/**
 * Page: one lesson, step by step, then its end screen. The place in the lesson
 * and the time spent live in the theory store; finishing saves the lesson
 * through progressStore.
 *
 * Each step moved to gets a history entry on the lesson's URL (`lessonAt`),
 * so back steps back through the lesson; the entry shown says which step the
 * store shows. Leaving (✕, "Bài tiếp") skips the lesson's entries in one go.
 */
export function LessonPlayer() {
  const { chapter = '', lesson = '' } = useParams()
  const ref = findLesson(CHAPTERS, chapter, lesson)
  if (!ref) return <Navigate to="/theory" replace />
  return <Player key={ref.key} lessonRef={ref} />
}

function Player({ lessonRef }: { lessonRef: LessonRef }) {
  const { lesson, key } = lessonRef
  const settings = useAppStore(s => s.settings)
  const { lang, naming } = settings
  const t = useT()
  const navigate = useNavigate()
  const location = useLocation()
  const navType = useNavigationType()
  const reduce = useReducedMotion()

  // Opened before the first read, so a finished lesson never flashes its end
  // screen on a fresh visit. A step back (from its practice drill) keeps it,
  // and an entry that names its step (back, forward, a reload) shows that step.
  const at = lessonAt(location.state)
  useState(() => {
    const store = useTheoryStore.getState()
    store.open(key, lesson.steps.length, navType !== NavigationType.Pop)
    if (at) store.goTo(at.step)
  })
  const step = useTheoryStore(s => s.step)
  const answers = useTheoryStore(s => s.answers)
  const total = lesson.steps.length
  const current = step < total ? lesson.steps[step] : null
  const answer = answers[step] ?? null
  const canGoOn = !!current && (current.kind === 'explain' || !!answer)

  // Time counts while the lesson is in view.
  useEffect(() => {
    const store = useTheoryStore.getState()
    const onVisibility = () => (document.hidden ? store.hide() : store.show())
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      stopSounds()
      useTheoryStore.getState().leave()
    }
  }, [])

  // Each step opens at its top, in silence.
  const first = useRef(true)
  useEffect(() => {
    stopSounds()
    if (first.current) first.current = false
    else window.scrollTo(0, 0)
  }, [step])

  const { playing, play } = usePlayBlock()

  const answerStep = useCallback((choice: number, correct: boolean) => {
    const s = useTheoryStore.getState()
    if (s.answers[s.step]) return
    s.answer(choice, correct)
    // A key answer sounds the note the check was about, as the drills do.
    const step = lesson.steps[s.step]
    if (settings.sound && step?.kind === 'check' && step.answer.type === 'key') {
      const note = loneStaffNote(step.blocks)
      if (note) playPitch(note)
    }
  }, [lesson, settings.sound])

  // History is the source of truth for the step shown. The lesson's first
  // entry gets its marker on arrival; any other entry moves the store to its step.
  const depth = at?.depth ?? 0
  const atStep = at?.step
  const opener = useMemo(() => openerState(location.state), [location.state])
  // Where to go once back on the lesson's first entry (see `replaceLesson`).
  const pending = useRef<(() => void) | null>(null)
  useEffect(() => {
    if (atStep === undefined) {
      navigate(location.pathname, { replace: true, state: { ...opener, lessonAt: { step: useTheoryStore.getState().step, depth: 0 } } })
      return
    }
    const go = pending.current
    if (!go) useTheoryStore.getState().goTo(atStep)
    else if (depth === 0) {
      pending.current = null
      go()
    }
  }, [atStep, depth, opener, navigate, location.pathname])

  const goOn = useCallback(() => {
    const s = useTheoryStore.getState()
    if (s.step >= s.steps) return
    s.next()
    const lessonAt = { step: useTheoryStore.getState().step, depth: depth + 1 }
    navigate(location.pathname, { state: { ...opener, lessonAt } })
  }, [depth, opener, navigate, location.pathname])

  /**
   * Leaves the lesson with its first entry replaced, so none of its step
   * entries stays behind for a swipe back to land on: back past them first,
   * then go.
   */
  const leaving = useRef(false)
  const replaceLesson = useCallback((go: () => void) => {
    if (leaving.current) return
    leaving.current = true
    if (depth === 0) return go()
    pending.current = go
    navigate(-depth)
  }, [depth, navigate])

  const close = useCallback(() => {
    if (fromList(location.state)) {
      if (leaving.current) return
      leaving.current = true
      useTheoryStore.getState().close()
      navigate(-(depth + 1))
    } else {
      replaceLesson(() => {
        useTheoryStore.getState().close()
        navigate('/learn', { replace: true })
      })
    }
  }, [location.state, depth, navigate, replaceLesson])

  // The next lesson replaces this one in history, so ✕ and back still lead to
  // where the reader came from rather than through every lesson read.
  const openLesson = useCallback((to: string) => {
    replaceLesson(() => navigate(to, { replace: true, state: opener }))
  }, [replaceLesson, navigate, opener])

  // Desktop: Enter goes on, the piano keys answer a key check, 1-4 a choice.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === 'Enter' && canGoOn && !(e.target instanceof HTMLButtonElement || e.target instanceof HTMLAnchorElement)) {
        e.preventDefault()
        goOn()
        return
      }
      if (current?.kind !== 'check' || answer) return
      const picked = answerFromKey(current, e, naming)
      if (picked) answerStep(picked.choice, picked.correct)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [canGoOn, current, answer, naming, goOn, answerStep])

  // Back and forward show the step as it was: the swipe already moved the page.
  const instant = navType === NavigationType.Pop
  const review = lesson.kind === 'review'
  const number = lessonNumber(lessonRef)
  const title = plainText(lesson.title[lang], naming)

  const footer = current && (
    <Button variant="primary" className="w-full text-base font-semibold" disabled={!canGoOn} onClick={goOn}>
      {step === total - 1 ? t('theory.finish') : t('theory.next')}
    </Button>
  )

  return (
    <LessonFrame
      closeLabel={t('theory.close')} onClose={close}
      total={total} filled={Math.min(step + 1, total)}
      progressLabel={t('theory.progress', { step: Math.min(step + 1, total), total })}
      footer={footer}
    >
      <AnimatePresence mode="wait" initial={false} custom={instant}>
        <motion.div
          key={step}
          custom={instant}
          variants={stepMotion}
          initial={reduce || instant ? false : 'enter'}
          animate="shown"
          exit={reduce ? undefined : 'leave'}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 flex-col"
        >
          {current ? (
            <StepView
              step={current}
              eyebrow={current.kind === 'check'
                ? t('theory.check')
                : review ? t('theory.eyebrow.review', { number }) : t('theory.eyebrow', { number, title })}
              lang={lang} naming={naming} t={t}
              answer={answer} onAnswer={answerStep}
              onPlay={play} playing={playing}
              padLabels={settings.keyLabels} padLayout={settings.padStyle}
            />
          ) : (
            <End lessonRef={lessonRef} title={title} number={number} onAllLessons={close} onLesson={openLesson} />
          )}
        </motion.div>
      </AnimatePresence>
    </LessonFrame>
  )
}

const stepMotion: Variants = {
  enter: { opacity: 0, x: 18 },
  shown: { opacity: 1, x: 0 },
  // The leaving step reads `instant` from AnimatePresence's `custom`, as its own props are frozen.
  leave: (instant: boolean) => ({ opacity: 0, x: instant ? 0 : -12, transition: { duration: instant ? 0 : 0.12 } }),
}

/** The end screen's data: recap, score, the practice link, the way on and the credit. */
function End({ lessonRef, title, number, onAllLessons, onLesson }: {
  lessonRef: LessonRef; title: string; number: string; onAllLessons: () => void
  /** Opens another lesson in this one's place in history. */
  onLesson: (to: string) => void
}) {
  const { chapter, lesson, key } = lessonRef
  const { lang, naming } = useAppStore(s => s.settings)
  const answers = useTheoryStore(s => s.answers)
  const t = useT()
  const review = lesson.kind === 'review'
  const results = Object.values(answers)
  const after = lessonAfter(CHAPTERS, key)
  const chapterReview = reviewOf(chapter)
  const practice = lesson.practice
  const drill = practice ? findDrill(practice.drill) : undefined

  const lessonLink = (to: string, label: string) => ({
    to, label, onClick: (e: MouseEvent) => { e.preventDefault(); onLesson(to) },
  })
  const next = after
    ? lessonLink(`/theory/${after.key}`, t('theory.nextLesson', { title: plainText(after.lesson.title[lang], naming) }))
    : {
        to: '/theory', label: t('theory.allLessons'),
        onClick: (e: MouseEvent) => { e.preventDefault(); onAllLessons() },
      }
  const also = !(practice && drill) && chapterReview && !review && after?.lesson !== chapterReview
    ? lessonLink(`/theory/${lessonKey(chapter, chapterReview)}`, t('theory.reviewChapter'))
    : undefined

  const offer = practice && drill && (
    <div data-drill={drill.id}>
      <PracticeOffer
        heading={t('theory.practiceTitle')}
        icon={<drill.icon size={22} weight="fill" />}
        drill={t(drill.title)}
        summary={presetSummary(practice, t)}
        actionLabel={t('home.practiceNow')}
        to={drill.route}
        linkState={{ autostart: true, preset: practice }}
      />
    </div>
  )

  return (
    <LessonEnd
      eyebrow={review ? t('theory.done.eyebrow.review', { number }) : t('theory.done.eyebrow', { number })}
      title={title}
      recapHeading={t('theory.recap')}
      recap={lesson.recap.map(r => <RichText key={r.vi} text={r[lang]} naming={naming} />)}
      score={results.length
        ? { label: t('theory.score'), value: t('theory.scoreValue', { correct: results.filter(a => a.correct).length, total: results.length }) }
        : undefined}
      practice={offer || undefined}
      next={next}
      also={also}
      source={
        <SourceLine
          adapted={t('theory.source.adapted')}
          sectionWord={t(lesson.sources.length > 1 ? 'theory.source.sections' : 'theory.source.section')}
          sources={lesson.sources}
          aboutTo="/theory/about"
        />
      }
    />
  )
}
