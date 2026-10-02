import { LOADING_SHOW_AFTER_MS } from '@/config/constants'

const KEYS = 7

/**
 * Full-screen wait while a screen's code downloads: a small keyboard whose keys
 * press one after another, and what is loading in words.
 *
 * It fades in only after a short wait, so a fast load (a cached chunk) shows
 * nothing at all instead of a flash.
 */
export function LoadingScreen({ label }: { label: string }) {
  return (
    <div
      role="status"
      className="flex min-h-[100dvh] animate-fade-in flex-col items-center justify-center gap-5 px-4"
      style={{ animationDelay: `${LOADING_SHOW_AFTER_MS}ms` }}
    >
      <div aria-hidden="true" className="flex h-14 w-36 gap-1">
        {Array.from({ length: KEYS }, (_, i) => (
          <span
            key={i}
            className="flex-1 origin-top rounded-b-md border border-line bg-raised
                       motion-safe:animate-key-press"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-ink-soft">{label}</p>
    </div>
  )
}
