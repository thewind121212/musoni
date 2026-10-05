import type { StartPoint } from '@/progress/progressStore'

/** The first-open question's route. */
export const WELCOME_ROUTE = '/welcome'

/** Route state when Học opens the question again, to change the start point. */
export const CHANGE_START = { changeStart: true } as const

export function changingStart(state: unknown): boolean {
  return typeof state === 'object' && state !== null && (state as { changeStart?: unknown }).changeStart === true
}

/**
 * Whether the tabs send the reader to the first-open question: never
 * answered, and nothing done yet. A reader with any history (from before the
 * question existed) is never asked.
 */
export function needsFirstOpen(startPoint: StartPoint | null, hasHistory: boolean): boolean {
  return startPoint === null && !hasHistory
}
