import { useCallback } from 'react'
import { useAppStore } from './store'
import { translate, type AnyKey, type TranslationParams } from '../core/i18n/translate'

/**
 * Binds the pure translator to the user's chosen language.
 *
 * The lookup itself lives in `core/i18n` with no store dependency; this hook is
 * the app-module wiring, which keeps core free of app state.
 */
export function useT() {
  const lang = useAppStore(s => s.settings.lang)
  return useCallback(
    (key: AnyKey, params?: TranslationParams) => translate(lang, key, params),
    [lang],
  )
}
