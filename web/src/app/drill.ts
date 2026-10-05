import type { ComponentType } from 'react'
import type { Icon } from '@phosphor-icons/react'
import type { DrillKey, Translate } from '@/core/i18n/translate'
import type { DrillSettingValue, Settings } from '@/progress/progressStore'

/*
 * What a drill declares about itself. Each drill's folder holds one
 * `drill.ts` whose default export is `defineDrill({...})`; the registry
 * (`app/drills`) finds it by glob, so a new drill touches no shared file.
 * The checklist: docs/fe/architecture.md "How to add a drill".
 *
 * Keep `drill.ts` light: the Luyện tab imports every one at startup. It may
 * import the drill's strings, icons and config constants; the drill's pages,
 * store and generator load through `page` only.
 */

/** A drill's own options beyond level and length (`accidentals`, `cadenceEach`, `chapters`). */
export type DrillOptions = Record<string, DrillSettingValue>

/** One drill's workout: its level (from 1), session length in seconds, and its own options. */
export type DrillSettings<O extends DrillOptions = DrillOptions> = { level: number; durationSec: number } & O

/** Luyện groups drills by what they train: reading the page, or hearing and tapping. */
export type DrillGroup = 'read' | 'ear'

export interface DrillLevel {
  /** "Khóa Sol": the level's name in setup, on Luyện's stat strip and in a lesson's practice summary. */
  name: DrillKey
  /** "Chỉ trong khuông nhạc": one line under the name in setup. */
  detail?: DrillKey
}

/**
 * A drill's own action colour instead of amber: Start, Luyện, the pause sheet
 * and its paused bar. One pair per theme; keep the ink at AA contrast on it.
 */
export interface DrillColour {
  light: { cta: string; ink: string }
  dark: { cta: string; ink: string }
}

export interface DrillDefinition<O extends DrillOptions = DrillOptions> {
  /** Slug, unique, never renamed: the route (`/train/<id>`), the saved settings and sessions are keyed on it. */
  id: string
  /** The drill's page (setup, run and result), loaded on its own chunk. */
  page: () => Promise<ComponentType>
  /** Phosphor icon for its cards. */
  icon: Icon
  /** "Đọc nốt nhạc". */
  title: DrillKey
  /** "Gọi tên nốt trên khuông": one line under the title on Luyện. */
  description: DrillKey
  /** "Đọc nốt": the short name on a lesson's practice tag. Defaults to the title. */
  short?: DrillKey
  /**
   * What a first session at level 1 asks, for Hôm nay's reason line: "Bắt
   * đầu nhẹ: {starter}." ("gọi tên nốt khóa Sol, chỉ phím trắng").
   */
  starter?: DrillKey
  group: DrillGroup
  /** Place within its group on Luyện; lower first. */
  order: number
  /** Levels in order: level 1 is `levels[0]`. A drill without levels has one. */
  levels: DrillLevel[]
  /** The workout a reader starts with. Every option the drill reads needs a default here. */
  defaults: DrillSettings<O>
  /**
   * Options a lesson preset (and Hôm nay) may set besides level and length.
   * A preset that leaves one out runs it at its default; options not listed
   * here stay the reader's own.
   */
  presetOptions?: (keyof O & string)[]
  /** Extra tags for a one-line summary ("♯ ♭"), from the session's settings. */
  tags?(s: DrillSettings<O>, t: Translate): string[]
  /** Its own action colour; amber when absent. */
  colour?: DrillColour
  /**
   * The lesson (`<chapter id>/<lesson id>`, the key in finished lessons, e.g.
   * `pitch-staff/staff-clefs`) that opens this drill on Luyện. Absent: open
   * from the start. A lesson that does not exist yet keeps it unopened (it
   * still opens once played, from "Xem tất cả" or a lesson's practice link).
   */
  unlockedBy?: string
  /**
   * False keeps it off Luyện, out of Hôm nay and out of the drills-to-open
   * count (Ôn tập, reached from Học). Default true.
   */
  listed?: boolean
}

// `presetOptions` is loosened to strings here: `keyof O` would make a typed
// entry unassignable to the registry's `DrillEntry` (keyof flips variance).
export interface DrillEntry<O extends DrillOptions = DrillOptions> extends Omit<DrillDefinition<O>, 'presetOptions'> {
  presetOptions?: readonly string[]
  /** `/train/<id>`. */
  route: string
  /** This drill's workout from the reader's settings: saved values over the defaults. */
  of: (settings: Pick<Settings, 'drills'>) => DrillSettings<O>
}

/** A drill's registry entry. The default export of `drills/<id>/drill.ts`. */
export function defineDrill<O extends DrillOptions = Record<never, never>>(d: DrillDefinition<O>): DrillEntry<O> {
  return {
    ...d,
    route: `/train/${d.id}`,
    of: settings => ({ ...d.defaults, ...settings.drills[d.id] }) as DrillSettings<O>,
  }
}
