import { LoadingScreen } from '@/core/components/molecules'
import { useT } from '@/app/useT'

/** Page: shown while a drill's code (staff renderer and music font) downloads. */
export function DrillLoading() {
  const t = useT()
  return <LoadingScreen label={t('loading.drill')} />
}
