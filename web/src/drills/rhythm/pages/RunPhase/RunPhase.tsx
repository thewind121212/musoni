import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckIcon } from '@phosphor-icons/react'
import { MissLine, ProgressBar } from '@/core/components/atoms'
import { PausePanel, RunHeader } from '@/core/components/organisms'
import { useRunGuards } from '@/app/useRunGuards'
import { useT } from '@/app/useT'
import { formatClock, formatElapsed } from '@/core/i18n/formatDuration'
import type { Translate } from '@/core/i18n/translate'
import { measureTiming, playedMs, useRhythmStore, type PauseReason } from '@/drills/rhythm/store'
import { firstProblem, type Judgement } from '@/drills/rhythm/judge'
import { audioNow, audioReady, audioTimeAt, scheduleClicks, stopClicks, wakeAudio, type Click } from '@/drills/rhythm/metronome'
import { BeatDots, TapPad } from '@/drills/rhythm/components/atoms'
import { MarkLegend } from '@/drills/rhythm/components/molecules'
import { RhythmStaff } from '@/drills/rhythm/components/organisms'
import rhythm from '@/drills/rhythm/drill'
import { S } from '@/drills/rhythm/strings'
import {
  RHYTHM_COUNT_IN, RHYTHM_FEEDBACK_CORRECT_MS, RHYTHM_FEEDBACK_WRONG_MS, RHYTHM_FRAME_MS, RHYTHM_LEAD_SEC,
  RHYTHM_READ_MS, TICK_MS,
} from '@/config/constants'

/** Where the current measure is: being read, waiting for sound, counted in (clicks heard), or tapped. */
type Stage = { kind: 'read' } | { kind: 'wait' } | { kind: 'count'; heard: number } | { kind: 'play' }

/** The ✕ button and Esc: pause to ask, or just leave when no measure was judged yet. */
function quit() {
  const s = useRhythmStore.getState()
  if (s.correct + s.wrong === 0) s.backToSetup()
  else s.pause('menu')
}

/** A letter key or Space taps; other keys (and chords with Ctrl, Cmd, Alt) do not. */
function isTapKey(e: KeyboardEvent) {
  return !e.ctrlKey && !e.metaKey && !e.altKey && (e.key === ' ' || /^[a-z]$/i.test(e.key))
}

/** The line under the staff once a measure is judged: right, or its first problem. */
function verdict(j: Judgement, onsets: readonly number[], t: Translate): string {
  const p = firstProblem(j, onsets)
  if (!p) return t(S['verdict.right'])
  if (p.kind === 'extra') return t(S['verdict.extra'], { count: p.count })
  if (p.kind === 'missed') return t(S['verdict.missed'], { note: p.note })
  return t(p.kind === 'early' ? S['verdict.early'] : S['verdict.late'], { note: p.note, ms: p.ms })
}

/**
 * Page: the rhythm session. Each measure shows, then after a moment to read
 * it four clicks count in and the reader taps it on the pad (or Space, or a
 * letter key) with the metronome going on if they chose it. When the bar has
 * passed, the taps are judged on the audio clock and marked over the notes;
 * the next measure follows.
 *
 * Leaving pauses, like the other drills (`useRunGuards`); a measure cut off by
 * a pause is dropped uncounted and played again, count-in and all, on resume.
 */
