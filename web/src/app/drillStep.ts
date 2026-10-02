/**
 * History marker for a drill step. A drill's phases share one URL, but a
 * running or finished session sits on one history entry of its own above the
 * drill's base entry (setup), so the browser's back (and a phone's edge-swipe)
 * steps back inside the drill instead of leaving it.
 */
export interface DrillStepState {
  drillStep: true
  /** The drill's base entry is the first of the app's history (opened directly). */
  baseIsFirst: boolean
}

export function isDrillStep(state: unknown): state is DrillStepState {
  return typeof state === 'object' && state !== null && (state as DrillStepState).drillStep === true
}
