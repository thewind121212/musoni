import type { DrillEntry, DrillGroup } from './drill'

/*
 * The drill registry: every `drills/<id>/drill.ts`, found by its folder. A
 * drill PR adds a folder and touches nothing here. Routes, Luyện's cards, the
 * loading screen, prefetching, presets, settings defaults, unlocks, bests and
 * the paused bar all read this list. Types and `defineDrill`: `app/drill`.
 */

const GROUPS: DrillGroup[] = ['read', 'ear']
const byPlace = (a: DrillEntry, b: DrillEntry) =>
  GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) || a.order - b.order || a.id.localeCompare(b.id)

const registry: DrillEntry[] = []

/**
 * Adds drills to the registry; returns a function that takes them out again.
 * The glob below adds the real ones. Tests add a fake drill this way.
 */
export function addDrills(...entries: DrillEntry[]): () => void {
  for (const e of entries) {
    if (registry.some(d => d.id === e.id)) throw new Error(`drill "${e.id}" is registered twice`)
    registry.push(e)
  }
  registry.sort(byPlace)
  return () => {
    for (const e of entries) {
      const at = registry.indexOf(e)
      if (at !== -1) registry.splice(at, 1)
    }
  }
}

addDrills(...Object.values(import.meta.glob<DrillEntry>('../drills/*/drill.ts', { eager: true, import: 'default' })))

/** Every registered drill, Luyện's order: reading drills first, then ear drills, each by `order`. */
export function allDrills(): readonly DrillEntry[] {
  return registry
}

/** Drills Luyện lists (everything but Ôn tập). */
export function listedDrills(): DrillEntry[] {
  return registry.filter(d => d.listed !== false)
}

export function findDrill(id: string): DrillEntry | undefined {
  return registry.find(d => d.id === id)
}

/** The drill a route belongs to (`/train/<id>`), for the paused bar's colour. */
export function drillAtRoute(path: string): DrillEntry | undefined {
  return registry.find(d => d.route === path)
}

/**
 * The CSS for drills with their own action colour: one rule per drill on
 * `[data-drill="<id>"]`, light and dark. It sets the Tailwind theme variables
 * (`--color-cta`), not `--cta`, which `@theme` resolves once at `:root`.
 */
export function drillColourCss(drills: readonly DrillEntry[] = registry): string {
  return drills.filter(d => d.colour).map(({ id, colour }) => {
    const sel = `[data-drill="${id}"]`
    return `${sel}{--color-cta:${colour!.light.cta};--color-cta-ink:${colour!.light.ink}}`
      + `[data-theme="dark"]${sel},[data-theme="dark"] ${sel}{--color-cta:${colour!.dark.cta};--color-cta-ink:${colour!.dark.ink}}`
  }).join('\n')
}
