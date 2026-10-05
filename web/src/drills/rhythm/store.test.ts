import { describe, it, expect, beforeEach } from 'vitest'
import { measureTiming, playedMs, useRhythmStore } from './store'
import { getDay, getSettings, localDayKey } from '@/progress/progressStore'
import { restoreLiveSession } from '@/app/liveSession'
import { withDrill } from '@/test/fixtures'
import { withPreset } from '@/app/drillPreset'
import type { DrillSettingValue } from '@/progress/progressStore'

const base = withDrill('rhythm', { durationSec: 60 }, { ...getSettings(), naming: 'letters' as const })
const at = (options: Record<string, DrillSettingValue> = {}) => withDrill('rhythm', options, base)
const T0 = new Date('2026-08-28T10:00:00Z').getTime()
const DAY0 = localDayKey(new Date(T0))
const store = () => useRhythmStore.getState()
/** The current measure's onsets in ms at the session's tempo. */
const onsets = () => measureTiming(store().question!, store().settings, store().level).onsetsMs

/** Plays the current measure: begins a take and judges these taps (default: every onset, exactly). */
function play(taps: number[] = onsets(), now = T0) {
  expect(store().beginTake(now)).toBe(true)
  store().judge(taps, now)
}

beforeEach(() => {
  localStorage.clear()
  useRhythmStore.setState({ phase: 'setup', question: null, feedback: null, takeAt: null, pausedAt: null, pauseReason: null })
})

describe('rhythm store', () => {
  it('counts a measure right when every note is on time, wrong otherwise, and streaks right ones', () => {
    store().start(at(), T0)
    play()
    expect(store().feedback!.correct).toBe(true)
    store().nextQuestion(T0)
    play()
    store().nextQuestion(T0)
    expect(store()).toMatchObject({ correct: 2, wrong: 0, streak: 2, bestStreak: 2 })
    play([])
    expect(store()).toMatchObject({ correct: 2, wrong: 1, streak: 0, bestStreak: 2 })
    expect(store().misses).toHaveLength(1)
    expect(store().misses[0].judgement.notes.every(n => n.mark === 'missed')).toBe(true)
  })

  it('takes the calibrated latency off every tap', () => {
    store().start(at({ latencyMs: 150 }), T0)
    play(onsets().map(t => t + 150))
    expect(store().feedback!.correct).toBe(true)
    // Uncalibrated, the same late taps are off the beat.
    store().start(at({ latencyMs: null }), T0)
    play(onsets().map(t => t + 150))
    expect(store().feedback!.correct).toBe(false)
  })

  it('judges a measure once, and only inside a take', () => {
    store().start(at(), T0)
    store().judge(onsets(), T0)
    expect(store().feedback).toBeNull()
    play()
    store().judge([], T0)
    expect(store()).toMatchObject({ correct: 1, wrong: 0 })
  })

  it('drops a take cut off by a pause, uncounted, and plays the same measure again after it', () => {
    store().start(at(), T0)
    const measure = store().question
    expect(store().beginTake(T0)).toBe(true)
    store().pause('menu', T0 + 1000)
    store().judge(onsets(), T0 + 1500)
    expect(store()).toMatchObject({ correct: 0, wrong: 0, takeAt: null, feedback: null })
    expect(store().beginTake(T0 + 2000)).toBe(false)
    store().resume(T0 + 5000)
    expect(store().question).toBe(measure)
    play(onsets(), T0 + 5000)
    expect(store().correct).toBe(1)
  })

  it('lets the measure being played finish when time runs out, then ends', () => {
    store().start(at(), T0)
    expect(store().beginTake(T0 + 59_000)).toBe(true)
    store().tick(T0 + 61_000)
    expect(store().phase).toBe('running')
    store().judge(onsets(), T0 + 62_000)
    // Its marks show first; the session ends on the way to the next measure.
    store().tick(T0 + 62_100)
    expect(store().phase).toBe('running')
    store().nextQuestion(T0 + 63_000)
    expect(store().phase).toBe('finished')
    expect(store().lastResult).toMatchObject({ drill: 'rhythm', correct: 1, durationSec: 60 })
    expect(store().lastResult!.partial).toBeUndefined()
  })

  it('ends between measures on the tick, and refuses a take once time is up', () => {
    store().start(at(), T0)
    store().tick(T0 + 60_000)
    expect(store().phase).toBe('finished')
    store().start(at(), T0)
    expect(store().beginTake(T0 + 60_500)).toBe(false)
    expect(store().phase).toBe('finished')
  })

  it('scores the pace of right measures by the level weight, and averages how far taps landed', () => {
    store().start(at({ level: 2 }), T0)
    for (let i = 0; i < 6; i++) {
      play(onsets().map(t => t + 20))
      store().nextQuestion(T0)
    }
    store().tick(T0 + 60_000)
    const r = store().lastResult!
    // 6 right in a minute x 10 points x weight 1.3 x 100% accuracy x endurance 1.
    expect(r).toMatchObject({ level: 2, correct: 6, wrong: 0, weight: 1.3, practiceScore: 78, avgMs: 20 })
  })

  it('applies a preset tempo for the session only', () => {
    const settings = withPreset(at({ tempo: 80 }), { drill: 'rhythm', level: 1, durationSec: 60, tempo: 60 })
    store().start(settings, T0)
    expect(measureTiming(store().question!, store().settings, 1).pulse.bpm).toBe(store().question!.meter === '6/8' ? 45 : 60)
    expect(getSettings().drills.rhythm?.tempo).toBeUndefined()
  })

  it('records an early end with measures as partial, and without as nothing', () => {
    store().start(at(), T0)
    store().endEarly(T0 + 5000)
    expect(store().phase).toBe('setup')
    expect(getDay(DAY0)).toEqual([])
    store().start(at(), T0)
    play()
    store().endEarly(T0 + 20_000)
    expect(store().lastResult).toMatchObject({ partial: true, durationSec: 20, practiceScore: 0 })
    expect(playedMs({ endsAt: T0 + 60_000, pausedAt: T0 + 20_000, settings: at() })).toBe(20_000)
  })

  it('comes back from a page load paused, past a measure already judged', () => {
    store().start(at(), T0)
    play()
    const judged = store().question
    restoreLiveSession(useRhythmStore, 'rhythm', T0 + 1000)
    expect(store()).toMatchObject({ phase: 'running', pauseReason: 'away', feedback: null, correct: 1 })
    expect(store().question).not.toEqual(judged)
  })
})
