import { Link } from 'react-router-dom'
import type { Source } from '@/theory/types'

interface Props {
  /** "Phỏng theo". */
  adapted: string
  /** "mục" / "section" / "sections". */
  sectionWord: string
  sources: readonly Source[]
  /** Route of the "Về nội dung" page. */
  aboutTo: string
}

export const BOOK_TITLE = 'Music Theory for the 21st-Century Classroom'

/**
 * The credit every lesson carries (GFDL: name the original and that this is
 * adapted): the book, its author, the sections this lesson came from (linked
 * to the book's pages) and the licence (linked to the about page).
 */
export function SourceLine({ adapted, sectionWord, sources, aboutTo }: Props) {
  const link = 'underline decoration-line underline-offset-2 hover:text-ink'
  return (
    <p className="text-xs leading-normal text-ink-faint">
      {adapted} <i>{BOOK_TITLE}</i>, R. Hutchinson, {sectionWord}{' '}
      {sources.map((s, i) => (
        <span key={s.section}>
          {i > 0 && ', '}
          <a href={s.url} target="_blank" rel="noreferrer" className={link}>{s.section}</a>
        </span>
      ))}
      {' · '}
      <Link to={aboutTo} className={link}>GNU FDL 1.3</Link>
    </p>
  )
}
