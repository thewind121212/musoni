import { describe, it, expect, beforeEach } from 'vitest'
import { playedMs, useDrillStore } from './store'
import { getDay, localDayKey } from '../../progress/progressStore'

const settings = { level: 1 as const, durationSec: 60, accidentals: false, naming: 'letters' as const, sound: false, lang: 'en' as const, activityExpanded: false }
const T0 = new Date('2026-08-28T10:00:00Z').getTime()
const DAY0 = localDayKey(new Date(T0))

beforeEach(() => {
  localStorage.clear()
  useDrillStore.setState({ phase: 'setup', question: null, feedback: null, pausedAt: null, pauseReason: null })
})

describe('drill store', () => {
  it('start → running with a question and 60s clock', () => {
    useDrillStore.getState().start(1, settings, T0)
    const s = useDrillStore.getState()
    expect(s.phase).toBe('running')
    expect(s.question).not.toBeNull()
    expect(s.endsAt).toBe(T0 + 60_000)
  })
  it('correct answer increments correct + streak and sets feedback', () => {
    useDrillStore.getState().start(1, settings, T0)
    const q = useDrillStore.getState().question!
    useDrillStore.getState().answer(q.correctIndex, T0 + 1000)
    const s = useDrillStore.getState()
    expect(s.correct).toBe(1)
    expect(s.streak).toBe(1)
    expect(s.feedback).toEqual({ correctIndex: q.correctIndex, chosenIndex: q.correctIndex, correct: true })
    expect(s.sumMs).toBe(1000)
  })
  it('wrong answer resets streak, keeps bestStreak', () => {
    useDrillStore.getState().start(1, settings, T0)
    const st = useDrillStore.getState()
    st.answer(st.question!.correctIndex, T0 + 500)
    useDrillStore.getState().nextQuestion(T0 + 500)
    const q2 = useDrillStore.getState().question!
    const wrongIdx = (q2.correctIndex + 1) % q2.options.length
    useDrillStore.getState().answer(wrongIdx, T0 + 1000)
    const s = useDrillStore.getState()
    expect(s.wrong).toBe(1)
    expect(s.streak).toBe(0)
    expect(s.bestStreak).toBe(1)
  })
  it('keeps each miss with the note and both key labels, and starts the next session clean', () => {
    useDrillStore.getState().start(1, settings, T0)
    const q = useDrillStore.getState().question!
    useDrillStore.getState().answer(q.correctIndex, T0 + 300)
    useDrillStore.getState().nextQuestion(T0 + 300)
    const q2 = useDrillStore.getState().question!
    const wrongIdx = (q2.correctIndex + 1) % q2.options.length
    useDrillStore.getState().answer(wrongIdx, T0 + 900)
    expect(useDrillStore.getState().misses).toEqual([{
      clef: q2.clef, pitch: q2.pitch,
      answer: q2.options[q2.correctIndex].label, chosen: q2.options[wrongIdx].label,
    }])
    useDrillStore.getState().start(1, settings, T0 + 5000)
    expect(useDrillStore.getState().misses).toEqual([])
  })
  it('tick past endsAt finishes and records the session', () => {
    useDrillStore.getState().start(1, settings, T0)
    const st = useDrillStore.getState()
    st.answer(st.question!.correctIndex, T0 + 800)
    useDrillStore.getState().tick(T0 + 61_000)
    const s = useDrillStore.getState()
    expect(s.phase).toBe('finished')
    expect(s.lastResult!.correct).toBe(1)
    expect(s.lastResult!.weight).toBe(1)
    expect(getDay(DAY0)).toHaveLength(1)
  })
  it('answer is ignored while feedback is pending', () => {
    useDrillStore.getState().start(1, settings, T0)
    const q = useDrillStore.getState().question!
    useDrillStore.getState().answer(q.correctIndex, T0 + 1000)
    expect(useDrillStore.getState().correct).toBe(1)
    const wrongIdx = (q.correctIndex + 1) % q.options.length
    useDrillStore.getState().answer(wrongIdx, T0 + 2000)
    expect(useDrillStore.getState().correct).toBe(1)
    expect(useDrillStore.getState().wrong).toBe(0)
  })
  it('actions are no-ops after finish', () => {
    useDrillStore.getState().start(1, settings, T0)
    const st = useDrillStore.getState()
    st.answer(st.question!.correctIndex, T0 + 800)
    useDrillStore.getState().tick(T0 + 61_000)
    const preFinishState = useDrillStore.getState()
    useDrillStore.getState().answer(0, T0 + 62_000)
    useDrillStore.getState().nextQuestion(T0 + 62_000)
    useDrillStore.getState().tick(T0 + 63_000)
    const postState = useDrillStore.getState()
    expect(postState.correct).toBe(preFinishState.correct)
    expect(postState.phase).toBe('finished')
    expect(postState.question).toBeNull()
  })
  it('recordSession fires exactly once', () => {
    useDrillStore.getState().start(1, settings, T0)
    const st = useDrillStore.getState()
    st.answer(st.question!.correctIndex, T0 + 800)
    useDrillStore.getState().tick(T0 + 61_000)
    expect(getDay(DAY0)).toHaveLength(1)
    useDrillStore.getState().tick(T0 + 62_000)
    expect(getDay(DAY0)).toHaveLength(1)
  })
})

