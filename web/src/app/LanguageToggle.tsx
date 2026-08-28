import { TranslateIcon } from '@phosphor-icons/react'
import { useAppStore } from './store'
import { LANGS, translate } from '../core/i18n/translate'

/**
 * Language switch, kept small: with only two languages a cycle button beats a
 * row of options, and the label is written in the language it switches to so it
 * is legible to someone who cannot read the current one.
 */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { settings, updateSettings } = useAppStore()
  const next = LANGS[(LANGS.indexOf(settings.lang) + 1) % LANGS.length]

  return (
    <button
      onClick={() => updateSettings({ lang: next })}
      aria-label={`${translate(next, 'lang.name')}`}
      title={translate(next, 'lang.name')}
      className={
        'flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ' +
        'text-ink-faint transition-colors duration-150 hover:bg-line hover:text-ink ' +
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' + className
      }
    >
      <TranslateIcon size={13} weight="bold" />
      {settings.lang.toUpperCase()}
    </button>
  )
}
