import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from './store'
import { getSettings } from '../progress/progressStore'

beforeEach(() => {
  localStorage.clear()
  useAppStore.setState({ level: 1, settings: getSettings() })
})

describe('app store', () => {
  it('updateSettings persists', () => {
    useAppStore.getState().updateSettings({ naming: 'solfege' })
    expect(useAppStore.getState().settings.naming).toBe('solfege')
    expect(getSettings().naming).toBe('solfege')
  })
  it('setLevel', () => {
    useAppStore.getState().setLevel(3)
    expect(useAppStore.getState().level).toBe(3)
  })
})
