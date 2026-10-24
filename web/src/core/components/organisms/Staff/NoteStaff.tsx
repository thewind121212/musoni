import { useRef, useState } from 'react'
import {
  Accidental, BarNote, Beam, Dot, Formatter, GhostNote, Renderer, Stave, StaveConnector, StaveNote, StaveTie,
  Tuplet, Voice, type Note, type StemmableNote,
} from 'vexflow/bravura'
import type { Clef, Pitch } from '@/core/music/types'
import type { NotePitch, StaffEvent } from '@/core/music/notation'
import { diatonicStep, TUPLET_OCCUPIES } from '@/core/music/notation'
import { inkColor, token, useRedrawOnThemeChange } from './theme'
import type { StaffTone } from './Staff'

/**
 * A single clef, a grand staff (treble over bass, braced), a bare staff with
 * no clef, or a percussion staff (rhythm: the neutral clef, notes on the
 * middle line written as B4).
 */
export type NoteStaffClef = Clef | 'grand' | 'none' | 'percussion'

/**
 * Where the drawing put things, as shares of its width: each note or rest
 * (bars skipped), and where the notes' space starts and ends (after the
 * clef and signatures, before the last bar line).
 */
export interface NoteStaffLayout {
  xs: number[]
  start: number
  end: number
}

export interface NoteStaffProps {
  clef: NoteStaffClef
  /** What to draw, from `core/music/notation`. */
  events: readonly StaffEvent[]
  /** Key signature as VexFlow writes it (`G`, `Bb`, `F#m`). Accidentals then follow the key. */
  keySignature?: string
  /** Time signature (`4/4`, `6/8`, `C`). */
  time?: string
  /** One label per note or rest (bars skipped), printed under the staff; null for none. `\n` stacks lines. */
  labels?: readonly (string | null)[]
  /** Notes or rests (bars skipped) drawn in the accent colour. */
  highlight?: readonly number[]
  /** `correct` turns every note green once a question about it is answered. */
  tone?: StaffTone
  /** A wrong pick, drawn in red beside a single note. */
  chosen?: Pitch | null
  /** Notation units across; the drawing scales to its container. */
  width?: number
  /**
   * Called after each drawing with where the notes landed, for marks laid
   * over the staff (Tiết tấu's timing dots). Pass a stable function.
   */
  onLayout?: (layout: NoteStaffLayout) => void
  /**
   * Pins the box to the staff lines plus this much room above and below
   * (notation units) instead of cropping it to the ink, so a question staff
   * keeps one size whatever its notes reach. Notes beyond it are cut off.
   */
  room?: number
}

/** The middle line of each clef, where a rest sits. */
const REST_KEY: Record<Clef, string> = { treble: 'b/4', bass: 'd/3', alto: 'c/4', tenor: 'a/3' }
const ACC: Record<number, string> = { 2: '##', 1: '#', 0: '', [-1]: 'b', [-2]: 'bb' }
/** Grand staff: the bass staff's top, below the treble staff's, in VexFlow units. */
const GRAND_GAP = 100
/** Room kept above and below the outer staff lines, and around the ink. */
const MARGIN = 14

function vexKey(p: NotePitch): string {
  return `${p.letter.toLowerCase()}${p.natural ? 'n' : ACC[p.alter]}/${p.octave}`
}

const MIDDLE_C = diatonicStep({ letter: 'C', octave: 4 })

/**
 * What each staff of a grand staff draws for an event, top then bottom: the
 * chord members it holds (`[]` for a rest), or null for nothing. A member goes
 * by its own mark, else the event's, else from middle C up on top; a rest on
 * top unless marked.
 */
function splitGrand(e: Exclude<StaffEvent, { kind: 'bar' }>): (NotePitch[] | null)[] {
  if (e.kind === 'rest') return e.staff === 'bottom' ? [null, []] : [[], null]
  const onTop = (p: NotePitch) => (p.staff ?? e.staff ?? (diatonicStep(p) >= MIDDLE_C ? 'top' : 'bottom')) === 'top'
  return [e.pitches.filter(onTop), e.pitches.filter(p => !onTop(p))].map(m => (m.length ? m : null))
}

interface Drawn {
  /** Each label's centre as a share of the drawing's width. */
  xs: number[]
}

/**
 * Notation for lessons: a row of notes, chords and rests on one staff, a grand
 * staff, or a bare staff, with an optional key and time signature, bar lines,
 * ties, tuplets and beams, a label under any note and any note picked out in
 * the accent colour. Part of the core Staff renderer, the only place VexFlow is
 * used. The drills' question staff (`Staff`) stays separate: it holds still
 * between questions, which a lesson figure does not need.
 *
 * The box is cropped to the staff lines plus whatever the notes reach above or
 * below them, so a figure with no ledger lines carries no empty band.
 */
