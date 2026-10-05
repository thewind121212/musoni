import { BookOpenIcon, MusicNoteIcon } from '@phosphor-icons/react'
import { TabBar, type TabItem } from '@/app/components/organisms'
import { PausedNotice } from '@/app/components/molecules'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { TAB_ROUTE, useTabNav, type Tab } from '@/app/useTabs'
import { drillAtRoute } from '@/app/drills'
import { formatClock } from '@/core/i18n/formatDuration'

/**
 * Page: what the two tabs share around their content, outside the route
 * transition so it never slides: the tab bar, and the bar offering back a
 * session left paused. Nothing off the tabs (drills, lessons, first open).
 */
export function TabChrome() {
  const { current, go } = useTabNav()
  const pausedSession = useAppStore(s => s.pausedSession)
  const t = useT()
  if (!current) return null

  const tabs: TabItem<Tab>[] = [
    { id: 'practice', label: t('tab.practice'), to: TAB_ROUTE.practice, icon: on => <MusicNoteIcon size={24} weight={on ? 'fill' : 'regular'} /> },
    { id: 'learn', label: t('tab.learn'), to: TAB_ROUTE.learn, icon: on => <BookOpenIcon size={24} weight={on ? 'fill' : 'regular'} /> },
  ]

  return (
    <>
      <TabBar tabs={tabs} current={current} onSelect={go} label={t('tab.label')} brand="musoni" />
      {pausedSession && (
        // The paused drill's own colour on its Resume button.
        <div data-drill={drillAtRoute(pausedSession.to)?.id} className="contents">
          <PausedNotice
            aboveTabBar
            to={pausedSession.to}
            title={t('home.paused')}
            detail={t('home.paused.detail', {
              left: formatClock(pausedSession.secondsLeft),
              correct: pausedSession.correct,
              wrong: pausedSession.wrong,
            })}
            actionLabel={t('home.paused.resume')}
          />
        </div>
      )}
    </>
  )
}
