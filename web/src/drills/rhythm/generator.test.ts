import { describe, it, expect } from 'vitest'
import { allMeasures, generateMeasure, playableTempo, pulseOf, TICKS, type RhythmLevel, type RhythmMeasure } from './generator'
import { parseNotation, quarters } from '@/core/music/notation'

const LEVELS: RhythmLevel[] = [1, 2, 3, 4]
const MID = 2 * TICKS

/** A seeded generator, so a failure can be replayed. */
function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 2 ** 32
  }
}

/**
 * Every notation rule a measure must keep, checked from its events and its
 * notation text, independently of how the generator builds it. Returns the
 * first broken rule, or null.
 */
function broken(m: RhythmMeasure, level: RhythmLevel): string | null {
  const beat = m.meter === '6/8' ? 1.5 * TICKS : TICKS
  const total = m.meter === '6/8' ? 3 * TICKS : 4 * TICKS
  if (m.length !== total) return 'length'

  // The text parses and adds up to a full bar, event for event.
  const parsed = parseNotation(m.notation).filter(e => e.kind !== 'bar')
  if (parsed.length !== m.events.length) return 'notation events'
  if (Math.abs(parsed.reduce((sum, e) => sum + quarters(e), 0) - total / TICKS) > 1e-9) return 'notation sum'
  for (const [i, e] of parsed.entries()) {
    if (Math.abs(quarters(e) * TICKS - m.events[i].length) > 1e-9) return `notation length ${i}`
    if ((e.kind === 'rest') !== m.events[i].rest) return `notation rest ${i}`
    if (e.kind === 'note' && e.tie !== m.events[i].tie) return `notation tie ${i}`
    if (e.kind === 'note' && (e.pitches.length !== 1 || e.pitches[0].letter !== 'B' || e.pitches[0].octave !== 4)) return 'not on the middle line'
  }

  // Events are contiguous and fill the bar.
  let at = 0
  for (const e of m.events) {
    if (e.start !== at) return 'gap'
    at += e.length
  }
  if (at !== total) return 'sum'

  // Onsets: every note not held over by a tie, in order, at least one.
  const expected = m.events.filter((e, i) => !e.rest && !m.events[i - 1]?.tie).map(e => e.start)
  if (JSON.stringify(expected) !== JSON.stringify(m.onsets)) return 'onsets'
  if (m.onsets.length === 0) return 'nothing to tap'

  for (const [i, e] of m.events.entries()) {
    const end = e.start + e.length
    const crossesBeat = Math.floor(e.start / beat) !== Math.floor((end - 1) / beat)
    // Beams show the beat: an eighth or shorter never spans a beat.
    if (e.length < TICKS && crossesBeat) return `short value across a beat at ${e.start}`
    // A value longer than a beat starts on a beat.
    if (e.length > beat && e.start % beat !== 0) return `long value off the beat at ${e.start}`
    // 4/4: beat 3 stays visible, except under a whole note or a dotted half from beat 1.
    if (m.meter === '4/4' && e.start < MID && end > MID && !(e.start === 0 && (e.length === 48 || e.length === 36))) {
      return `hides beat 3 at ${e.start}`
    }
    if (e.rest && crossesBeat && (e.start % beat !== 0 || end % beat !== 0)) return 'rest across a beat'
    // A tie joins two notes across beat 3, and never makes what one note would write.
    if (e.tie) {
      const next = m.events[i + 1]
      if (!next || next.rest || e.rest) return 'tie to a rest'
      if (end !== MID || m.meter !== '4/4') return 'tie not across beat 3'
      const joined = e.length + next.length
      if (e.start === 0 && (joined === 48 || joined === 36)) return 'tie that should be one note'
    }
    // Triplets come in whole beats of three.
    if (e.triplet && (e.length !== 4 || m.meter !== '4/4')) return 'triplet'
  }
  for (let b = 0; b < m.events.length; b++) {
    const e = m.events[b]
    if (e.triplet && e.start % TICKS === 0) {
      const three = m.events.slice(b, b + 3)
      if (three.length < 3 || !three.every(x => x.triplet)) return 'broken triplet'
    }
  }
  // Two quarter rests filling half a 4/4 bar are a half rest.
  if (m.meter === '4/4') {
    for (const half of [0, MID]) {
      const inHalf = m.events.filter(e => e.start >= half && e.start < half + MID)
      if (inHalf.length === 2 && inHalf.every(e => e.rest && e.length === TICKS)) return 'two quarter rests for a half rest'
    }
  }

  // What each level may use, and that it uses something new from L2 on.
  const has = {
    eighth: m.events.some(e => e.length === 6 && !e.triplet),
    rest: m.events.some(e => e.rest),
    dot: m.events.some(e => e.value.endsWith('.')),
    tie: m.events.some(e => e.tie),
    sixteenth: m.events.some(e => e.value === '16' || e.value === '8.'),
    triplet: m.events.some(e => e.triplet),
    compound: m.meter === '6/8',
  }
  const allowed: Record<RhythmLevel, (keyof typeof has)[]> = {
    1: [],
    2: ['eighth', 'rest'],
    3: ['eighth', 'rest', 'dot', 'tie'],
    4: ['eighth', 'rest', 'dot', 'tie', 'sixteenth', 'triplet', 'compound'],
  }
  for (const k of Object.keys(has) as (keyof typeof has)[]) {
    if (has[k] && !allowed[level].includes(k)) return `${k} at level ${level}`
  }
  const fresh: Record<RhythmLevel, (keyof typeof has)[]> = {
    1: [], 2: ['eighth', 'rest'], 3: ['dot', 'tie'], 4: ['sixteenth', 'triplet', 'compound'],
  }
  if (level > 1 && !fresh[level].some(k => has[k])) return `nothing new at level ${level}`
  if (level === 1 && m.events.some(e => !['w', 'h', 'q'].includes(e.value))) return 'level 1 value'
  return null
}

