import { useEffect, useRef } from 'react'
import { Renderer, Stave, StaveNote, Accidental, Formatter, Voice } from 'vexflow'
import type { Pitch, Clef } from '../music/types'

interface Props { clef: Clef; pitch: Pitch; width?: number; height?: number }

/**
 * The only component in the app allowed to touch VexFlow.
 * Renders one note on one stave, scaled to its container.
 *
 * VexFlow paints black by default, which disappears on a dark surface, so every
 * drawn element is restyled to the `--staff` token and the whole SVG is
 * repainted when the colour scheme changes.
 */
export function Staff({ clef, pitch, width = 320, height = 190 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const draw = () => {
      el.innerHTML = ''
      const ink = getComputedStyle(el).getPropertyValue('--staff').trim() || '#111'
      const renderer = new Renderer(el, Renderer.Backends.SVG)
      renderer.resize(width, height)
      const ctx = renderer.getContext()
      ctx.setFillStyle(ink)
      ctx.setStrokeStyle(ink)

      const stave = new Stave(8, 28, width - 16)
      stave.addClef(clef)
      stave.setStyle({ fillStyle: ink, strokeStyle: ink })
      stave.setContext(ctx).draw()

      const key = `${pitch.letter.toLowerCase()}${pitch.accidental}/${pitch.octave}`
      const note = new StaveNote({ keys: [key], duration: 'q', clef })
      if (pitch.accidental) note.addModifier(new Accidental(pitch.accidental))
      note.setStyle({ fillStyle: ink, strokeStyle: ink })

      const voice = new Voice({ numBeats: 1, beatValue: 4 }).addTickables([note])
      new Formatter().joinVoices([voice]).format([voice], width - 90)
      voice.draw(ctx, stave)

      const svg = el.querySelector('svg')
      if (svg) {
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
        svg.removeAttribute('width')
        svg.removeAttribute('height')
        svg.style.width = '100%'
        svg.style.height = 'auto'
        svg.setAttribute('aria-hidden', 'true')
      }
    }

    draw()
    const scheme = window.matchMedia?.('(prefers-color-scheme: dark)')
    scheme?.addEventListener?.('change', draw)
    return () => {
      scheme?.removeEventListener?.('change', draw)
      el.innerHTML = ''
    }
  }, [clef, pitch.letter, pitch.accidental, pitch.octave, width, height])

  return <div ref={ref} className="w-full" />
}

/**
 * A small clef on a short stave, used as the visual badge for a level. Real
 * notation rather than an icon-library approximation, and it lives here because
 * this file is the app's only VexFlow touchpoint.
 */
export function ClefGlyph({ clef, width = 54, height = 64 }: { clef: Clef; width?: number; height?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const draw = () => {
      el.innerHTML = ''
      const ink = getComputedStyle(el).getPropertyValue('--staff').trim() || '#111'
      const renderer = new Renderer(el, Renderer.Backends.SVG)
      renderer.resize(width, height)
      const ctx = renderer.getContext()
      ctx.setFillStyle(ink)
      ctx.setStrokeStyle(ink)

      const stave = new Stave(2, 10, width - 4)
      stave.addClef(clef)
      stave.setStyle({ fillStyle: ink, strokeStyle: ink })
      stave.setContext(ctx).draw()

      const svg = el.querySelector('svg')
      if (svg) {
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
        svg.removeAttribute('width')
        svg.removeAttribute('height')
        svg.style.width = '100%'
        svg.style.height = 'auto'
        svg.setAttribute('aria-hidden', 'true')
      }
    }

    draw()
    const scheme = window.matchMedia?.('(prefers-color-scheme: dark)')
    scheme?.addEventListener?.('change', draw)
    return () => {
      scheme?.removeEventListener?.('change', draw)
      el.innerHTML = ''
    }
  }, [clef, width, height])

  return <div ref={ref} className="w-full" />
}
