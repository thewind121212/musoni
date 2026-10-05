import { RHYTHM_COMPOUND_SHARE, RHYTHM_COMPOUND_TEMPO, RHYTHM_ODDS } from '@/config/constants'

/*
 * Tiết tấu's measures. A measure is built from figures that each fill one
 * beat, half a 4/4 bar or the whole bar, so the notation always shows the
 * beat, as the book asks ("use beaming to show where the beginning of each
 * beat occurs"): beams stay inside a beat, the middle of a 4/4 bar (beat 3)
 * is always visible except under a whole note or a dotted half from beat 1,
 * and a note sounding across beat 3 is written as two tied notes. In 6/8 the
 * beat is the dotted quarter and eighths beam in threes.
 *
 * Design: docs/fe/drill-rhythm.md.
 */

export type RhythmLevel = 1 | 2 | 3 | 4
export type Meter = '4/4' | '6/8'

/** Ticks per quarter note: twelve holds sixteenths (3), triplet eighths (4) and eighths (6). */
export const TICKS = 12

/** One written note or rest. Times in ticks from the downbeat. */
export interface RhythmEvent {
  rest: boolean
  /** Written value as in core/music/notation: `q`, `8`, `h.`, `16`. */
  value: string
  start: number
  length: number
  /** Tied to the next note, which is then held, not tapped. */
  tie: boolean
  /** One of an eighth-note triplet. */
  triplet: boolean
}

export interface RhythmMeasure {
  meter: Meter
  events: RhythmEvent[]
  /** Ticks from the downbeat where a tap belongs: every note except one a tie holds over. */
  onsets: number[]
  /** The measure's length in ticks. */
  length: number
  /** The measure in core/music/notation text, every note on the middle line. */
  notation: string
}

/** A figure: its items (`q`, `8`, `q.`, `Rq` a rest, `t8` a triplet eighth) and the level it comes in at. */
interface Figure {
  items: string
  level: RhythmLevel
}

/** 4/4, one beat. */
const BEAT: Figure[] = [
  { items: 'q', level: 1 },
  { items: 'Rq', level: 2 },
  { items: '8 8', level: 2 },
  { items: '16 16 16 16', level: 4 },
  { items: '8 16 16', level: 4 },
  { items: '16 16 8', level: 4 },
  { items: '8. 16', level: 4 },
  { items: 't8 t8 t8', level: 4 },
]
/** 4/4, half a bar (beats 1-2 or 3-4). */
const HALF: Figure[] = [
  { items: 'h', level: 1 },
  { items: 'Rh', level: 2 },
  { items: 'q. 8', level: 3 },
]
/** 4/4, the whole bar. */
const WHOLE: Figure[] = [
  { items: 'w', level: 1 },
  { items: 'h. q', level: 3 },
  { items: 'h. Rq', level: 3 },
]
/** 6/8 (L4), one dotted-quarter beat. */
const COMPOUND_BEAT: Figure[] = [
  { items: 'q.', level: 4 },
  { items: 'q 8', level: 4 },
  { items: '8 q', level: 4 },
  { items: '8 8 8', level: 4 },
  { items: 'Rq.', level: 4 },
]
/** 6/8, the whole bar. */
const COMPOUND_WHOLE: Figure[] = [{ items: 'h.', level: 4 }]

/** A tie across beat 3 comes in at L3. */
const TIE_LEVEL: RhythmLevel = 3
const BASE: Record<string, number> = { w: 48, h: 24, q: 12, '8': 6, '16': 3 }
const LENGTH: Record<Meter, number> = { '4/4': 4 * TICKS, '6/8': 3 * TICKS }
const MID = 2 * TICKS

/** Ticks of one item (`q.`, `t8`, `Rh`). */
function ticksOf(item: string): number {
  const triplet = item.startsWith('t')
  const body = item.replace(/^[Rt]/, '')
  const dotted = body.endsWith('.')
  const base = BASE[dotted ? body.slice(0, -1) : body]
  const length = dotted ? base * 1.5 : base
  return triplet ? (length * 2) / 3 : length
}

