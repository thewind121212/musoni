import type { ReactNode } from 'react'
import { CheckCircleIcon } from '@phosphor-icons/react'

export interface Option<T> {
  value: T
  label: string
  hint?: string
  visual: ReactNode
}

interface Props<T extends string | number | boolean> {
  /** Short heading for the group. */
  label: string
  /** One line saying what the choice actually controls. */
  description: string
  /** Small mark shown beside the heading. */
  icon: ReactNode
  options: readonly Option<T>[]
  value: T
  onChange: (value: T) => void
  columns?: 2 | 4
}

/**
 * A labelled group of selectable cards. Every choice in the app carries a
 * visual (a clef, a duration, the note names themselves) so the setup screen
 * reads as music rather than as a settings form.
 */
export function OptionCards<T extends string | number | boolean>({
  label, description, icon, options, value, onChange, columns = 2,
}: Props<T>) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-3 flex w-full items-start gap-2.5">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg
                         border border-line bg-raised text-ink-soft">
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-[15px] leading-snug font-semibold text-ink">{label}</span>
          <span className="text-xs leading-snug text-ink-faint">{description}</span>
        </span>
      </legend>
      <div className={'grid gap-2 ' + (columns === 4 ? 'grid-cols-4' : 'grid-cols-2')}>
        {options.map(option => {
          const selected = option.value === value
          return (
            <button
              key={String(option.value)}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={
                'relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 ' +
                'transition-[border-color,background-color,transform] duration-150 active:scale-[0.97] ' +
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
                (selected
                  ? 'border-accent bg-accent/10'
                  : 'border-line bg-raised hover:border-ink-faint')
              }
            >
              {selected && (
                <CheckCircleIcon
                  size={16} weight="fill"
                  className="absolute top-2 right-2 text-accent"
                />
              )}
              <span
                className={
                  'flex h-11 items-center justify-center ' +
                  (selected ? 'text-accent' : 'text-ink-soft')
                }
              >
                {option.visual}
              </span>
              <span className={'text-sm leading-tight font-medium ' + (selected ? 'text-ink' : 'text-ink-soft')}>
                {option.label}
              </span>
              {option.hint && (
                <span className="text-[11px] leading-tight text-ink-faint">{option.hint}</span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
