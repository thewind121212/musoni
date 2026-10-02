import { act, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'

// Lets React flush effects and state updates synchronously inside act().
;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

export interface Rendered {
  container: HTMLElement
  rerender: (ui: ReactNode) => void
  unmount: () => void
}

/**
 * Mounts a tree into a detached-from-nothing div in the jsdom body. A small
 * stand-in for Testing Library, so the guard tests need no extra dependency.
 */
export function render(ui: ReactNode): Rendered {
  const container = document.createElement('div')
  document.body.appendChild(container)
  let root: Root
  act(() => {
    root = createRoot(container)
    root.render(ui)
  })
  return {
    container,
    rerender: next => act(() => root.render(next)),
    unmount: () => {
      act(() => root.unmount())
      container.remove()
    },
  }
}

/** Dispatches a keydown on window inside act, the way RunPhase listens. */
export function pressKey(init: KeyboardEventInit) {
  act(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, ...init }))
  })
}
