import { Link } from 'react-router-dom'
import { ArrowLeftIcon, ArrowSquareOutIcon, FileTextIcon } from '@phosphor-icons/react'
import { useAppStore } from '@/app/store'
import { useT } from '@/app/useT'
import { useBackLink } from '@/app/useBackLink'
import { CHAPTERS } from '@/theory/registry'
import { plainText } from '@/core/lesson/text'
import { BOOK_TITLE } from '@/theory/components/molecules'

const BOOK_URL = 'https://musictheory.pugetsound.edu/mt21c/MusicTheory.html'
const LICENCE_URL = `${import.meta.env.BASE_URL}licenses/gfdl-1.3.txt`

/** Book sections a chapter adapts, in order ("1.1, 1.2, 1.3"). */
function sectionsOf(chapter: (typeof CHAPTERS)[number]): string {
  const all = new Set(chapter.lessons.flatMap(l => l.sources.map(s => s.section)))
  return [...all].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).join(', ')
}

/**
 * Page: "Về nội dung", the licence notice the GFDL asks for, in the reader's
 * language: the original, its author and licence, that the lessons are an
 * adapted and translated Modified Version under GFDL 1.3, the history, the
 * chapters adapted so far and the full licence text. Mirrors
 * `theory/content/NOTICE.md`.
 */
export function TheoryAbout() {
  const { lang, naming } = useAppStore(s => s.settings)
  const t = useT()
  const backLink = useBackLink()
  const link = 'font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent'
  const heading = 'text-xs font-semibold tracking-wide text-ink-faint uppercase'

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-12 md:max-w-2xl md:px-8">
      <header className="-ml-2 flex h-14 items-center gap-2 md:mt-6">
        <Link
          to="/theory" onClick={backLink} aria-label={t('theory.back')}
          className="flex size-11 items-center justify-center rounded-full text-ink-soft transition-colors duration-150
                     hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
        >
          <ArrowLeftIcon size={20} weight="bold" />
        </Link>
        <h1 className="text-lg font-semibold md:text-2xl">{t('theory.about.title')}</h1>
      </header>

      <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-ink-soft md:text-base">
        <p>{t('theory.about.intro')}</p>

        <section className="rounded-2xl border border-line bg-raised p-5">
          <p className="font-semibold text-ink"><i>{BOOK_TITLE}</i></p>
          <p className="text-sm">Robert Hutchinson · Copyright © 2017 Robert Hutchinson</p>
          <a href={BOOK_URL} target="_blank" rel="noreferrer" className={'mt-2 inline-flex items-center gap-1 text-sm ' + link}>
            {t('theory.about.visit')} <ArrowSquareOutIcon size={14} aria-hidden />
          </a>
        </section>

        <p>{t('theory.about.bookLicence')}</p>
        <p>{t('theory.about.ours')}</p>
        <p>{t('theory.about.freedom')}</p>
        <p>{t('theory.about.examples')}</p>

        <section className="flex flex-col gap-2">
          <h2 className={heading}>{t('theory.about.history')}</h2>
          <ul className="flex flex-col gap-1.5">
            <li><span className="tnum text-ink">2017</span> · <i>{BOOK_TITLE}</i>, {t('theory.about.history.book')}</li>
            <li><span className="tnum text-ink">2026</span> · {t('theory.about.history.ours')}</li>
          </ul>
        </section>

        <section className="flex flex-col gap-2">
          <h2 className={heading}>{t('theory.about.contents')}</h2>
          <ul className="flex flex-col gap-1.5">
            {CHAPTERS.map(c => (
              <li key={c.id}>
                {t('theory.chapter', { number: c.number, title: plainText(c.title[lang], naming) })}
                <span className="text-ink-faint"> · {sectionsOf(c)}</span>
              </li>
            ))}
          </ul>
        </section>

        <a href={LICENCE_URL} target="_blank" rel="noreferrer" className={'inline-flex items-center gap-1.5 ' + link}>
          <FileTextIcon size={16} aria-hidden /> {t('theory.about.licenceText')}
        </a>
      </div>
    </div>
  )
}
