import { useEffect, useState } from 'react'
import type { Chapter } from '@/core/lesson/types'
import { loadTheory, loadedTheory } from './routes'

/**
 * The theory chapters, for a page outside the theory chunk (Luyện's Hôm nay
 * pick, the first-open question). Null until the chunk has loaded; at once
 * when it already has.
 */
export function useChapters(): readonly Chapter[] | null {
  const [chapters, setChapters] = useState(() => loadedTheory()?.CHAPTERS ?? null)
  useEffect(() => {
    if (!chapters) loadTheory().then(m => setChapters(m.CHAPTERS)).catch(() => {})
  }, [chapters])
  return chapters
}
