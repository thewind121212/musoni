import { LoadingScreen } from '@/core/components/molecules'
import { useT } from '@/app/useT'

/** Page: shown while a drill's or a lesson's code (staff renderer and music font) downloads. */
export function DrillLoading({ what = 'drill' }: { what?: 'drill' | 'lesson' }) {
  const t = useT()
  return <LoadingScreen label={t(what === 'lesson' ? 'loading.lesson' : 'loading.drill')} />
}