export function RunPhase() {
  const { question, endsAt, correct, wrong, streak, feedback, settings, level, pausedAt, pauseReason } = useRhythmStore()
  const t = useT()
  const [now, setNow] = useState(() => Date.now())
  const [stage, setStage] = useState<Stage>({ kind: 'read' })
  const [shownReason, setShownReason] = useState<PauseReason>('menu')
  if (pauseReason && pauseReason !== shownReason) setShownReason(pauseReason)
  /** The take being played: its downbeat on the audio clock (s) and the taps so far (ms from it). */
  const take = useRef<{ downbeat: number; taps: number[] } | null>(null)

  useRunGuards(useRhythmStore.getState)

  useEffect(() => {
    const id = setInterval(() => {
      const at = Date.now()
      useRhythmStore.getState().tick(at)
      setNow(at)
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  // Play each measure: a moment to read it, the count-in, the bar itself,
  // then judge. A pause, leaving, or the next measure stops it all.
  const paused = pausedAt !== null
  const judged = feedback !== null
  useEffect(() => {
    if (!question || paused || judged) return
    let loop: ReturnType<typeof setInterval> | undefined
    let retry: ReturnType<typeof setTimeout> | undefined
    // The stage starts at 'read': the previous run's cleanup put it there.
    let shown: Stage = { kind: 'read' }
    const show = (s: Stage) => {
      if (JSON.stringify(s) === JSON.stringify(shown)) return
      shown = s
      setStage(s)
    }

    const begin = () => {
      // The audio clock waits for a gesture on some phones: a tap on the pad wakes it.
      if (!audioReady()) {
        wakeAudio()
        show({ kind: 'wait' })
        retry = setTimeout(begin, TICK_MS)
        return
      }
      const s = useRhythmStore.getState()
      if (!s.beginTake()) return
      const { pulse, lengthMs, toleranceMs } = measureTiming(question, s.settings, s.level)
      const beat = pulse.beatMs / 1000
      const first = audioNow() + RHYTHM_LEAD_SEC
      const downbeat = first + RHYTHM_COUNT_IN * beat
      const clicks: Click[] = Array.from({ length: RHYTHM_COUNT_IN }, (_, i) => ({ at: first + i * beat, accent: i === 0 }))
      if (rhythm.of(s.settings).click) {
        for (let i = 0; i < pulse.beats; i++) clicks.push({ at: downbeat + i * beat, accent: i === 0 })
      }
      scheduleClicks(clicks)
      take.current = { downbeat, taps: [] }
      // The last note may be tapped late by up to twice the tolerance.
      const closes = downbeat + (lengthMs + 2 * toleranceMs) / 1000
      loop = setInterval(() => {
        const heardAt = audioTimeAt(performance.now())
        if (heardAt < downbeat) {
          show({ kind: 'count', heard: Math.max(0, Math.floor((heardAt - first) / beat) + 1) })
          return
        }
        show({ kind: 'play' })
        if (heardAt < closes) return
        clearInterval(loop)
        const taps = take.current?.taps ?? []
        take.current = null
        useRhythmStore.getState().judge(taps)
      }, RHYTHM_FRAME_MS)
    }
    const reading = setTimeout(begin, RHYTHM_READ_MS)
    return () => {
      clearTimeout(reading)
      clearTimeout(retry)
      clearInterval(loop)
      stopClicks()
      take.current = null
      setStage({ kind: 'read' })
    }
  }, [question, paused, judged])

  useEffect(() => {
    if (!feedback) return
    const id = setTimeout(
      () => useRhythmStore.getState().nextQuestion(),
      feedback.correct ? RHYTHM_FEEDBACK_CORRECT_MS : RHYTHM_FEEDBACK_WRONG_MS,
    )
    return () => clearTimeout(id)
  }, [feedback])

  const tap = useCallback((timeStamp: number) => {
    wakeAudio()
    const tk = take.current
    if (!tk) return
    tk.taps.push((audioTimeAt(timeStamp) - tk.downbeat) * 1000)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Held keys auto-repeat; the pause sheet handles (and marks) its own Esc.
      if (e.repeat || e.defaultPrevented) return
      const s = useRhythmStore.getState()
      if (e.key === 'Escape') {
        if (s.pausedAt === null) quit()
        return
      }
      if (s.pausedAt !== null || !isTapKey(e)) return
      e.preventDefault()
      tap(e.timeStamp)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tap])

  if (!question) return null

  const own = rhythm.of(settings)
  const { pulse, onsetsMs } = measureTiming(question, settings, level)
  const msLeft = endsAt ? Math.max(0, endsAt - (pausedAt ?? now)) : 0
  const secondsLeft = Math.ceil(msLeft / 1000)
  const fraction = endsAt ? msLeft / (own.durationSec * 1000) : 0
  const lastTen = secondsLeft <= 10
  const tempo = `${pulse.dotted ? '♩.' : '♩'} = ${pulse.bpm}`
  const lit = judged || stage.kind === 'play' ? RHYTHM_COUNT_IN : stage.kind === 'count' ? stage.heard : 0
  const status = judged ? null : stage.kind === 'count' ? t(S.countIn) : stage.kind === 'play' ? t(S.play) : null

  return (
    <>
      <div
        inert={pausedAt !== null}
        className="mx-auto flex min-h-[100dvh] w-full touch-none max-w-md flex-col px-4 pb-6 md:max-w-3xl md:px-8 md:pb-10"
      >
        <RunHeader secondsLeft={secondsLeft} urgent={lastTen} correct={correct} wrong={wrong} onQuit={quit} t={t} />
        <div className="mt-3">
          <ProgressBar fraction={fraction} urgent={lastTen} transitionMs={TICK_MS} />
        </div>

        {/* Tempo, count-in and streak: fixed height so nothing below jumps. */}
        <div className="mt-3 grid h-12 grid-cols-[1fr_auto_1fr] items-center gap-2">
          <span />
          <div className="flex flex-col items-center gap-1.5">
            <span className="flex items-baseline gap-1 text-sm font-semibold text-ink-soft md:text-base">
              {/* The note glyph in the text face: the figures' mono face draws it tiny. */}
              <span aria-hidden className="text-lg leading-none">{pulse.dotted ? '♩.' : '♩'}</span>
              <span className="sr-only">{tempo}</span>
              <span aria-hidden className="tnum">= {pulse.bpm}</span>
              {status && <span className="font-medium text-ink-faint"> · {status}</span>}
            </span>
            <BeatDots count={RHYTHM_COUNT_IN} lit={lit} label={t(S.countIn)} />
          </div>
          <span className="tnum text-right text-sm text-accent md:text-base">
            {streak > 2 && t('run.streak', { count: streak })}
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-3 md:gap-3 md:py-6">
          <div className="w-full md:max-w-xl">
            <RhythmStaff measure={question} judgement={feedback} tickMs={pulse.tickMs} t={t} />
          </div>
          <MarkLegend t={t} />
          {/* Fixed height: the verdict comes and goes without moving the pad. */}
          <div className="flex h-11 items-center">
            {feedback ? (
              feedback.correct ? (
                <div role="status" className="inline-flex items-center gap-2 rounded-full bg-correct/10 px-4 py-2 text-sm font-medium text-correct md:text-base">
                  <CheckIcon size={16} weight="bold" aria-hidden />
                  {verdict(feedback, onsetsMs, t)}
                </div>
              ) : (
                <MissLine text={verdict(feedback, onsetsMs, t)} />
              )
            ) : stage.kind === 'wait' ? (
              <span role="status" className="text-sm text-ink-soft">{t(S.wake)}</span>
            ) : null}
          </div>
        </div>

        <div className="md:mx-auto md:w-full md:max-w-2xl">
          <TapPad label={t(S.pad)} hint={t(S['pad.hint'])} onTap={tap} className="md:min-h-44" />
        </div>
      </div>
      <PausePanel
        open={pausedAt !== null}
        reason={shownReason}
        timeLeft={formatClock(secondsLeft)}
        played={formatElapsed(playedMs({ endsAt, pausedAt, settings }) / 1000, t)}
        correct={correct}
        wrong={wrong}
        onResume={() => useRhythmStore.getState().resume()}
        onEnd={() => useRhythmStore.getState().endEarly()}
        t={t}
      />
    </>
  )
}