describe('phases and session length', () => {
  it('starts in setup', () => {
    useDrillStore.setState({ phase: 'setup' })
    expect(useDrillStore.getState().phase).toBe('setup')
  })
  it('honours the chosen session length', () => {
    useDrillStore.getState().start(1, { ...settings, durationSec: 300 }, T0)
    expect(useDrillStore.getState().endsAt).toBe(T0 + 300_000)
  })
  it('records the length it was played at', () => {
    useDrillStore.getState().start(2, { ...settings, durationSec: 30 }, T0)
    useDrillStore.getState().tick(T0 + 31_000)
    expect(useDrillStore.getState().lastResult!.durationSec).toBe(30)
  })
  it('backToSetup returns to the setup phase and clears the question', () => {
    useDrillStore.getState().start(1, settings, T0)
    useDrillStore.getState().backToSetup()
    const s = useDrillStore.getState()
    expect(s.phase).toBe('setup')
    expect(s.question).toBeNull()
  })
})

describe('pausing and leaving mid-session', () => {
  const answerOnce = (at: number, right = true) => {
    const q = useDrillStore.getState().question!
    useDrillStore.getState().answer(right ? q.correctIndex : (q.correctIndex + 1) % q.options.length, at)
    useDrillStore.getState().nextQuestion(at)
  }

  it('stops the clock while paused and hands the paused time back on resume', () => {
    useDrillStore.getState().start(1, settings, T0)
    useDrillStore.getState().pause('menu', T0 + 10_000)
    useDrillStore.getState().tick(T0 + 120_000)
    expect(useDrillStore.getState().phase).toBe('running')
    useDrillStore.getState().resume(T0 + 130_000)
    const s = useDrillStore.getState()
    expect(s.endsAt).toBe(T0 + 60_000 + 120_000)
    expect(playedMs(s, T0 + 130_000)).toBe(10_000)
  })

  it('ignores answers while paused', () => {
    useDrillStore.getState().start(1, settings, T0)
    useDrillStore.getState().pause('away', T0 + 1000)
    answerOnce(T0 + 2000)
    expect(useDrillStore.getState().correct).toBe(0)
  })

  it('keeps answer timing honest across a pause', () => {
    useDrillStore.getState().start(1, settings, T0)
    useDrillStore.getState().pause('menu', T0 + 1000)
    useDrillStore.getState().resume(T0 + 61_000)
    answerOnce(T0 + 62_000)
    expect(useDrillStore.getState().sumMs).toBe(2000)
  })

  it('ending early records the played time as a partial session and shows it', () => {
    useDrillStore.getState().start(1, settings, T0)
    answerOnce(T0 + 5000)
    answerOnce(T0 + 8000, false)
    useDrillStore.getState().endEarly(T0 + 12_000)
    const s = useDrillStore.getState()
    expect(s.phase).toBe('finished')
    expect(s.lastResult).toMatchObject({ partial: true, durationSec: 12, correct: 1, wrong: 1, practiceScore: 0 })
    expect(getDay(DAY0)).toHaveLength(1)
  })

  it('ending early with no answers keeps nothing and returns to setup', () => {
    useDrillStore.getState().start(1, settings, T0)
    useDrillStore.getState().endEarly(T0 + 3000)
    expect(useDrillStore.getState().phase).toBe('setup')
    expect(getDay(DAY0)).toHaveLength(0)
  })

  it('a session left paused is recorded as partial once a new one starts, not as a full one', () => {
    // Regression: leaving by back and coming back after the clock ran out
    // finished and recorded the abandoned session at full length.
    useDrillStore.getState().start(1, settings, T0)
    answerOnce(T0 + 4000)
    useDrillStore.getState().pause('away', T0 + 6000)
    useDrillStore.getState().tick(T0 + 600_000)
    expect(getDay(DAY0)).toHaveLength(0)
    useDrillStore.getState().start(1, settings, T0 + 600_000)
    expect(getDay(DAY0)).toEqual([expect.objectContaining({ partial: true, durationSec: 6 })])
  })
})

