import { describe, it, expect, beforeEach } from 'vitest'
import { useDrillStore } from './store'
import { getDay } from '../../progress/progressStore'

const settings = { naming: 'letters' as const, accidentals: false, sound: false }
const T0 = new Date('2026-08-28T10:00:00Z').getTime()

beforeEach(() => localStorage.clear())

describe('drill store', () => {
  it('start → running with a question and 60s clock', () => {
    useDrillStore.getState().start(1, settings, T0)
    const s = useDrillStore.getState()
    expect(s.status).toBe('running')
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
    expect(s.feedback).toEqual({ correctIndex: q.correctIndex, chosenIndex: q.correctIndex })
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
  it('tick past endsAt finishes and records the session', () => {
    useDrillStore.getState().start(1, settings, T0)
    const st = useDrillStore.getState()
    st.answer(st.question!.correctIndex, T0 + 800)
    useDrillStore.getState().tick(T0 + 61_000)
    const s = useDrillStore.getState()
    expect(s.status).toBe('finished')
    expect(s.lastResult!.correct).toBe(1)
    expect(s.lastResult!.weight).toBe(1)
    expect(getDay('2026-08-28')).toHaveLength(1)
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
    expect(postState.status).toBe('finished')
    expect(postState.question).toBeNull()
  })
  it('recordSession fires exactly once', () => {
    useDrillStore.getState().start(1, settings, T0)
    const st = useDrillStore.getState()
    st.answer(st.question!.correctIndex, T0 + 800)
    useDrillStore.getState().tick(T0 + 61_000)
    expect(getDay('2026-08-28')).toHaveLength(1)
    useDrillStore.getState().tick(T0 + 62_000)
    expect(getDay('2026-08-28')).toHaveLength(1)
  })
})
