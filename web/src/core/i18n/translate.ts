import { en, vi, type TranslationKey } from './translations'

export type Lang = 'vi' | 'en'

/** Vietnamese first: the app is built for that market. */
export const DEFAULT_LANG: Lang = 'vi'
export const LANGS: Lang[] = ['vi', 'en']

/**
 * A string a drill ships from its own folder (`defineStrings`), named
 * `drill.<id>.<name>`. Kept apart from the core keys so a drill PR never edits
 * `translations.ts`.
 */
export type DrillKey = `drill.${string}`
/** Any key the translator knows: the core dictionary's, or a drill's own. */
export type AnyKey = TranslationKey | DrillKey

// Copies: drills add their strings here, and the core dictionaries stay as written.
const DICTIONARIES: Record<Lang, Record<string, string>> = { vi: { ...vi }, en: { ...en } }

export type TranslationParams = Record<string, string | number> & { count?: number }

/** A translator bound to one language; what pure components take as `t`. */
export type Translate = (key: AnyKey, params?: TranslationParams) => string

/** Adds a module's own strings (a drill's) to both dictionaries. */
export function addStrings(strings: Record<Lang, Record<string, string>>): void {
  for (const lang of LANGS) Object.assign(DICTIONARIES[lang], strings[lang])
}

/**
 * A drill's own strings, Vietnamese typed against English so a missing
 * translation is a compile error. Registers them with the translator and
 * returns each name's full key: `defineStrings('note-id', { title: 'Note
 * reading' }, { title: 'Đọc nốt nhạc' }).title` is `'drill.note-id.title'`,
 * ready for `t(...)`. Plurals work as in the core dictionary (`name_one`).
 */
export function defineStrings<const E extends Record<string, string>>(
  id: string, enStrings: E, viStrings: { [K in keyof E]: string },
): { [K in keyof E]: DrillKey } {
  const prefix = `drill.${id}.`
  const scoped = (d: Record<string, string>) =>
    Object.fromEntries(Object.entries(d).map(([k, v]) => [prefix + k, v]))
  addStrings({ en: scoped(enStrings), vi: scoped(viStrings) })
  return Object.fromEntries(Object.keys(enStrings).map(k => [k, prefix + k])) as { [K in keyof E]: DrillKey }
}

/**
 * Lookup with no store and no React, so it can be unit tested and used
 * anywhere. The `app` module binds it to the user's chosen language.
 *
 * Falls back to English rather than printing a raw key, so a missing string is
 * still readable if one ever slips past the type checker.
 */
export function translate(lang: Lang, key: AnyKey, params?: TranslationParams): string {
  const dict = DICTIONARIES[lang]

  let resolved: string = key
  if (typeof params?.count === 'number') {
    const variant = `${key}_${new Intl.PluralRules(lang).select(params.count)}`
    if (dict[variant] !== undefined) resolved = variant
  }

  const template = dict[resolved] ?? DICTIONARIES.en[resolved] ?? DICTIONARIES.en[key]
  if (template === undefined) {
    // Rendering the key is how `duration.480` reached the interface. Say so
    // loudly in development so the next one is caught before it ships.
    if (import.meta.env?.DEV) console.warn(`[i18n] missing key: ${key}`)
    return key
  }
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    params[name] !== undefined ? String(params[name]) : whole,
  )
}
