import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { Navigate, NavigationType, useLocation, useNavigate, useNavigationType, useParams } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { EarIcon, MusicNotesIcon } from '@phosphor-icons/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { presetRoute, presetSummary } from '@/app/drillPreset'
import { playPitch, playSequence, stopSounds } from '@/core/audio/playPitch'
import { optionIndexFromKey } from '@/core/music/keyboard'
import { Button } from '@/core/components/atoms'
import { CHAPTERS } from '@/theory/registry'
import { useTheoryStore } from '@/theory/store'
import { findLesson, fromList, lessonAfter, lessonNumber, reviewOf, lessonKey, type LessonRef } from '@/theory/outline'
import { plainText } from '@/theory/text'
import { loneStaffNote, padFor, playSounds } from '@/theory/blocks'
import type { PlayBlock } from '@/theory/types'
import { RichText } from '@/theory/components/atoms'
import { PracticeOffer, SourceLine } from '@/theory/components/molecules'
import { LessonEnd, StepView } from '@/theory/components/organisms'
import { LessonFrame } from '@/theory/components/templates'

/**
 * Page: one lesson, step by step, then its end screen. The place in the lesson
 * and the time spent live in the theory store; finishing saves the lesson
 * through progressStore.
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
  // screen on a fresh visit. A step back (from its practice drill) keeps it.
  useState(() => useTheoryStore.getState().open(key, lesson.steps.length, navType !== NavigationType.Pop))
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

  const [playing, setPlaying] = useState<PlayBlock | null>(null)
  const playTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(playTimer.current), [])
  const play = useCallback((block: PlayBlock) => {
    stopSounds()
    const sounds = playSounds(block)
    playSequence(sounds.map(s => ({ pitches: s.pitches, at: s.at, hold: s.hold })))
    setPlaying(block)
    clearTimeout(playTimer.current)
    const end = Math.max(...sounds.map(s => s.at + s.hold))
    playTimer.current = setTimeout(() => setPlaying(null), end * 1000)
  }, [])

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

  const goOn = useCallback(() => useTheoryStore.getState().next(), [])

  const close = useCallback(() => {
    useTheoryStore.getState().close()
    if (fromList(location.state)) navigate(-1)
    else navigate('/theory', { replace: true })
  }, [location.state, navigate])

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
      if (current.answer.type === 'key') {
        const pad = padFor(current.answer, naming)
        const i = optionIndexFromKey(e, pad.options)
        if (i !== null) answerStep(i, i === pad.correctIndex)
      } else {
        const i = Number(e.key) - 1
        const choices = current.answer.choices
        if (Number.isInteger(i) && i >= 0 && i < choices.length) answerStep(i, choices[i].correct === true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [canGoOn, current, answer, naming, goOn, answerStep])

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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={reduce ? false : { opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: -12, transition: { duration: 0.12 } }}
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
            <End lessonRef={lessonRef} title={title} number={number} onAllLessons={close} />
          )}
        </motion.div>
      </AnimatePresence>
    </LessonFrame>
  )
}

/** The end screen's data: recap, score, the practice link, the way on and the credit. */
function End({ lessonRef, title, number, onAllLessons }: {
  lessonRef: LessonRef; title: string; number: string; onAllLessons: () => void
}) {
  const { chapter, lesson, key } = lessonRef
  const { lang, naming } = useAppStore(s => s.settings)
  const answers = useTheoryStore(s => s.answers)
  const t = useT()
  const location = useLocation()
  const review = lesson.kind === 'review'
  const results = Object.values(answers)
  const after = lessonAfter(CHAPTERS, key)
  const chapterReview = reviewOf(chapter)
  const practice = lesson.practice

  // The next lesson replaces this one in history, so ✕ and back still lead to
  // where the reader came from rather than through every lesson read.
  const next = after
    ? {
        to: `/theory/${after.key}`, replace: true, state: location.state,
        label: t('theory.nextLesson', { title: plainText(after.lesson.title[lang], naming) }),
      }
    : {
        to: '/theory', label: t('theory.allLessons'),
        onClick: (e: MouseEvent) => { e.preventDefault(); onAllLessons() },
      }
  const also = !practice && chapterReview && !review && after?.lesson !== chapterReview
    ? { to: `/theory/${lessonKey(chapter, chapterReview)}`, replace: true, state: location.state, label: t('theory.reviewChapter') }
    : undefined

  const offer = practice && (
    <div data-drill={practice.drill === 'hear-play' ? 'hear-play' : undefined}>
      <PracticeOffer
        heading={t('theory.practiceTitle')}
        icon={practice.drill === 'hear-play' ? <EarIcon size={22} weight="fill" /> : <MusicNotesIcon size={22} weight="fill" />}
        drill={t(practice.drill === 'hear-play' ? 'home.hearPlay' : 'home.noteReading')}
        summary={presetSummary(practice, t)}
        actionLabel={t('home.practiceNow')}
        to={presetRoute(practice)}
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
