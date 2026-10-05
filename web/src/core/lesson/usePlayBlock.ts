import { useCallback, useEffect, useRef, useState } from 'react'
import { playSequence, stopSounds } from '@/core/audio/playPitch'
import { playSounds } from './blocks'
import type { PlayBlock } from './types'

/**
 * Plays a lesson's "Nghe" block and says which one is sounding, so its button
 * can show it. A new play stops the last one. Used wherever lesson steps are
 * shown: the lesson player and Ôn tập.
 */
export function usePlayBlock() {
  const [playing, setPlaying] = useState<PlayBlock | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const play = useCallback((block: PlayBlock) => {
    stopSounds()
    const sounds = playSounds(block)
    playSequence(sounds.map(s => ({ pitches: s.pitches, at: s.at, hold: s.hold })))
    setPlaying(block)
    clearTimeout(timer.current)
    const end = Math.max(...sounds.map(s => s.at + s.hold))
    timer.current = setTimeout(() => setPlaying(null), end * 1000)
  }, [])
  return { playing, play }
}
