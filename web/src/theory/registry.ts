import type { Chapter } from './types'

/**
 * Every chapter, found by its folder: `content/chNN-<id>/index.ts`, whose
 * default export is the chapter. A chapter PR adds a folder and nothing else.
 * This module (and so all lesson text) is code-split: the theory pages import
 * it, and home loads it on mount (see app/routes `loadTheory`).
 */
export const CHAPTER_FILES: Record<string, Chapter> = import.meta.glob<Chapter>(
  './content/ch*/index.ts', { eager: true, import: 'default' },
)

/** Chapters in book order. */
export const CHAPTERS: Chapter[] = Object.values(CHAPTER_FILES).sort((a, b) => a.number - b.number)
