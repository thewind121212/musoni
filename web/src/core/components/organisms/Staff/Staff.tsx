import { useRef } from 'react'
import { Renderer, Stave, StaveNote, Accidental, Formatter, Voice } from 'vexflow/bravura'
import type { Pitch, Clef } from '@/core/music/types'
import { inkColor, token, useRedrawOnThemeChange } from './theme'

/**
 * Crops the rendered SVG to what was actually drawn. Used for static glyphs.
 *
 * VexFlow reserves blank space above a stave, so the ink lands far from the
 * origin: staff lines land at y=40..80 inside the render box. Sizing a viewBox
 * from the nominal box therefore cut the notation off, which is why the clef
 * badges came out blank. `getBBox` needs a live layout engine, so tests fall
 * back to the nominal box.
 */
function cropToContent(svg: SVGSVGElement, fallbackWidth: number, fallbackHeight: number) {
  let box = { x: 0, y: 0, width: fallbackWidth, height: fallbackHeight }
  try {
    const measured = svg.getBBox()
    if (measured.width > 0 && measured.height > 0) box = measured
  } catch { /* no layout engine (jsdom): keep the nominal box */ }
  const pad = 2
  svg.setAttribute(
    'viewBox',
    `${box.x - pad} ${box.y - pad} ${box.width + pad * 2} ${box.height + pad * 2}`,
  )
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  svg.removeAttribute('width')
  svg.removeAttribute('height')
  svg.setAttribute('aria-hidden', 'true')
}

/**
 * Vertical room reserved above and below the staff lines, in VexFlow units, for
 * ledger lines and stems. Exported so the geometry test measures the same value
 * the component draws with.
 */
export const LEDGER_ROOM = 70

export type StaffTone = 'neutral' | 'correct' | 'wrong'

interface StaffProps {
  clef: Clef
  pitch: Pitch
  width?: number
  height?: number
  /** Colours the printed note once it has been answered. */
  tone?: StaffTone
  /** The reader's wrong choice, drawn beside the answer so the gap is visible. */
  chosen?: Pitch | null
}

/** A stave with its clef, at the geometry every layer of one Staff shares. */
function makeStave(clef: Clef, width: number) {
  const stave = new Stave(8, 0, width - 16)
  stave.addClef(clef)
  return stave
}

/**
 * Pinned to the stave, not cropped to the ink: a tight crop would resize the
 * box for every note, so the staff would jump around between questions.
 * LEDGER_ROOM covers ledger lines and stems in both directions. Both layers use
 * the same box, so the note layer lands exactly on the lines beneath it.
 */
function fitToStave(el: HTMLElement, stave: Stave, width: number) {
  const svg = el.querySelector('svg')
  if (!svg) return
  const top = stave.getYForLine(0) - LEDGER_ROOM
  const bottom = stave.getYForLine(4) + LEDGER_ROOM
  svg.setAttribute('viewBox', `0 ${top} ${width} ${bottom - top}`)
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
  svg.removeAttribute('width')
  svg.removeAttribute('height')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.width = '100%'
  svg.style.height = 'auto'
  svg.style.display = 'block'
}

/**
 * The only component in the app allowed to touch VexFlow.
 * Renders one note on one stave, scaled to its container.
 *
 * Two layers: the stave and clef underneath, drawn once per clef, and the
 * notes on top. A new question only replaces the note layer, so the lines and
 * clef hold still while the next note fades in; redrawing the whole staff for
 * every answer made it flash.
 */
export function Staff({
  clef, pitch, width = 320, height = 260, tone = 'neutral', chosen = null,
}: StaffProps) {
  const staveRef = useRef<HTMLDivElement>(null)
  const notesRef = useRef<HTMLDivElement>(null)

  useRedrawOnThemeChange(() => {
    const el = staveRef.current
    if (!el) return
    el.innerHTML = ''
    const ink = inkColor(el)
    const renderer = new Renderer(el, Renderer.Backends.SVG)
    renderer.resize(width, height)
    const ctx = renderer.getContext()
    ctx.setFillStyle(ink)
    ctx.setStrokeStyle(ink)
    const stave = makeStave(clef, width)
    stave.setStyle({ fillStyle: ink, strokeStyle: ink })
    stave.setContext(ctx).draw()
    fitToStave(el, stave, width)
  }, [clef, width, height])

  useRedrawOnThemeChange(() => {
    const el = notesRef.current
    if (!el) return
    el.innerHTML = ''
    const ink = inkColor(el)
    // The printed note is always the right answer, so a miss colours it as correct.
    const answerInk = tone === 'neutral' ? ink : token(el, '--correct', ink)
    const wrongInk = token(el, '--wrong', ink)

    const renderer = new Renderer(el, Renderer.Backends.SVG)
    renderer.resize(width, height)
    const ctx = renderer.getContext()
    // Positions only: the stave itself is drawn by the layer underneath.
    const stave = makeStave(clef, width)
    stave.setContext(ctx)

    const build = (p: Pitch, colour: string) => {
      const note = new StaveNote({
        keys: [`${p.letter.toLowerCase()}${p.accidental}/${p.octave}`],
        duration: 'q',
        clef,
      })
      if (p.accidental) note.addModifier(new Accidental(p.accidental))
      note.setStyle({ fillStyle: colour, strokeStyle: colour })
      return note
    }

    // On a miss the reader's choice is drawn next to the answer, so the mistake
    // is shown as a distance on the staff rather than only as a red key.
    const notes = chosen
      ? [build(pitch, answerInk), build(chosen, wrongInk)]
      : [build(pitch, answerInk)]

    const voice = new Voice({ numBeats: notes.length, beatValue: 4 }).addTickables(notes)
    new Formatter().joinVoices([voice]).format([voice], width - 90)
    voice.draw(ctx, stave)
    fitToStave(el, stave, width)
  }, [clef, pitch.letter, pitch.accidental, pitch.octave, width, height, tone,
      chosen?.letter, chosen?.accidental, chosen?.octave])

  return (
    <div className="relative w-full">
      <div ref={staveRef} data-testid="staff-lines" />
      {/* Keyed on the question, so each new note plays its entrance; feedback
          on the same note recolours it in place without replaying it. */}
      <div
        key={`${clef}${pitch.letter}${pitch.accidental}${pitch.octave}`}
        ref={notesRef}
        data-testid="staff-notes"
        className="absolute inset-0 animate-note-in"
      />
    </div>
  )
}

/**
 * A clef on a short stave, used as the visual badge for a level. Real notation
 * rather than an icon-library stand-in. It renders into a generous canvas and is
 * then cropped to the ink, so it fills whatever height the caller gives it.
 */
export function ClefGlyph({ clef }: { clef: Clef }) {
  const ref = useRef<HTMLDivElement>(null)

  useRedrawOnThemeChange(() => {
    const el = ref.current
    if (!el) return
    el.innerHTML = ''
    const ink = inkColor(el)
    const renderer = new Renderer(el, Renderer.Backends.SVG)
    renderer.resize(120, 200)
    const ctx = renderer.getContext()
    ctx.setFillStyle(ink)
    ctx.setStrokeStyle(ink)

    const stave = new Stave(4, 0, 74)
    stave.addClef(clef)
    stave.setStyle({ fillStyle: ink, strokeStyle: ink })
    stave.setContext(ctx).draw()

    const svg = el.querySelector('svg')
    if (svg) {
      cropToContent(svg, 120, 200)
      svg.style.height = '100%'
      svg.style.width = 'auto'
    }
  }, [clef])

  return <div ref={ref} className="flex h-full items-center justify-center" />
}
