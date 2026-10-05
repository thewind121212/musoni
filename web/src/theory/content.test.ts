import { describe, it, expect } from 'vitest'
import { CHAPTER_FILES, CHAPTERS } from './registry'
import { validateChapter } from './validate'

/**
 * Every chapter the registry finds, against the content format and the port
 * guide's rules (theory/validate). A chapter PR passes this or does not merge.
 */
describe('theory content', () => {
  it('finds chapters, numbered once each', () => {
    expect(CHAPTERS.length).toBeGreaterThan(0)
    const numbers = CHAPTERS.map(c => c.number)
    expect(new Set(numbers).size).toBe(numbers.length)
    const ids = CHAPTERS.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  for (const [path, chapter] of Object.entries(CHAPTER_FILES)) {
    const folder = path.split('/').at(-2)!
    it(`${folder} follows the content format`, () => {
      expect(validateChapter(folder, chapter)).toEqual([])
    })
  }
})
