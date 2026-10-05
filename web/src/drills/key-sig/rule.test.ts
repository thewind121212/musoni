import { describe, it, expect } from 'vitest'
import { translate, type Translate } from '@/core/i18n/translate'
import { t } from '@/test/i18n'
import { keyName, ruleText } from './rule'

const vi: Translate = (key, params) => translate('vi', key, params)

describe('ruleText', () => {
  it('finds a sharp key a half step above the last sharp', () => {
    expect(ruleText(3, 'major', 'solfege', vi)).toBe('La trưởng: 3 thăng, thăng cuối Sol# + nửa cung')
    expect(ruleText(1, 'major', 'letters', t)).toBe('G major: 1 sharp, last sharp F# + half step')
    expect(ruleText(7, 'major', 'letters', t)).toBe('C# major: 7 sharps, last sharp B# + half step')
  })

  it('finds a flat key on the second-to-last flat, F major by its one flat, C major by none', () => {
    expect(ruleText(-3, 'major', 'solfege', vi)).toBe('Mib trưởng: 3 giáng, giáng áp chót Mib')
    expect(ruleText(-7, 'major', 'letters', t)).toBe('Cb major: 7 flats, second-to-last flat Cb')
    expect(ruleText(-1, 'major', 'solfege', vi)).toBe('Fa trưởng: một giáng')
    expect(ruleText(0, 'major', 'solfege', vi)).toBe('Do trưởng: không dấu')
  })

  it('finds a minor key through its relative major', () => {
    expect(ruleText(3, 'minor', 'solfege', vi)).toBe('Fa# thứ: 3 thăng như La trưởng, xuống quãng 3 thứ')
    expect(ruleText(0, 'minor', 'solfege', vi)).toBe('La thứ: không dấu như Do trưởng, xuống quãng 3 thứ')
    expect(ruleText(-1, 'minor', 'letters', t)).toBe('D minor: 1 flat like F major, down a minor third')
  })
})

describe('keyName', () => {
  it('names the key in the reader\'s naming and mode', () => {
    expect(keyName(-6, 'major', 'solfege', vi)).toBe('Solb trưởng')
    expect(keyName(5, 'minor', 'letters', t)).toBe('G# minor')
  })
})
