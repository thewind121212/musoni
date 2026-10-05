import { describe, expect, it } from 'vitest'
import { t } from '@/test/i18n'
import { nameQuestion, romanQuestion } from './generator'
import { answerText, chordName, chosenText, keyText } from './wording'

const am = (level: 3 | 4, inversion: 0 | 1) =>
  nameQuestion(level, 'solfege', { root: { letter: 'A', accidental: '' }, quality: 'minor', inversion, weight: 1 })

describe('chord wording', () => {
  it('names the chord in the reader\'s naming, with the inversion only where the level has them', () => {
    expect(chordName(am(3, 0), t, 'solfege')).toBe('La minor')
    expect(chordName(am(4, 1), t, 'letters')).toBe('A minor, first inversion')
    expect(chordName(am(4, 0), t, 'letters')).toBe('A minor, root position')
  })

  it('writes the answer as symbol and name, and leads with the numeral in a key', () => {
    expect(answerText(am(4, 1), t, 'letters')).toBe('Am/C · A minor, first inversion')
    expect(answerText(romanQuestion('a', 6, 1), t, 'letters')).toBe('vii° · G♯° · G# diminished')
  })

  it('words the pick as the key tapped and the quality, or as a numeral', () => {
    const q = am(4, 1)
    const c = q.options.findIndex(o => o.letter === 'C' && o.accidental === '')
    expect(chosenText(q, { root: c, quality: 'major' }, t)).toBe('Do major')
    expect(chosenText(romanQuestion('C', 0, 1), { degree: 4 }, t)).toBe('V')
  })

  it('names the key, major or minor', () => {
    expect(keyText('Bb', t, 'letters')).toBe('Bb major')
    expect(keyText('f#', t, 'solfege')).toBe('Fa# minor')
  })
})
