import { describe, it, expect, beforeEach } from 'vitest'
import { livePausedSession, useAppStore } from './store'
import { getSettings, saveLiveSession } from '../progress/progressStore'
import { LIVE_SESSION_MAX_AGE_MS } from '../config/constants'

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState({ settings: getSettings() })
})

describe('app store', () => {
  it('updateSettings persists', () => {
    useAppStore.getState().updateSettings({ naming: 'solfege' })
    expect(useAppStore.getState().settings.naming).toBe('solfege')
    expect(getSettings().naming).toBe('solfege')
  })
  it('setLevel persists, so the chosen level survives a reload', () => {
    useAppStore.getState().setLevel(3)
    expect(useAppStore.getState().settings.level).toBe(3)
    expect(getSettings().level).toBe(3)
  })
})

describe('activity panel mode', () => {
  it('opens collapsed on a first visit', () => {
    expect(useAppStore.getState().settings.activityExpanded).toBe(false)
  })
  it('remembers being expanded across a reload', () => {
    useAppStore.getState().updateSettings({ activityExpanded: true })
    // A fresh read of storage is what the next page load would see.
    expect(getSettings().activityExpanded).toBe(true)
  })
})

describe('paused session after a page load', () => {
  const at = (to: string, correct: number) => ({ to, secondsLeft: 30, correct, wrong: 0 })

  it('offers the most recent session still fresh enough to resume', () => {
    saveLiveSession('note-id', { phase: 'running' }, at('/train/note-id', 1), 1_000)
    saveLiveSession('hear-play', { phase: 'running' }, at('/train/hear-play', 2), 2_000)
    expect(livePausedSession(3_000)).toEqual(at('/train/hear-play', 2))
  })

  it('offers nothing once every session is too old to resume', () => {
    saveLiveSession('note-id', { phase: 'running' }, at('/train/note-id', 1), 1_000)
    expect(livePausedSession(1_000 + LIVE_SESSION_MAX_AGE_MS + 1)).toBeNull()
  })
})
