import type { ReactNode } from 'react'

interface Props {
  /** Small mark shown beside the heading. */
  icon: ReactNode
  /** Short heading for the group. */
  label: string
  /** One line saying what the choice actually controls. */
  description?: string
}

/** The heading of a settings group. Renders a `<legend>`, so it goes first inside a `<fieldset>`. */
export function FieldLegend({ icon, label, description }: Props) {
  return (
    <legend className={'mb-3 flex w-full gap-2.5 ' + (description ? 'items-start' : 'items-center')}>
      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg
                       border border-line bg-raised text-ink-soft">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[15px] leading-snug font-semibold text-ink">{label}</span>
        {description && <span className="text-xs leading-snug text-ink-faint">{description}</span>}
      </span>
    </legend>
  )
}
