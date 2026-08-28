import { useAppStore } from './store'
import { LANGS } from '../core/i18n/translate'
import { translate } from '../core/i18n/translate'

/**
 * Language switch. Each option is written in its own language, so someone who
 * cannot read the current one can still find theirs.
 */
export function LanguageToggle() {
  const { settings, updateSettings } = useAppStore()

  return (
    <div role="radiogroup" aria-label="Language" className="flex rounded-full border border-line p-0.5">
      {LANGS.map(lang => {
        const selected = settings.lang === lang
        return (
          <button
            key={lang}
            role="radio"
            aria-checked={selected}
            onClick={() => updateSettings({ lang })}
            className={
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 ' +
              (selected ? 'bg-accent text-accent-ink' : 'text-ink-faint hover:text-ink')
            }
          >
            {translate(lang, 'lang.name')}
          </button>
        )
      })}
    </div>
  )
}
