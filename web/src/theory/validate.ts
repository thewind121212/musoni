import { notationError, parseNotation, parsePitchName, midiOf } from '@/core/music/notation'
import { isExcluded } from '@/core/music/pitch'
import { presetError } from '@/app/drillPreset'
import { textError } from './text'
import type { Block, Chapter, Lesson, Localized, Step } from './types'
import { THEORY_RULES as R } from '@/config/constants'

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/
const CLEFS = ['treble', 'bass', 'alto', 'tenor', 'grand', 'none']
const KEY_SIGNATURE = /^[A-G](#|b)?m?$/
const TIME_SIGNATURE = /^(\d{1,2}\/(1|2|4|8|16)|C\|?)$/
const SOURCE_URL = /^https:\/\/musictheory\.pugetsound\.edu\/mt21c\/[\w-]+\.html(#[\w-]+)?$/

/** Sentences in a piece of text: ends of . ? ! … followed by a space or the end. */
export function sentenceCount(text: string): number {
  return text.split(/[.?!…]+(?:\s+|$)/).filter(s => s.trim()).length
}

/**
 * Checks one chapter against the content format and the port guide's rules.
 * Returns every problem found, each prefixed with where it is; empty when the
 * chapter is good. `folder` is the chapter's folder name (`ch01-pitch-staff`).
 */
export function validateChapter(folder: string, chapter: Chapter): string[] {
  const errors: string[] = []
  const at = (where: string) => (msg: string) => errors.push(`${folder}${where}: ${msg}`)
  const here = at('')

  const expected = `ch${String(chapter.number).padStart(2, '0')}-${chapter.id}`
  if (folder !== expected) here(`folder should be "${expected}" for chapter ${chapter.number} "${chapter.id}"`)
  if (!SLUG.test(chapter.id)) here(`id "${chapter.id}" is not a slug`)
  localized(chapter.title, here, 'title')
  if (!chapter.lessons?.length) here('no lessons')

  const ids = new Set<string>()
  chapter.lessons?.forEach((lesson, i) => {
    const where = at(`/${lesson.id ?? `lesson ${i + 1}`}`)
    if (!SLUG.test(lesson.id ?? '')) where(`id "${lesson.id}" is not a slug`)
    if (ids.has(lesson.id)) where('duplicate lesson id')
    ids.add(lesson.id)
    if (lesson.kind === 'review' && i !== chapter.lessons.length - 1) where('the review must be the last lesson')
    validateLesson(lesson, where)
  })
  return errors
}

function validateLesson(lesson: Lesson, err: (m: string) => void) {
  const review = lesson.kind === 'review'
  localized(lesson.title, err, 'title')
  if (!(Number.isInteger(lesson.minutes) && lesson.minutes >= R.minMinutes && lesson.minutes <= R.maxMinutes)) {
    err(`minutes ${lesson.minutes} outside ${R.minMinutes}-${R.maxMinutes}`)
  }
  if (!lesson.sources?.length) err('no source: give the book section and its URL')
  lesson.sources?.forEach(s => {
    if (!/^\d+\.\d+$/.test(s.section ?? '')) err(`source section "${s.section}" is not like 1.2`)
    if (!SOURCE_URL.test(s.url ?? '')) err(`source URL "${s.url}" is not a page of the book`)
  })
  if (lesson.practice !== undefined) {
    const problem = presetError(lesson.practice)
    if (problem) err(`unknown practice preset: ${problem}`)
  }
  const [minRecap, maxRecap] = review ? [0, R.maxRecap] : [R.minRecap, R.maxRecap]
  if (!(lesson.recap?.length >= minRecap && lesson.recap.length <= maxRecap)) {
    err(`${lesson.recap?.length ?? 0} recap bullets, want ${minRecap}-${maxRecap}`)
  }
  lesson.recap?.forEach((r, i) => localized(r, err, `recap ${i + 1}`))

  const steps = lesson.steps ?? []
  const [minSteps, maxSteps] = review ? [R.minReviewSteps, R.maxReviewSteps] : [R.minSteps, R.maxSteps]
  if (steps.length < minSteps || steps.length > maxSteps) {
    err(`${steps.length} steps, want ${minSteps}-${maxSteps}${review ? ' (review)' : ''}`)
  }
  const checks = steps.filter(s => s.kind === 'check').length
  const minChecks = review ? R.minReviewChecks : R.minChecks
  if (checks < minChecks) err(`${checks} checks, want at least ${minChecks}`)
  if (review && checks !== steps.length) err('a review holds checks only')
  steps.forEach((step, i) => validateStep(step, m => err(`step ${i + 1}: ${m}`)))
}

function validateStep(step: Step, err: (m: string) => void) {
  if (step.kind === 'explain') {
    localized(step.title, err, 'title')
    if (!step.blocks?.length) err('no blocks')
    const texts = step.blocks?.filter(b => b.type === 'text').length ?? 0
    if (texts > R.maxTextBlocks) err(`${texts} text blocks, at most ${R.maxTextBlocks}`)
    step.blocks?.forEach((b, i) => validateBlock(b, m => err(`block ${i + 1} (${b.type}): ${m}`)))
    return
  }
  if (step.kind !== 'check') {
    err(`unknown step kind "${(step as { kind: string }).kind}"`)
    return
  }
  localized(step.prompt, err, 'prompt')
  if (!step.reason) err('a check needs a reason')
  else localized(step.reason, err, 'reason')
  step.blocks?.forEach((b, i) => validateBlock(b, m => err(`block ${i + 1} (${b.type}): ${m}`)))

  const answer = step.answer
  if (answer?.type === 'key') {
    const p = parsePitchName(answer.note ?? '')
    if (!p || p.octave !== null) err(`key answer "${answer.note}" is not a pitch class like E or F#`)
    else if (p.natural || Math.abs(p.alter) > 1 || isExcluded(p.letter, p.alter === 1 ? '#' : p.alter === -1 ? 'b' : '')) {
      err(`key answer "${answer.note}" is not on the answer pad`)
    }
  } else if (answer?.type === 'choice') {
    const n = answer.choices?.length ?? 0
    if (n < 2 || n > 4) err(`${n} choices, want 2-4`)
    const right = answer.choices?.filter(c => c.correct === true).length ?? 0
    if (right !== 1) err(`${right} correct choices, want exactly one`)
    answer.choices?.forEach((c, i) => localized(c.text, err, `choice ${i + 1}`))
    const seen = new Set(answer.choices?.map(c => c.text?.vi))
    if (seen.size !== n) err('two choices say the same thing')
  } else {
    err('a check needs an answer: { type: "key" } or { type: "choice" }')
  }
}

function validateBlock(block: Block, err: (m: string) => void) {
  switch (block.type) {
    case 'text':
    case 'tip':
      localized(block.text, err, 'text', true)
      return
    case 'staff': {
      if (!CLEFS.includes(block.clef)) err(`unknown clef "${block.clef}"`)
      const problem = notationError(block.notes ?? '')
      if (problem) return err(`notes: ${problem}`)
      const sounding = parseNotation(block.notes).filter(e => e.kind !== 'bar').length
      if (sounding === 0 && block.labels) err('labels on a staff with no notes')
      if (block.key !== undefined && !KEY_SIGNATURE.test(block.key)) err(`key "${block.key}" is not like G, Bb or F#m`)
      if (block.time !== undefined && !TIME_SIGNATURE.test(block.time)) err(`time "${block.time}" is not like 4/4`)
      if (Array.isArray(block.labels)) {
        if (block.labels.length !== sounding) err(`${block.labels.length} labels for ${sounding} notes`)
        block.labels.forEach(l => {
          const problem = textError(l)
          if (problem) err(`label: ${problem}`)
          if (l.replace(/\{[^}]*\}/g, 'Xxx').length > R.maxLabelLength) err(`label "${l}" is too long`)
        })
      } else if (block.labels !== undefined && block.labels !== 'names' && block.labels !== 'pitches') {
        err(`labels "${String(block.labels)}" is not names, pitches or a list`)
      }
      block.highlight?.forEach(i => {
        if (!(Number.isInteger(i) && i >= 0 && i < sounding)) err(`highlight ${i} is not one of the ${sounding} notes`)
      })
      return
    }
    case 'play': {
      const problem = notationError(block.notes ?? '')
      if (problem) return err(`notes: ${problem}`)
      if (!parseNotation(block.notes).some(e => e.kind === 'note')) err('nothing to play')
      if (block.label) localized(block.label, err, 'label')
      if (block.bpm !== undefined && !(block.bpm >= 30 && block.bpm <= 240)) err(`bpm ${block.bpm} outside 30-240`)
      return
    }
    case 'keys': {
      const problem = notationError(block.notes ?? '')
      if (problem) return err(`notes: ${problem}`)
      const events = parseNotation(block.notes)
      if (events.some(e => e.kind !== 'note' || e.timed)) err('keys take pitches only (no rests, bars or durations)')
      const midis = events.flatMap(e => (e.kind === 'note' ? e.pitches.map(midiOf) : []))
      let from = midis.length ? Math.floor(Math.min(...midis) / 12) * 12 : 60
      if (block.from !== undefined) {
        const p = parsePitchName(block.from)
        if (!p || p.letter !== 'C' || p.alter !== 0 || p.octave === null) return err(`from "${block.from}" is not a C with an octave`)
        from = midiOf({ ...p, octave: p.octave })
      }
      const octaves = block.octaves ?? Math.max(1, Math.ceil((Math.max(from, ...midis) - from + 1) / 12))
      if (!(Number.isInteger(octaves) && octaves >= 1 && octaves <= R.maxKeyOctaves)) err(`octaves ${octaves} outside 1-${R.maxKeyOctaves}`)
      if (midis.some(m => m < from || m >= from + octaves * 12)) err('a filled key is outside the keyboard drawn')
      if (block.labels !== undefined && block.labels !== 'names' && block.labels !== 'pitches') err(`labels "${String(block.labels)}"`)
      if (block.caption) localized(block.caption, err, 'caption')
      return
    }
    default:
      err(`unknown block type "${(block as { type: string }).type}"`)
  }
}

function localized(value: Localized | undefined, err: (m: string) => void, what: string, prose = false) {
  for (const lang of ['vi', 'en'] as const) {
    const text = value?.[lang]
    if (typeof text !== 'string' || !text.trim()) {
      err(`${what}: missing ${lang} text`)
      continue
    }
    const problem = textError(text)
    if (problem) err(`${what} (${lang}): ${problem}`)
    if (prose && sentenceCount(text) > R.maxSentences) {
      err(`${what} (${lang}): ${sentenceCount(text)} sentences, at most ${R.maxSentences}`)
    }
    if (prose && lang === 'vi' && text.split(/\s+/).length > R.maxWords) {
      err(`${what} (vi): ${text.split(/\s+/).length} words, at most ${R.maxWords}`)
    }
  }
}
