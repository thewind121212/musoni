import { Suspense, useLayoutEffect, useState } from 'react'
import type { DrillEntry } from '@/app/drill'
import { drillPage } from '@/app/routes'
import { DrillLoading } from '../DrillLoading'

/**
 * Page: one registered drill's route. Loads the drill's page on its own chunk
 * (the loading screen meanwhile) and puts its id on `<html>` as `data-drill`,
 * so its own action colour (from the registry, see `drillColourCss`) reaches
 * the pause sheet too, which portals to `<body>`. Layout effect: Start never
 * paints amber first.
 */
export function DrillRoute({ drill }: { drill: DrillEntry }) {
  const [Page] = useState(() => drillPage(drill))
  useLayoutEffect(() => {
    const root = document.documentElement
    root.dataset.drill = drill.id
    return () => {
      if (root.dataset.drill === drill.id) delete root.dataset.drill
    }
  }, [drill.id])
  return (
    <Suspense fallback={<DrillLoading />}>
      <Page />
    </Suspense>
  )
}
