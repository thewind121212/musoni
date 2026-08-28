import { useEffect, useRef } from 'react'
import { Renderer, Stave, StaveNote, Accidental, Formatter, Voice } from 'vexflow'
import type { Pitch, Clef } from '../music/types'

interface Props { clef: Clef; pitch: Pitch; width?: number; height?: number }

export function Staff({ clef, pitch, width = 300, height = 180 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.innerHTML = ''
    const renderer = new Renderer(el, Renderer.Backends.SVG)
    renderer.resize(width, height)
    const ctx = renderer.getContext()
    const stave = new Stave(10, 30, width - 20)
    stave.addClef(clef).setContext(ctx).draw()
    const key = `${pitch.letter.toLowerCase()}${pitch.accidental}/${pitch.octave}`
    const note = new StaveNote({ keys: [key], duration: 'q', clef })
    if (pitch.accidental) note.addModifier(new Accidental(pitch.accidental))
    const voice = new Voice({ numBeats: 1, beatValue: 4 }).addTickables([note])
    new Formatter().joinVoices([voice]).format([voice], width - 80)
    voice.draw(ctx, stave)
    const svg = el.querySelector('svg')
    if (svg) { svg.setAttribute('viewBox', `0 0 ${width} ${height}`); svg.removeAttribute('width'); svg.removeAttribute('height'); svg.style.width = '100%'; svg.style.height = 'auto' }
  }, [clef, pitch.letter, pitch.accidental, pitch.octave, width, height])
  return <div ref={ref} />
}
