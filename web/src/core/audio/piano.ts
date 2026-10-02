import type { Accidental, Letter } from '../music/types'
import { midi } from '../music/pitch'

/** A recorded note: where it sits on the keyboard and where its file lives. */
export interface PianoSample {
  midi: number
  file: string
}

/**
 * Parses a sample name such as `D#4` into its MIDI number and file name.
 * Files spell sharps as `s` (`Ds4.mp3`) because `#` starts a URL fragment.
 */
export function sampleFromName(name: string): PianoSample {
  const match = /^([A-G])([#b]?)(-?\d+)$/.exec(name)
  if (!match) throw new Error(`bad sample name: ${name}`)
  const [, letter, accidental, octave] = match
  return {
    midi: midi({ letter: letter as Letter, accidental: accidental as Accidental, octave: Number(octave) }),
    file: `${letter}${accidental === '#' ? 's' : accidental}${octave}.mp3`,
  }
}

/**
 * Picks the recording to stretch for a note and the playback rate that lands
 * it on pitch. Equal temperament: one semitone is a rate of 2^(1/12).
 * Ties go to the lower recording, which has the fuller tone.
 */
export function nearestSample(
  targetMidi: number,
  samples: readonly PianoSample[],
): { sample: PianoSample; rate: number } {
  if (samples.length === 0) throw new Error('no samples')
  let best = samples[0]
  for (const s of samples) {
    if (Math.abs(s.midi - targetMidi) < Math.abs(best.midi - targetMidi)) best = s
  }
  return { sample: best, rate: Math.pow(2, (targetMidi - best.midi) / 12) }
}
