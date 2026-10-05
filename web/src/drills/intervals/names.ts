import type { Translate } from '@/core/i18n/translate'
import type { Naming, Pitch } from '@/core/music/types'
import { label } from '@/core/music/pitch'
import { cellQuality, type Cell, type Row } from './grid'
import type { Quality, Size } from './interval'
import { S } from './strings'

/*
 * How the drill says an interval, in the reader's language: a grid cell's
 * short label ("6t" / "m6"), its full name ("quãng 6 thứ" / "minor 6th") and
 * the verdict after an answer ("Quãng 6 thứ (Mi → Do)").
 */

const CELL = { m: S['cell.m'], M: S['cell.M'], P: S['cell.P'], A: S['cell.A'], d: S['cell.d'] } as const
const NAME = { m: S['name.m'], M: S['name.M'], P: S['name.P'], A: S['name.A'], d: S['name.d'] } as const
const SIZE = {
  2: S['size.2'], 3: S['size.3'], 4: S['size.4'], 5: S['size.5'], 6: S['size.6'], 7: S['size.7'], 8: S['size.8'],
} as const
const ROW = { m: S['row.m'], MP: S['row.MP'], A: S['row.A'], d: S['row.d'] } as const

/** "6t" / "m6"; a size-only cell is just the size. */
export function cellLabel(cell: Cell, t: Translate): string {
  const quality = cellQuality(cell)
  return t(quality ? CELL[quality] : S['cell.size'], { n: cell.size })
}

/** "quãng 6 thứ" / "minor 6th"; without a quality, "quãng 6" / "6th". Lower case, for the middle of a sentence. */
export function intervalName(size: Size, quality: Quality | null, t: Translate): string {
  return t(quality ? NAME[quality] : S['name.size'], { size: t(SIZE[size]) })
}

export function cellName(cell: Cell, t: Translate): string {
  return intervalName(cell.size, cellQuality(cell), t)
}

/** The grid row's heading ("Thứ", "Trưởng / Đúng"); the size-only row has none. */
export function rowName(row: Row, t: Translate): string {
  return row === 'size' ? '' : t(ROW[row])
}

export function capitalize(text: string): string {
  return text.charAt(0).toLocaleUpperCase() + text.slice(1)
}

/**
 * The line after an answer. Right: "Quãng 6 thứ (Mi → Do)". Wrong: the same,
 * then what was picked. The interval is always named in full, even at level 1
 * where only its size is asked: the quality is the next thing to learn.
 */
export function verdict(
  q: { lower: Pitch; upper: Pitch; interval: { size: Size; quality: Quality } },
  feedback: { chosen: Cell; correct: boolean },
  naming: Naming,
  t: Translate,
): string {
  const params = {
    name: capitalize(intervalName(q.interval.size, q.interval.quality, t)),
    from: label(q.lower.letter, q.lower.accidental, naming),
    to: label(q.upper.letter, q.upper.accidental, naming),
  }
  return feedback.correct ? t(S.right, params) : t(S.missed, { ...params, pick: cellName(feedback.chosen, t) })
}
