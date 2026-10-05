import { CheckIcon, XIcon } from '@phosphor-icons/react'
import { KeyHint } from '@/core/components/atoms'
import type { Translate } from '@/core/i18n/translate'
import { cellExists, keyHint, sameCell, type Cell, type Row } from '@/drills/intervals/grid'
import { SIZES } from '@/drills/intervals/interval'
import { capitalize, cellLabel, cellName, rowName } from '@/drills/intervals/names'

interface Props {
  /** The rows this level answers on; the others are not drawn. */
  rows: readonly Row[]
  /** After an answer: the cell picked and the cell that was right (the same one when right). */
  feedback: { chosen: Cell; answer: Cell } | null
  onAnswer: (cell: Cell) => void
  /** Names the grid for screen readers ("What interval?"). */
  label: string
  t: Translate
}

type Mark = 'none' | 'correct' | 'wrong'

function tone(mark: Mark) {
  if (mark === 'correct') return 'border-transparent bg-correct text-white'
  if (mark === 'wrong') return 'border-transparent bg-wrong text-white'
  return 'border-line bg-raised text-ink hover:border-ink-faint'
}

// Row and size heads: a column of labels, then the seven sizes. Level 1's
// single row needs neither.
const CELL_HEIGHT = 'h-12 md:h-14 [@media(max-height:900px)]:md:h-12 [@media(max-height:700px)]:h-10'

/**
 * The answer: one tap on a size × quality grid, sizes 2 to 8 across and the
 * level's qualities down (minor, major or perfect, augmented, diminished). A
 * minor 4th, 5th or octave does not exist, so those cells are left blank and
 * cannot be pressed. At level 1 one row of sizes answers the size alone.
 *
 * Cells hold their place on every question, like the piano pad: a grid to
 * learn, not a list to re-read. On desktop each shows its computer key.
 */
export function IntervalGrid({ rows, feedback, onAnswer, label, t }: Props) {
  const single = rows.length === 1 && rows[0] === 'size'
  const markOf = (cell: Cell): Mark =>
    !feedback ? 'none'
      : sameCell(cell, feedback.answer) ? 'correct'
        : sameCell(cell, feedback.chosen) ? 'wrong' : 'none'

  const cell = (row: Row, size: (typeof SIZES)[number]) => {
    const c: Cell = { row, size }
    if (!cellExists(c)) {
      return <div key={size} aria-hidden data-blank className={`${CELL_HEIGHT} rounded-xl border border-dashed border-line`} />
    }
    const mark = markOf(c)
    return (
      <button
        key={size}
        type="button"
        disabled={!!feedback}
        onClick={() => onAnswer(c)}
        aria-label={capitalize(cellName(c, t))}
        className={
          `${CELL_HEIGHT} relative flex min-w-0 flex-col items-center justify-center rounded-xl border leading-tight ` +
          'text-[15px] font-semibold tnum md:text-lg ' +
          'transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.95] ' +
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
          'disabled:cursor-default ' + tone(mark)
        }
      >
        <span aria-hidden>{cellLabel(c, t)}</span>
        {/* Under the label, not in a corner: a phone's cells are too narrow for both side by side. */}
        {mark === 'correct' && <CheckIcon size={11} weight="bold" aria-hidden />}
        {mark === 'wrong' && <XIcon size={11} weight="bold" aria-hidden />}
        {!feedback && <KeyHint hint={keyHint(c)} corner />}
      </button>
    )
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={
        'grid select-none items-center gap-1 md:gap-2 ' +
        (single ? 'grid-cols-7' : 'grid-cols-[auto_repeat(7,minmax(0,1fr))]')
      }
    >
      {!single && (
        <>
          <span aria-hidden />
          {SIZES.map(size => (
            <span key={size} aria-hidden className="text-center text-xs font-semibold text-ink-faint tnum md:text-sm">
              {size}
            </span>
          ))}
        </>
      )}
      {rows.map(row => (
        <div key={row} className="contents">
          {!single && (
            <span className="max-w-[4rem] pr-1 text-[11px] leading-tight font-semibold text-ink-soft md:max-w-none md:text-sm">
              {rowName(row, t)}
            </span>
          )}
          {SIZES.map(size => cell(row, size))}
        </div>
      ))}
    </div>
  )
}
