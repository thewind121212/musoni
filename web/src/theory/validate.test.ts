import { describe, it, expect } from 'vitest'
import { sentenceCount, validateChapter } from './validate'
import type { Chapter, CheckStep, Lesson } from './types'

const L = (vi: string, en = vi) => ({ vi, en })
const URL = 'https://musictheory.pugetsound.edu/mt21c/Notation.html'
const check = (): CheckStep => ({
  kind: 'check', prompt: L('Nốt này là nốt gì?', 'What is this note?'),
  blocks: [{ type: 'staff', clef: 'treble', notes: 'E4' }],
  answer: { type: 'key', note: 'E' }, reason: L('Dòng 1 là {E4}.', 'Line 1 is {E4}.'),
})
const lesson = (): Lesson => ({
  id: 'staff', title: L('Khuông nhạc', 'The staff'), minutes: 3,
  sources: [{ section: '1.2', url: URL }],
  practice: { drill: 'note-id', level: 1, durationSec: 60 },
  recap: [L('Một'), L('Hai'), L('Ba')],
  steps: [
    { kind: 'explain', title: L('Khóa Sol'), blocks: [
      { type: 'text', text: L('**Khóa Sol** cuộn quanh dòng 2.', 'The **treble clef** circles line 2.') },
      { type: 'staff', clef: 'treble', notes: 'G4', labels: 'names', highlight: [0] },
      { type: 'play', notes: 'G4' },
      { type: 'keys', notes: 'G4', caption: L('{G} trên phím đàn', '{G} on the keys') },
      { type: 'tip', text: L('Đếm từng dòng.', 'Count line by line.') },
    ] },
    check(),
    { kind: 'explain', title: L('Khóa Fa'), blocks: [{ type: 'staff', clef: 'bass', notes: 'F3' }] },
    { ...check(), answer: { type: 'choice', choices: [{ text: L('Dòng 1'), correct: true }, { text: L('Khe 1') }] } },
  ],
})
const chapter = (): Chapter => ({ id: 'pitch-staff', number: 1, title: L('Cao độ'), lessons: [lesson()] })
const FOLDER = 'ch01-pitch-staff'

/** Errors after a change to a fresh, valid chapter. */
function errorsAfter(change: (c: Chapter, l: Lesson) => void): string[] {
  const c = chapter()
  change(c, c.lessons[0])
  return validateChapter(FOLDER, c)
}

describe('validateChapter', () => {
  it('passes a well-formed chapter', () => {
    expect(validateChapter(FOLDER, chapter())).toEqual([])
  })

  it('checks the folder name against the number and id', () => {
    expect(validateChapter('ch02-pitch-staff', chapter())[0]).toMatch(/folder should be "ch01-pitch-staff"/)
  })

  it('fails on unparseable notes and pitch tokens', () => {
    expect(errorsAfter((_, l) => { (l.steps[2] as { blocks: { notes: string }[] }).blocks[0].notes = 'F3 Q3' })).toEqual(
      [expect.stringMatching(/step 3: block 1 \(staff\): notes: .*Q3/)])
    expect(errorsAfter((_, l) => { l.recap[0] = L('{Sol}') })[0]).toMatch(/recap 1 \(vi\): not a pitch token/)
  })

  it('fails on a missing language', () => {
    expect(errorsAfter((_, l) => { l.title = { vi: 'Khuông', en: '' } })[0]).toMatch(/title: missing en text/)
  })

  it('fails on a check without exactly one correct answer or without a reason', () => {
    expect(errorsAfter((_, l) => {
      const c = l.steps[3] as CheckStep
      if (c.answer.type === 'choice') c.answer.choices[1].correct = true
    })[0]).toMatch(/2 correct choices/)
    expect(errorsAfter((_, l) => { delete (l.steps[1] as Partial<CheckStep>).reason })[0]).toMatch(/needs a reason/)
    expect(errorsAfter((_, l) => { (l.steps[1] as CheckStep).answer = { type: 'key', note: 'E#' } })[0])
      .toMatch(/not on the answer pad/)
  })

  it('fails on too few checks and on a step count outside 4-7', () => {
    expect(errorsAfter((_, l) => { l.steps[1] = l.steps[0] })[0]).toMatch(/1 checks, want at least 2/)
    expect(errorsAfter((_, l) => { l.steps = l.steps.slice(0, 3) }).join()).toMatch(/3 steps, want 4-7/)
    expect(errorsAfter((_, l) => { l.steps = [...l.steps, ...l.steps] }).join()).toMatch(/8 steps/)
  })

  it('holds a review to checks only, 5-8 of them, last in the chapter', () => {
    const review = (n: number): Lesson => ({ ...lesson(), id: 'review', kind: 'review', recap: [], steps: Array.from({ length: n }, check) })
    expect(errorsAfter(c => { c.lessons.push(review(6)) })).toEqual([])
    expect(errorsAfter(c => { c.lessons.push(review(4)) }).join()).toMatch(/4 steps, want 5-8 \(review\)/)
    expect(errorsAfter(c => { c.lessons.unshift(review(6)) }).join()).toMatch(/review must be the last/)
  })

  it('fails on an unknown practice preset and a missing source URL', () => {
    expect(errorsAfter((_, l) => { l.practice = { drill: 'note-id', level: 1, durationSec: 45 } })[0])
      .toMatch(/unknown practice preset: length 45s/)
    expect(errorsAfter((_, l) => { l.sources = [] })[0]).toMatch(/no source/)
    expect(errorsAfter((_, l) => { l.sources[0].url = '' })[0]).toMatch(/source URL/)
  })

  it('holds text blocks to three sentences, labels to the notes, and keys to the keyboard', () => {
    const explain = (l: Lesson) => (l.steps[0] as unknown as { blocks: Record<string, unknown>[] }).blocks
    expect(errorsAfter((_, l) => { explain(l)[0].text = L('Một. Hai. Ba. Bốn.', 'One.') })[0]).toMatch(/4 sentences/)
    expect(errorsAfter((_, l) => { explain(l)[1].labels = ['1', '2'] })[0]).toMatch(/2 labels for 1 notes/)
    expect(errorsAfter((_, l) => { explain(l)[1].highlight = [3] })[0]).toMatch(/highlight 3/)
    expect(errorsAfter((_, l) => { explain(l)[3].from = 'C5' })[0]).toMatch(/outside the keyboard/)
    expect(errorsAfter((_, l) => { explain(l)[3].notes = 'G4:q' })[0]).toMatch(/pitches only/)
  })

  it('counts sentences at their ends only', () => {
    expect(sentenceCount('Một câu. Hai câu? Ba!')).toBe(3)
    expect(sentenceCount('{C4} nằm giữa, ví dụ 1.5 không cắt câu')).toBe(1)
  })
})
