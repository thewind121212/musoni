import { en, vi, type TranslationKey } from './translations'

export type Lang = 'vi' | 'en'

/** Vietnamese first: the app is built for that market. */
export const DEFAULT_LANG: Lang = 'vi'
export const LANGS: Lang[] = ['vi', 'en']

const DICTIONARIES: Record<Lang, Record<string, string>> = { vi, en }

export type TranslationParams = Record<string, string | number> & { count?: number }

/**
 * Pure lookup: no store, no React, so it can be unit tested and used anywhere.
 * The `app` module binds it to the user's chosen language.
 *
 * Falls back to English rather than printing a raw key, so a missing string is
 * still readable if one ever slips past the type checker.
 */
export function translate(lang: Lang, key: TranslationKey, params?: TranslationParams): string {
  const dict = DICTIONARIES[lang]

  let resolved: string = key
  if (typeof params?.count === 'number') {
    const variant = `${key}_${new Intl.PluralRules(lang).select(params.count)}`
    if (dict[variant] !== undefined) resolved = variant
  }

  const template = dict[resolved] ?? en[resolved as TranslationKey] ?? en[key] ?? key
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    params[name] !== undefined ? String(params[name]) : whole,
  )
}
