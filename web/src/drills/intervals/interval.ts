import type { Accidental, Pitch } from '@/core/music/types'
import { diatonicIndex, isExcluded, midi, pitchFromDiatonic } from '@/core/music/pitch'

/*
 * Intervals as theory names them: a size (2 to 8, counted on the letters, both
 * ends included) and a quality. Sizes 4, 5 and 8 are perfect (P) or one
 * semitone either side of it (A, d); sizes 2, 3, 6 and 7 are major (M) or
 * minor (m), with augmented one above major and diminished one below minor.
 * The size comes from the letters alone and the quality from the semitones,
 * so C–E♯ (5 semitones) is an augmented 3rd, never a 4th.
 */

export type Size = 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Quality = 'm' | 'M' | 'P' | 'A' | 'd'

export interface Interval {
  size: Size
  quality: Quality
}

export const SIZES: readonly Size[] = [2, 3, 4, 5, 6, 7, 8]

/** Semitones of the major (2, 3, 6, 7) or perfect (4, 5, 8) interval of each size. */
const BASE: Record<Size, number> = { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11, 8: 12 }

/** 4, 5 and 8 are perfect intervals; 2, 3, 6 and 7 are major or minor. */
export function isPerfectSize(size: Size): boolean {
  return size === 4 || size === 5 || size === 8
}

/** Whether a size can have this quality: no perfect 3rd, no major 5th. */
export function canExist({ size, quality }: Interval): boolean {
  if (quality === 'P') return isPerfectSize(size)
  if (quality === 'M' || quality === 'm') return !isPerfectSize(size)
  return true
}

/** Semitones from the lower note to the upper one. */
export function semitones({ size, quality }: Interval): number {
  const base = BASE[size]
  if (isPerfectSize(size)) return base + (quality === 'A' ? 1 : quality === 'd' ? -1 : 0)
  return base + ({ M: 0, m: -1, A: 1, d: -2, P: 0 } as const)[quality]
}

/**
 * The interval from `lower` up to `upper`, or null when it is not a 2nd to an
 * octave (a unison, a compound interval, upside down) or its quality is
 * beyond augmented or diminished.
 */
export function intervalBetween(lower: Pitch, upper: Pitch): Interval | null {
  const size = diatonicIndex(upper) - diatonicIndex(lower) + 1
  if (size < 2 || size > 8) return null
  const s = size as Size
  const span = midi(upper) - midi(lower)
  const qualities: Quality[] = isPerfectSize(s) ? ['P', 'A', 'd'] : ['M', 'm', 'A', 'd']
  const quality = qualities.find(q => semitones({ size: s, quality: q }) === span)
  return quality ? { size: s, quality } : null
}

const ACCIDENTAL: Record<number, Accidental> = { 0: '', 1: '#', [-1]: 'b' }

/**
 * The note `interval` above `lower`, spelled on the right letter. Null when
 * that spelling would need a double sharp or flat, or is one this drill never
 * prints (E♯, B♯, C♭, F♭).
 */
export function noteAbove(lower: Pitch, interval: Interval): Pitch | null {
  const natural = pitchFromDiatonic(diatonicIndex(lower) + interval.size - 1)
  const alter = midi(lower) + semitones(interval) - midi(natural)
  const accidental = ACCIDENTAL[alter]
  if (accidental === undefined || isExcluded(natural.letter, accidental)) return null
  return { ...natural, accidental }
}

/** "m6", "P5", "A4": a short, language-free id for an interval. */
export function intervalId({ size, quality }: Interval): string {
  return `${quality}${size}`
}

/** Reads an id written `intervalId`'s way ("A4", "d7"). */
export function parseIntervalId(id: string): Interval {
  const m = /^([mMPAd])([2-8])$/.exec(id)
  if (!m) throw new Error(`not an interval: "${id}"`)
  const interval = { quality: m[1] as Quality, size: Number(m[2]) as Size }
  if (!canExist(interval)) throw new Error(`no such interval: "${id}"`)
  return interval
}