describe('rhythm generator', () => {
  it.each(LEVELS)('builds only well-written measures at level %i, every one of them', level => {
    const all = allMeasures(level)
    expect(all.length).toBeGreaterThan(level === 1 ? 4 : 20)
    for (const m of all) expect(broken(m, level), m.notation).toBeNull()
    // No two ways to write the same measure.
    expect(new Set(all.map(m => m.notation)).size).toBe(all.length)
  })

  it.each(LEVELS)('draws from that set at level %i, never the same measure twice in a row', level => {
    const set = new Set(allMeasures(level).map(m => m.notation))
    const rng = seeded(level * 7919)
    let previous: string | null = null
    for (let i = 0; i < 3000; i++) {
      const m = generateMeasure(level, previous, rng)
      expect(set.has(m.notation), m.notation).toBe(true)
      expect(m.notation).not.toBe(previous)
      previous = m.notation
    }
  })

  it('reaches every level 1 measure, and every kind of figure at level 4', () => {
    const rng = seeded(42)
    const seen = new Set(Array.from({ length: 400 }, () => generateMeasure(1, null, rng).notation))
    expect(seen.size).toBe(allMeasures(1).length)

    const l4 = Array.from({ length: 1500 }, () => generateMeasure(4, null, rng))
    expect(l4.some(m => m.meter === '6/8')).toBe(true)
    expect(l4.some(m => m.events.some(e => e.triplet))).toBe(true)
    expect(l4.some(m => m.events.some(e => e.value === '16'))).toBe(true)
    expect(l4.some(m => m.events.some(e => e.tie))).toBe(true)
  })

  it('writes ties across beat 3 at level 3, holding the tied note over', () => {
    const tied = allMeasures(3).filter(m => m.events.some(e => e.tie))
    expect(tied.length).toBeGreaterThan(0)
    for (const m of tied) {
      const i = m.events.findIndex(e => e.tie)
      expect(m.onsets).not.toContain(m.events[i + 1].start)
      expect(m.notation).toContain('~')
    }
    // q q~ q q: beat 2 held through beat 3.
    const syncope = tied.find(m => m.notation === 'B4:q B4:q~ B4:q B4:q')
    expect(syncope?.onsets).toEqual([0, 12, 36])
  })

  it('brackets triplets in threes and times them a third of a beat apart', () => {
    const m = allMeasures(4).find(x => x.notation.startsWith('3( B4:8 B4:8 B4:8 )'))!
    expect(m.onsets.slice(0, 3)).toEqual([0, 4, 8])
  })

  it('counts 4/4 in quarter beats and 6/8 in dotted quarters at three quarters of the tempo', () => {
    expect(pulseOf('4/4', 80)).toMatchObject({ beats: 4, bpm: 80, dotted: false, beatMs: 750 })
    const compound = pulseOf('6/8', 80)
    expect(compound).toMatchObject({ beats: 2, bpm: 60, dotted: true, beatMs: 1000 })
    // An eighth: a third of the dotted-quarter beat.
    expect(compound.tickMs * 6).toBeCloseTo(1000 / 3)
  })

  it("plays a lesson's odd tempo at the setup tempo nearest to it, never at zero or infinity", () => {
    expect(playableTempo(100)).toBe(100)
    expect(playableTempo(90)).toBe(80)
    expect(playableTempo(0)).toBe(60)
    expect(playableTempo(400)).toBe(120)
    expect(playableTempo(Number.NaN)).toBe(60)
    expect(pulseOf('4/4', 0).beatMs).toBe(1000)
  })
})
