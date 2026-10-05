import { describe, it, expect } from 'vitest'
import { translate } from '@/core/i18n/translate'
import { t } from '@/test/i18n'
import { capitalize, cellLabel, cellName, verdict } from './names'
import type { Pitch } from '@/core/music/types'

const vi = (key: Parameters<typeof translate>[1], params?: Parameters<typeof translate>[2]) => translate('vi', key, params)
const E4: Pitch = { letter: 'E', accidental: '', octave: 4 }
const C5: Pitch = { letter: 'C', accidental: '', octave: 5 }
const Bb3: Pitch = { letter: 'B', accidental: 'b', octave: 3 }
const Cs4: Pitch = { letter: 'C', accidental: '#', octave: 4 }

describe('interval names', () => {
  it('labels cells the Vietnamese way and the English way', () => {
    expect(cellLabel({ row: 'm', size: 6 }, vi)).toBe('6t')
    expect(cellLabel({ row: 'MP', size: 6 }, vi)).toBe('6T')
    expect(cellLabel({ row: 'MP', size: 5 }, vi)).toBe('5Đ')
    expect(cellLabel({ row: 'A', size: 4 }, vi)).toBe('4+')
    expect(cellLabel({ row: 'd', size: 5 }, vi)).toBe('5°')
    expect(cellLabel({ row: 'MP', size: 8 }, t)).toBe('P8')
    expect(cellLabel({ row: 'size', size: 3 }, t)).toBe('3')
  })

  it('names cells in full', () => {
    expect(cellName({ row: 'MP', size: 8 }, vi)).toBe('quãng 8 đúng')
    expect(cellName({ row: 'MP', size: 8 }, t)).toBe('perfect octave')
    expect(cellName({ row: 'd', size: 7 }, t)).toBe('diminished 7th')
    expect(cellName({ row: 'size', size: 3 }, vi)).toBe('quãng 3')
    expect(cellName({ row: 'size', size: 2 }, t)).toBe('2nd')
  })

  it('capitalises Vietnamese and English alike', () => {
    expect(capitalize('quãng 6 thứ')).toBe('Quãng 6 thứ')
  })
})

describe('verdict', () => {
  const q = { lower: E4, upper: C5, interval: { size: 6, quality: 'm' } as const }

  it('names the interval and its notes in the reader’s naming', () => {
    expect(verdict(q, { chosen: { row: 'm', size: 6 }, correct: true }, 'solfege', vi)).toBe('Quãng 6 thứ (Mi → Do)')
    expect(verdict(q, { chosen: { row: 'm', size: 6 }, correct: true }, 'letters', t)).toBe('Minor 6th (E → C)')
  })

  it('adds the pick on a miss, the size alone when only the size was asked', () => {
    expect(verdict(q, { chosen: { row: 'MP', size: 6 }, correct: false }, 'solfege', vi))
      .toBe('Quãng 6 thứ (Mi → Do), bạn chọn quãng 6 trưởng')
    expect(verdict(q, { chosen: { row: 'size', size: 5 }, correct: false }, 'letters', t))
      .toBe('Minor 6th (E → C), you picked 5th')
  })

  it('spells accidentals on both notes', () => {
    const a2 = { lower: Bb3, upper: Cs4, interval: { size: 2, quality: 'A' } as const }
    expect(verdict(a2, { chosen: { row: 'A', size: 2 }, correct: true }, 'letters', t)).toBe('Augmented 2nd (Bb → C#)')
  })
})
