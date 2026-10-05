import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { BookOpenIcon, CaretLeftIcon, PlayIcon, SlidersHorizontalIcon, TrophyIcon } from '@phosphor-icons/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { sessionSummary } from '@/app/drillPreset'
import { Button, FieldLegend, Switch } from '@/core/components/atoms'
import { DurationPicker, SegmentedControl, SettingRow } from '@/core/components/molecules'
import { plainText } from '@/core/lesson/text'
import { getBest, getLessonsDone } from '@/progress/progressStore'
import { CHAPTERS } from '@/theory/registry'
import { useReviewStore } from '@/drills/review/store'
import review from '@/drills/review/drill'
import { S } from '@/drills/review/strings'
import { chaptersWithDone, chosenChapters, reviewPool, toggleChapter } from '@/drills/review/select'

/** Page: which chapters to review and for how long, from and to the app store, and the start button. */
export function SetupPhase() {
  const { settings, updateSettings, updateDrill } = useAppStore()
  const own = review.of(settings)
  const reduce = useReducedMotion()
  const t = useT()
  const backLink = useBackLink()
  const best = getBest(review.id, own.level)
  const done = getLessonsDone()
  const offered = chaptersWithDone(CHAPTERS, done)
  const offeredIds = offered.map(c => c.id)
  const chosen = chosenChapters(own.chapters, offeredIds)
  const pool = reviewPool(CHAPTERS, done, chosen)

  const groups = offered.length === 0 ? [
    <div key="empty" className="rounded-2xl border border-dashed border-line px-4 py-5 text-[15px] text-ink-soft">
      <p>{t(S['setup.empty'])}</p>
      <Link
        to="/learn"
        className="mt-2 inline-block font-medium text-ink underline decoration-line underline-offset-4
                   focus-visible:outline-2 focus-visible:outline-accent"
      >
        {t(S['setup.toLessons'])}
      </Link>
    </div>,
  ] : [
    <fieldset key="chapters" className="border-0 p-0">
      <FieldLegend icon={<BookOpenIcon size={15} weight="fill" />} label={t(S['setup.chapters'])} />
      <div className="divide-y divide-line rounded-2xl border border-line bg-raised">
        {offered.map(chapter => {
          const on = chosen.includes(chapter.id)
          const label = t('theory.chapter', { number: chapter.number, title: plainText(chapter.title[settings.lang], settings.naming) })
          return (
            <SettingRow
              key={chapter.id}
              label={label}
              hint={t(S['setup.checks'], { count: reviewPool([chapter], done, null).length })}
            >
              <Switch
                checked={on}
                label={label}
                // The last chapter on stays on: a review needs something to ask.
                disabled={on && chosen.length === 1}
                onChange={() => updateDrill(review.id, { chapters: toggleChapter(own.chapters, offeredIds, chapter.id) })}
              />
            </SettingRow>
          )
        })}
      </div>
    </fieldset>,
    <DurationPicker
      key="length"
      durationSec={own.durationSec}
      onChange={durationSec => updateDrill(review.id, { durationSec })}
      t={t}
    />,
    <fieldset key="prefs" className="border-0 p-0">
      <FieldLegend icon={<SlidersHorizontalIcon size={15} weight="bold" />} label={t('setup.notesAndSound')} />
      <div className="divide-y divide-line rounded-2xl border border-line bg-raised">
        <SettingRow label={t('setup.naming')}>
          <SegmentedControl
            compact
            label={t('setup.naming')}
            segments={[{ value: 'letters' as const, label: 'C D E' }, { value: 'solfege' as const, label: 'Do Re Mi' }]}
            value={settings.naming}
            onChange={naming => updateSettings({ naming })}
          />
        </SettingRow>
        <SettingRow label={t('setup.sound')} hint={t('setup.sound.hint')}>
          <Switch checked={settings.sound} label={t('setup.sound')} onChange={sound => updateSettings({ sound })} />
        </SettingRow>
      </div>
    </fieldset>,
  ]

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className="mx-auto w-full max-w-md flex-1 px-4 pt-4 pb-8 md:max-w-3xl md:px-8 md:pt-8">
        <div className="flex items-center gap-1">
          <Link to="/learn" onClick={backLink} aria-label={t('theory.back')}>
            <Button variant="quiet" className="px-2"><CaretLeftIcon size={22} weight="bold" /></Button>
          </Link>
          <h1 className="text-lg font-semibold md:text-2xl">{t(review.title)}</h1>
        </div>
        <p className="mt-2 text-[15px] leading-snug text-ink-soft md:mt-4">{t(S['setup.hint'])}</p>

        <div className="mt-6 flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-7">
          {groups.map((group, i) => (
            <motion.div
              key={group.key}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={group.key === 'chapters' || group.key === 'empty' ? 'md:col-span-2' : undefined}
            >
              {group}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sticky, so Start is on screen however far the settings run (see Đọc nốt's setup). */}
      <div className="sticky bottom-0 border-t border-line bg-raised/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-md flex-col gap-2.5 px-4 pt-3
                        pb-[max(1rem,env(safe-area-inset-bottom))] md:max-w-3xl md:flex-row
                        md:items-center md:justify-between md:gap-6 md:px-8 md:py-4">
          <div className="flex items-center justify-between gap-3 text-sm text-ink-soft md:flex-col md:items-start md:gap-0.5">
            <span>{sessionSummary(review, own, t)} {'·'} {t(S['setup.checks'], { count: pool.length })}</span>
            <span className="flex items-center gap-1.5">
              <TrophyIcon size={15} weight="fill" className="text-ink-faint" />
              {best
                ? <span>{t('setup.bestHere')} <span className="tnum font-semibold text-ink">{best.practiceScore}</span></span>
                : <span>{t('setup.noScoreYet')}</span>}
            </span>
          </div>
          <Button
            variant="cta"
            className="h-14 w-full text-lg md:w-56"
            disabled={pool.length === 0}
            onClick={() => useReviewStore.getState().start(settings)}
          >
            <PlayIcon size={20} weight="fill" /> {t('setup.start')}
          </Button>
        </div>
      </div>
    </div>
  )
}
