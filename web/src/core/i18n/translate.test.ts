import { describe, it, expect } from 'vitest'
import { translate, LANGS } from './translate'
import { en, vi, type TranslationKey } from './translations'

describe('translate', () => {
  it('defaults to Vietnamese content', () => {
    expect(translate('vi', 'setup.start')).toBe('Bắt đầu')
    expect(translate('en', 'setup.start')).toBe('Start')
  })

  it('interpolates named params', () => {
    expect(translate('en', 'result.weekAverage', { score: 718 })).toContain('718')
    expect(translate('vi', 'result.weekAverage', { score: 718 })).toContain('718')
  })

  it('leaves an unknown placeholder alone rather than blanking it', () => {
    expect(translate('en', 'result.weekAverage')).toContain('{score}')
  })

  it('picks the English singular via plural rules', () => {
    expect(translate('en', 'week.sessions', { count: 1 })).toBe('in 1 session')
    expect(translate('en', 'week.sessions', { count: 3 })).toBe('in 3 sessions')
  })

  it('uses one Vietnamese form for any count', () => {
    expect(translate('vi', 'week.days', { count: 1 })).toBe('1 ngày')
    expect(translate('vi', 'week.days', { count: 5 })).toBe('5 ngày')
  })
})

describe('translation coverage', () => {
  it('translates every key into every language', () => {
    const keys = Object.keys(en) as TranslationKey[]
    for (const lang of LANGS) {
      for (const key of keys) {
        const value = translate(lang, key)
        expect(value, `${lang} is missing ${key}`).toBeTruthy()
        expect(value, `${lang} falls back to the raw key for ${key}`).not.toBe(key)
      }
    }
  })

  it('has no Vietnamese string left in English', () => {
    const keys = Object.keys(en) as TranslationKey[]
    const untranslated = keys.filter(k => k !== 'lang.name' && vi[k] === en[k])
    // A few are legitimately identical across languages; catch wholesale copies.
    expect(untranslated.length).toBeLessThan(keys.length * 0.2)
  })
})
