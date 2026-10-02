import { create } from 'zustand'
import { type Settings, getSettings, saveSettings } from '../progress/progressStore'

export interface PausedSession {
  /** Route to return to. */
  to: string
  secondsLeft: number
  correct: number
  wrong: number
}

interface AppState {
  settings: Settings
  /**
   * Whether home has played its entrance this visit. Session-only, never
   * saved: the staggered fade-in greets the reader once, and coming back from
   * a drill should show home as it was rather than build it up again.
   */
  homeIntroPlayed: boolean
  /**
   * A drill session the reader left mid-way (back, swipe), held paused in its
   * drill's store. Drills publish it here, since home may not read a drill
   * store; home offers to go back to it. Session-only, never saved.
   */
  pausedSession: PausedSession | null
  setPausedSession: (p: PausedSession | null) => void
  updateSettings: (p: Partial<Settings>) => void
  setLevel: (l: 1 | 2 | 3 | 4) => void
  markHomeIntroPlayed: () => void
}

const initialSettings = getSettings()
if (typeof document !== 'undefined') document.documentElement.lang = initialSettings.lang

export const useAppStore = create<AppState>((set, get) => ({
  settings: initialSettings,
  homeIntroPlayed: false,
  pausedSession: null,
  setPausedSession: pausedSession => set({ pausedSession }),
  updateSettings: p => {
    const settings = { ...get().settings, ...p }
    saveSettings(settings)
    // Keep the document language in step so screen readers and the browser's
    // own text handling follow the user's choice.
    document.documentElement.lang = settings.lang
    set({ settings })
  },
  setLevel: level => get().updateSettings({ level }),
  markHomeIntroPlayed: () => set({ homeIntroPlayed: true }),
}))
