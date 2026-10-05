import { useEffect } from 'react'

/** The notation ink, read from the `--staff` token so notation follows the theme. */
export function inkColor(el: HTMLElement): string {
  return getComputedStyle(el).getPropertyValue('--staff').trim() || '#111'
}

/** Reads a semantic colour token, so notation follows the theme like everything else. */
export function token(el: HTMLElement, name: string, fallback: string): string {
  return getComputedStyle(el).getPropertyValue(name).trim() || fallback
}

/**
 * Repaints when the theme changes, because the ink colour is read from a token
 * at draw time. The app is white-locked and only switches on an explicit
 * data-theme attribute, so that attribute is what is watched, not the OS
 * preference.
 */
export function useRedrawOnThemeChange(draw: () => void, deps: unknown[]) {
  useEffect(() => {
    draw()
    const observer = new MutationObserver(draw)
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
