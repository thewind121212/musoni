import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from './store'
import { getSettings } from '../progress/progressStore'

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
