import type { ReactNode } from 'react'
import { CheckCircleIcon } from '@phosphor-icons/react'
import { FieldLegend } from '@/core/components/atoms'

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
  description?: string
  /** Small mark shown beside the heading. */
  icon: ReactNode
  options: readonly Option<T>[]
  value: T
  onChange: (value: T) => void
  columns?: 2 | 4
  /**
   * `stack` puts the visual above the label; `row` puts it beside, which is
   * about half the height and keeps a long settings page on one screen.
   */
  layout?: 'stack' | 'row'
}

/**
 * A labelled group of selectable cards. Every choice in the app carries a
 * visual (a clef, a duration, the note names themselves) so the setup screen
 * reads as music rather than as a settings form.
 */
export function OptionCards<T extends string | number | boolean>({
  label, description, icon, options, value, onChange, columns = 2, layout = 'stack',
}: Props<T>) {
  const row = layout === 'row'
  return (
    <fieldset className="border-0 p-0">
      <FieldLegend icon={icon} label={label} description={description} />
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
                'relative flex rounded-2xl border ' +
                (row
                  ? 'items-center gap-2.5 px-2.5 py-2 text-left '
                  : 'flex-col items-center justify-center gap-1.5 p-3 ') +
                'transition-[border-color,background-color,transform] duration-150 active:scale-[0.97] ' +
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
                (selected
                  ? 'border-accent bg-accent/10'
                  : 'border-line bg-raised hover:border-ink-faint')
              }
            >
              {selected && !row && (
                <CheckCircleIcon
                  size={16} weight="fill"
                  className="absolute top-2 right-2 text-accent"
                />
              )}
              <span
                className={
                  'flex shrink-0 items-center justify-center ' + (row ? 'h-10 w-14 ' : 'h-11 ') +
                  (selected ? 'text-accent' : 'text-ink-soft')
                }
              >
                {option.visual}
              </span>
              <span className={'flex min-w-0 flex-col gap-0.5 ' + (row ? '' : 'items-center text-center')}>
                <span className={'text-sm leading-tight font-medium ' + (selected ? 'text-ink' : 'text-ink-soft')}>
                  {option.label}
                </span>
                {option.hint && (
                  <span className="text-[11px] leading-tight text-ink-faint">{option.hint}</span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
