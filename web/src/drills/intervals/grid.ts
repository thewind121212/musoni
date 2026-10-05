import type { KeyPress } from '@/core/music/keyboard'
import { SIZES, isPerfectSize, type Interval, type Quality, type Size } from './interval'

/*
 * The answer grid: sizes 2 to 8 across, qualities down. One row holds both
 * major and perfect (`MP`), as no size has both; the minor row has no 4th,
 * 5th or octave. At level 1 a single `size` row answers the size alone.
 */

export type Row = 'size' | 'm' | 'MP' | 'A' | 'd'

/** One answer: a row of the grid and a size. */
export interface Cell {
  row: Row
  size: Size
}

/** Whether a grid cell names a real interval. A minor 4th, 5th or octave does not. */
export function cellExists({ row, size }: Cell): boolean {
  return !(row === 'm' && isPerfectSize(size))
}

/** The quality a cell names: perfect or major on the `MP` row, none for a size-only answer. */
export function cellQuality({ row, size }: Cell): Quality | null {
  if (row === 'size') return null
  if (row === 'MP') return isPerfectSize(size) ? 'P' : 'M'
  return row
}

/** The interval a cell names, or null for a size-only answer. */
export function cellInterval(cell: Cell): Interval | null {
  const quality = cellQuality(cell)
  return quality ? { size: cell.size, quality } : null
}

/** A size-only cell takes any quality of its size; any other must name the interval exactly. */
export function isRight(cell: Cell, interval: Interval): boolean {
  if (cell.size !== interval.size) return false
  return cell.row === 'size' || cellQuality(cell) === interval.quality
}

/** The row an interval is answered on, among a level's rows. */
export function rowOf({ quality }: Interval, rows: readonly Row[]): Row {
  if (rows.includes('size')) return 'size'
  return quality === 'M' || quality === 'P' ? 'MP' : quality
}

export function sameCell(a: Cell, b: Cell): boolean {
  return a.row === b.row && a.size === b.size
}

/**
 * Computer keys, desktop only: each grid row sits on a keyboard row, and each
 * size on the key under its digit (2 W S X, 3 E D C ... 8 I K ,), so the
 * grid's shape is the keyboard's. Fixed for every level: the minor row (or
 * level 1's size row) is always the digits.
 */
const KEY_ROWS: Record<Row, readonly string[]> = {
  size: ['2', '3', '4', '5', '6', '7', '8'],
  m: ['2', '3', '4', '5', '6', '7', '8'],
  MP: ['w', 'e', 'r', 't', 'y', 'u', 'i'],
  A: ['s', 'd', 'f', 'g', 'h', 'j', 'k'],
  d: ['x', 'c', 'v', 'b', 'n', 'm', ','],
}

/** The computer key that answers with this cell. */
export function keyHint({ row, size }: Cell): string {
  return KEY_ROWS[row][SIZES.indexOf(size)]
}

/** The physical key's character: `KeyW` → w, `Digit5` → 5, `Comma` → ','. Null for any other code. */
function physical(code: string | undefined): string | null {
  if (!code) return null
  const letter = /^Key([A-Z])$/.exec(code)
  if (letter) return letter[1].toLowerCase()
  const digit = /^Digit(\d)$/.exec(code)
  if (digit) return digit[1]
  return code === 'Comma' ? ',' : null
}

/**
 * The cell a key press answers with, among the level's rows, or null. The
 * physical key wins over the character it types (Shift, Caps Lock, a
 * Vietnamese input mode), and shortcut chords are left to the browser.
 */
export function cellFromKey(press: KeyPress, rows: readonly Row[]): Cell | null {
  if (press.ctrlKey || press.metaKey || press.altKey) return null
  const pressed = physical(press.code) ?? press.key.toLowerCase()
  for (const row of rows) {
    const at = KEY_ROWS[row].indexOf(pressed)
    if (at === -1) continue
    const cell = { row, size: SIZES[at] }
    return cellExists(cell) ? cell : null
  }
  return null
}
