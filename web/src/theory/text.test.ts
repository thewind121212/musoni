import { describe, it, expect } from 'vitest'
import { parseText, pitchLabel, plainText, textError } from './text'

describe('lesson text', () => {
  it('prints pitch tokens in either naming, octave and accidentals included', () => {
    const text = 'Từ {G4} lên {A}, rồi {F#} và {Bb3}.'
    expect(plainText(text, 'solfege')).toBe('Từ Sol4 lên La, rồi Fa# và Sib3.')
    expect(plainText(text, 'letters')).toBe('Từ G4 lên A, rồi F# và Bb3.')
  })

  it('prints double accidentals and a written natural', () => {
    const [p] = parseText('{C##}')
    expect(p.kind === 'pitch' && pitchLabel(p.pitch, 'letters')).toBe('C##')
    const [n] = parseText('{Fn4}')
    expect(n.kind === 'pitch' && pitchLabel(n.pitch, 'solfege')).toBe('Fa♮4')
  })

  it('marks bold runs, pitch tokens inside them too', () => {
    expect(parseText('a **khóa {G}** b').map(s => [s.kind, s.bold])).toEqual([
      ['text', false], ['text', true], ['pitch', true], ['text', false],
    ])
  })

  it('rejects tokens that are not pitches, stray braces and an odd **', () => {
    expect(textError('{Sol}')).toMatch(/not a pitch/)
    expect(textError('{G4')).toMatch(/brace/)
    expect(textError('**bold')).toMatch(/unbalanced/)
    expect(textError('plain {E4} text')).toBeNull()
  })
})