/** The 6/8 or 4/4 measure written by these figures, with a tie across beat 3 when asked. */
function build(meter: Meter, figures: readonly Figure[], tieMid: boolean): RhythmMeasure {
  const events: RhythmEvent[] = []
  let at = 0
  for (const item of figures.flatMap(f => f.items.split(' '))) {
    const length = ticksOf(item)
    events.push({
      rest: item.startsWith('R'),
      value: item.replace(/^[Rt]/, ''),
      start: at, length, tie: false,
      triplet: item.startsWith('t'),
    })
    at += length
  }
  if (tieMid) {
    const i = events.findIndex(e => e.start + e.length === MID)
    events[i] = { ...events[i], tie: true }
  }
  const onsets = events.filter((e, i) => !e.rest && !events[i - 1]?.tie).map(e => e.start)
  return { meter, events, onsets, length: LENGTH[meter], notation: notationOf(events) }
}

/** The events as notation: notes on B4 (the middle line), triplets bracketed in threes. */
function notationOf(events: readonly RhythmEvent[]): string {
  const tokens: string[] = []
  let inTriplet = 0
  for (const e of events) {
    if (e.triplet && inTriplet === 0) tokens.push('3(')
    tokens.push(e.rest ? `R:${e.value}` : `B4:${e.value}${e.tie ? '~' : ''}`)
    if (e.triplet && ++inTriplet === 3) {
      tokens.push(')')
      inTriplet = 0
    }
  }
  return tokens.join(' ')
}

/**
 * Whether the half-bars' join can carry a tie across beat 3: two notes (not
 * triplets) whose sum is not a value the bar may hold as one note. A half
 * tied to a half is a whole note, a half tied to a quarter a dotted half:
 * both are written as one note, never tied.
 */
function canTie(first: RhythmEvent | undefined, second: RhythmEvent | undefined): boolean {
  if (!first || !second || first.rest || second.rest || first.triplet || second.triplet) return false
  const joined = first.length + second.length
  return !(first.start === 0 && (joined === 4 * TICKS || joined === 3 * TICKS))
}

/** The level a measure needs: its newest figure, or a tie (L3), or 6/8 (L4). */
function levelOf(meter: Meter, figures: readonly Figure[], tieMid: boolean): RhythmLevel {
  let level = Math.max(...figures.map(f => f.level)) as RhythmLevel
  if (tieMid) level = Math.max(level, TIE_LEVEL) as RhythmLevel
  if (meter === '6/8') level = 4
  return level
}

/**
 * Whether a half-bar's two beats are written right: two quarter rests in one
 * half-bar are a half rest.
 */
function halfOk(beats: readonly Figure[]): boolean {
  return !(beats.length === 2 && beats.every(b => b.items === 'Rq'))
}

const upTo = (figures: readonly Figure[], level: RhythmLevel) => figures.filter(f => f.level <= level)

/** Every way to fill half a 4/4 bar at this level: one half-bar figure, or two beats. */
function halves(level: RhythmLevel): Figure[][] {
  const beats = upTo(BEAT, level)
  return [
    ...upTo(HALF, level).map(f => [f]),
    ...beats.flatMap(a => beats.map(b => [a, b])).filter(halfOk),
  ]
}

/**
 * A measure the level may ask: it has something to tap, and from L2 it uses
 * something new at that level (so each level trains what it adds).
 */
function allowed(m: RhythmMeasure, need: RhythmLevel, level: RhythmLevel): boolean {
  return m.onsets.length > 0 && (level === 1 || need === level)
}

/**
 * Every measure a level can ask, built the same way the generator builds
 * them. For tests: the generator is checked against this set, and the set
 * against the notation rules.
 */