export function NoteStaff({
  clef, events, keySignature, time, labels, highlight = [], tone = 'neutral', chosen = null, width = 320, onLayout, room,
}: NoteStaffProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState<Drawn>({ xs: [] })

  useRedrawOnThemeChange(() => {
    const el = ref.current
    if (!el) return
    el.innerHTML = ''
    const ink = inkColor(el)
    const accent = token(el, '--accent', ink)
    const correct = token(el, '--correct', ink)
    const wrong = token(el, '--wrong', ink)

    const renderer = new Renderer(el, Renderer.Backends.SVG)
    const grand = clef === 'grand'
    const height = grand ? 340 : 220
    renderer.resize(width, height)
    const ctx = renderer.getContext()
    ctx.setFillStyle(ink)
    ctx.setStrokeStyle(ink)

    const x = grand ? 22 : 8
    const make = (y: number, c: Clef | 'percussion' | null) => {
      const stave = new Stave(x, y, width - x - 8)
      if (c) stave.addClef(c)
      if (keySignature) stave.addKeySignature(keySignature)
      if (time) stave.addTimeSignature(time)
      stave.setStyle({ fillStyle: ink, strokeStyle: ink })
      return stave
    }
    const staves = grand ? [make(0, 'treble'), make(GRAND_GAP, 'bass')] : [make(0, clef === 'none' ? null : clef)]
    // A bare or percussion staff places notes as a treble staff does.
    const clefs: Clef[] = grand ? ['treble', 'bass'] : [clef === 'none' || clef === 'percussion' ? 'treble' : clef]
    if (grand) {
      const start = Math.max(...staves.map(s => s.getNoteStartX()))
      staves.forEach(s => s.setNoteStartX(start))
    }
    staves.forEach(s => s.setContext(ctx).draw())
    if (grand) {
      for (const type of ['brace', 'singleLeft', 'singleRight'] as const) {
        new StaveConnector(staves[0], staves[1]).setType(type).setContext(ctx).draw()
      }
    }

    // One tickable list per staff. On a grand staff each chord member goes on
    // its own staff, and a staff with nothing at that time gets an invisible
    // note of the same length, so both stay in step and their bars line up.
    const lists: Note[][] = staves.map(() => [])
    /** Per note or rest (bars skipped): what was drawn for it, top staff first. */
    const sounding: StaveNote[][] = []
    const ties: StaveTie[] = []
    const tuplets = new Map<string, { notes: StaveNote[]; count: number }>()
    let tieFrom: (StaveNote | null)[] = []
    let index = 0
    for (const e of events) {
      if (e.kind === 'bar') {
        lists.forEach(l => l.push(new BarNote(e.double ? 2 : 1)))
        continue
      }
      const rest = e.kind === 'rest'
      const parts = grand ? splitGrand(e) : [rest ? [] : e.pitches]
      const colour = tone === 'correct' ? correct : highlight.includes(index) ? accent : ink
      const drawnHere: StaveNote[] = []
      tieFrom = parts.map((members, staff) => {
        if (!members) {
          const ghost = new GhostNote({ duration: e.duration, dots: e.dots })
          // A spacer beside a tuplet note is shortened as the tuplet shortens its notes.
          if (e.tuplet) ghost.applyTickMultiplier(TUPLET_OCCUPIES[e.tuplet.count], e.tuplet.count)
          lists[staff].push(ghost)
          return null
        }
        const c = clefs[staff]
        const note = new StaveNote({
          keys: rest ? [REST_KEY[c]] : members.map(vexKey),
          duration: e.duration + (rest ? 'r' : ''),
          dots: e.dots,
          clef: c,
          autoStem: true,
        })
        if (!rest && !keySignature) {
          members.forEach((p, i) => {
            const acc = p.natural ? 'n' : ACC[p.alter]
            if (acc) note.addModifier(new Accidental(acc), i)
          })
        }
        if (e.dots) Dot.buildAndAttach([note], { all: true })
        note.setStyle({ fillStyle: colour, strokeStyle: colour })
        note.setLedgerLineStyle({ fillStyle: ink, strokeStyle: ink })
        lists[staff].push(note)
        const from = tieFrom[staff]
        if (from) ties.push(new StaveTie({ firstNote: from, lastNote: note }))
        if (e.tuplet) {
          const key = `${e.tuplet.group}:${staff}`
          tuplets.set(key, { notes: [...(tuplets.get(key)?.notes ?? []), note], count: e.tuplet.count })
        }
        drawnHere.push(note)
        return e.kind === 'note' && e.tie ? note : null
      })
      sounding.push(drawnHere)
      index++
    }

    // On a miss the reader's choice is drawn beside the answer, in red.
    const single = sounding.length === 1 && !grand
    if (chosen && single) {
      const pick = new StaveNote({
        keys: [`${chosen.letter.toLowerCase()}${chosen.accidental}/${chosen.octave}`],
        duration: sounding[0][0].getDuration(),
        clef: clefs[0],
        autoStem: true,
      })
      if (chosen.accidental) pick.addModifier(new Accidental(chosen.accidental))
      pick.setStyle({ fillStyle: wrong, strokeStyle: wrong })
      lists[0].push(pick)
    }

    // Tuplets first: they shorten their notes, which the voice, the beams and
    // the spacing must all see (a triplet of eighths fills one beat).
    const tupletMarks = [...tuplets.values()].map(({ notes, count }) => (
      new Tuplet(notes, { numNotes: count, notesOccupied: TUPLET_OCCUPIES[count] })
    ))
    // Each note knows its staff before formatting, so a chord split across a
    // grand staff is not pushed aside as if its halves were two voices on one staff.
    lists.forEach((l, i) => l.forEach(n => n.setStave(staves[i])))
    const voices = lists.map(l => new Voice({ numBeats: 4, beatValue: 4 }).setMode(Voice.Mode.SOFT).addTickables(l))
    if (keySignature) Accidental.applyAccidentals(voices, keySignature)
    // Beams follow the meter's beat (6/8 beams eighths in threes); quarter beats without one.
    const groups = time ? Beam.getDefaultBeamGroups(time) : undefined
    const beams = lists.flatMap(l => {
      const stemmed = l.filter((n): n is StemmableNote => n instanceof StaveNote)
      return stemmed.length ? Beam.generateBeams(stemmed, { maintainStemDirections: false, groups }) : []
    })
    // A staff with nothing on it (a key signature alone) has nothing to format.
    if (lists[0].length > 0) {
      new Formatter().joinVoices(voices).formatToStave(voices, staves[0])
      voices.forEach((v, i) => v.draw(ctx, staves[i]))
    }
    for (const item of [...beams, ...ties, ...tupletMarks]) item.setContext(ctx).draw()

    // Crop: the staff lines plus whatever the notes reach, or plus `room` when pinned.
    const pad = room ?? MARGIN
    const ys: number[] = [staves[0].getYForLine(0) - pad, staves[staves.length - 1].getYForLine(4) + pad]
    const inked = room === undefined ? sounding.flat() : []
    for (const note of inked) {
      try {
        const box = note.getBoundingBox()
        ys.push(box.getY() - MARGIN / 2, box.getY() + box.getH() + MARGIN / 2)
      } catch { /* no metrics: keep the staff's own box */ }
    }
    // A tuplet's number sits past the beam, outside its notes' boxes.
    for (const mark of tupletMarks) {
      try {
        const y = mark.getYPosition()
        ys.push(y - MARGIN, y + MARGIN)
      } catch { /* no metrics */ }
    }
    const top = Math.min(...ys)
    const bottom = Math.max(...ys)
    const svg = el.querySelector('svg')
    if (svg) {
      svg.setAttribute('viewBox', `0 ${top} ${width} ${bottom - top}`)
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
      svg.removeAttribute('width')
      svg.removeAttribute('height')
      svg.setAttribute('aria-hidden', 'true')
      svg.style.width = '100%'
      svg.style.height = 'auto'
      svg.style.display = 'block'
    }
    const xs = sounding.map(([note]) => {
      let centre = note.getAbsoluteX()
      try { centre += note.getGlyphWidth() / 2 } catch { /* jsdom: the left edge will do */ }
      return centre / width
    })
    setDrawn(d => (d.xs.join() === xs.join() ? d : { xs }))
    onLayout?.({ xs, start: staves[0].getNoteStartX() / width, end: staves[0].getNoteEndX() / width })
  }, [clef, events, keySignature, time, labels, highlight.join(), tone, chosen?.letter, chosen?.accidental,
      chosen?.octave, width, room])

  const shown = labels?.some(l => l) ? labels : null
  // Stacked labels (figured bass): one line each, centred, set close together.
  const lines = Math.max(1, ...(shown ?? []).map(l => (l ? l.split('\n').length : 1)))
  return (
    <div className="w-full">
      <div ref={ref} data-testid="note-staff" />
      {shown && (
        <div
          className="relative h-7" aria-hidden="true"
          style={lines > 1 ? { height: `calc(1.75rem + ${lines - 1} * 1.1rem)` } : undefined}
        >
          {shown.map((text, i) => text && drawn.xs[i] !== undefined && (
            <span
              key={i}
              data-label={i}
              className={'absolute top-0 -translate-x-1/2 text-center text-[15px] font-semibold whitespace-pre md:text-base '
                + (lines > 1 ? 'leading-[1.1] ' : '')
                + (tone === 'correct' ? 'text-correct' : highlight.includes(i) ? 'text-accent' : 'text-ink-soft')}
              style={{ left: `${drawn.xs[i] * 100}%` }}
            >
              {text}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
