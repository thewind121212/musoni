import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'quiet'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-2xl font-medium ' +
  'transition-[transform,background-color,border-color,color] duration-150 ' +
  'active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-accent disabled:opacity-40 disabled:active:scale-100'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:brightness-110',
  ghost: 'border border-line bg-raised text-ink hover:border-ink-faint',
  quiet: 'text-ink-soft hover:text-ink',
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export function Button({ variant = 'ghost', className = '', children, ...rest }: Props) {
  return (
    <button {...rest} className={`${BASE} ${VARIANTS[variant]} min-h-12 px-5 ${className}`}>
      {children}
    </button>
  )
}