export function allMeasures(level: RhythmLevel): RhythmMeasure[] {
  const out: RhythmMeasure[] = []
  const add = (meter: Meter, figures: Figure[], tie: boolean) => {
    const m = build(meter, figures, tie)
    if (allowed(m, levelOf(meter, figures, tie), level)) out.push(m)
  }
  for (const w of upTo(WHOLE, level)) add('4/4', [w], false)
  const hs = halves(level)
  for (const a of hs) {
    for (const b of hs) {
      add('4/4', [...a, ...b], false)
      if (level >= TIE_LEVEL) {
        const m = build('4/4', [...a, ...b], false)
        const j = m.events.findIndex(e => e.start === MID)
        if (canTie(m.events[j - 1], m.events[j])) add('4/4', [...a, ...b], true)
      }
    }
  }
  if (level === 4) {
    for (const w of COMPOUND_WHOLE) add('6/8', [w], false)
    for (const a of COMPOUND_BEAT) for (const b of COMPOUND_BEAT) add('6/8', [a, b], false)
  }
  return out
}

const pick = <T>(xs: readonly T[], rng: () => number): T => xs[Math.floor(rng() * xs.length)]

/** One random measure's figures, before the level check. */
function draw(level: RhythmLevel, rng: () => number): { meter: Meter; figures: Figure[]; tie: boolean } {
  if (level === 4 && rng() < RHYTHM_COMPOUND_SHARE) {
    const figures = rng() < RHYTHM_ODDS.whole
      ? [pick(COMPOUND_WHOLE, rng)]
      : [pick(COMPOUND_BEAT, rng), pick(COMPOUND_BEAT, rng)]
    return { meter: '6/8', figures, tie: false }
  }
  // A figure the level adds comes up at `fresh` odds, an older one otherwise,
  // so a measure mixes the new figure with familiar ones instead of piling up
  // the hardest (the level check then keeps only measures with a new one).
  const choose = (figures: readonly Figure[]) => {
    const fresh = figures.filter(f => f.level === level)
    const old = figures.filter(f => f.level < level)
    if (fresh.length === 0 || old.length === 0) return pick(fresh.length ? fresh : old, rng)
    return pick(rng() < RHYTHM_ODDS.fresh ? fresh : old, rng)
  }
  if (rng() < RHYTHM_ODDS.whole) return { meter: '4/4', figures: [choose(upTo(WHOLE, level))], tie: false }
  const half = (): Figure[] => {
    if (rng() < RHYTHM_ODDS.half) return [choose(upTo(HALF, level))]
    const beats = upTo(BEAT, level)
    for (;;) {
      const two = [choose(beats), choose(beats)]
      if (halfOk(two)) return two
    }
  }
  const figures = [...half(), ...half()]
  const tie = level >= TIE_LEVEL && rng() < RHYTHM_ODDS.tie
  return { meter: '4/4', figures, tie }
}

/**
 * A measure for this level, never the same as the one before (`previous`,
 * its notation). Draws figures at random and keeps the first draw the level
 * allows (`allMeasures` holds the same set).
 */
export function generateMeasure(level: RhythmLevel, previous: string | null = null, rng: () => number = Math.random): RhythmMeasure {
  for (;;) {
    const { meter, figures, tie } = draw(level, rng)
    const plain = build(meter, figures, false)
    const j = plain.events.findIndex(e => e.start === MID)
    const tied = tie && meter === '4/4' && figures.length > 1 && canTie(plain.events[j - 1], plain.events[j])
    const m = tied ? build(meter, figures, true) : plain
    if (!allowed(m, levelOf(meter, figures, tied), level) || m.notation === previous) continue
    return m
  }
}

/** The beat a measure is counted in, at a tempo given in quarter notes per minute. */
export interface Pulse {
  /** Beats in the bar: 4 in 4/4, 2 dotted quarters in 6/8. */
  beats: number
  /** Ticks per beat. */
  beatTicks: number
  /** Beats per minute, as the tempo mark shows it (♩ = 80, ♩. = 60). */
  bpm: number
  /** The beat is a dotted quarter (6/8). */
  dotted: boolean
  beatMs: number
  tickMs: number
}

export function pulseOf(meter: Meter, tempo: number): Pulse {
  const compound = meter === '6/8'
  const bpm = compound ? Math.round(tempo * RHYTHM_COMPOUND_TEMPO) : tempo
  const beatTicks = compound ? 1.5 * TICKS : TICKS
  const beatMs = 60_000 / bpm
  return { beats: LENGTH[meter] / beatTicks, beatTicks, bpm, dotted: compound, beatMs, tickMs: beatMs / beatTicks }
}
