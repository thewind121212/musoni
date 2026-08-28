import { create } from 'zustand'
import { type Settings, getSettings, saveSettings } from '../progress/progressStore'

interface AppState {
  settings: Settings
  level: 1 | 2 | 3 | 4
  updateSettings: (p: Partial<Settings>) => void
  setLevel: (l: 1 | 2 | 3 | 4) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  settings: getSettings(),
  level: 1,
  updateSettings: p => {
    const settings = { ...get().settings, ...p }
    saveSettings(settings)
    set({ settings })
  },
  setLevel: level => set({ level }),
}))
