import { create } from 'zustand'
import { type Settings, getSettings, saveSettings } from '../progress/progressStore'

interface AppState {
  settings: Settings
  level: 1 | 2 | 3 | 4
  updateSettings: (p: Partial<Settings>) => void
  setLevel: (l: 1 | 2 | 3 | 4) => void
}

const initialSettings = getSettings()
if (typeof document !== 'undefined') document.documentElement.lang = initialSettings.lang

export const useAppStore = create<AppState>((set, get) => ({
  settings: initialSettings,
  level: 1,
  updateSettings: p => {
    const settings = { ...get().settings, ...p }
    saveSettings(settings)
    // Keep the document language in step so screen readers and the browser's
    // own text handling follow the user's choice.
    document.documentElement.lang = settings.lang
    set({ settings })
  },
  setLevel: level => set({ level }),
}))
