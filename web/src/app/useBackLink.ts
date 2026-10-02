import type { MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Click handler for a link back to home. When the app has history of its own
 * (the user came from home), it steps back instead of pushing "/" again, so the
 * back link behaves like the browser's back: no forward slide, and no extra
 * history entry that a later swipe-back would land on. Opened directly on a
 * drill there is nothing to go back to, so the link's own href is followed.
 */
export function useBackLink() {
  const navigate = useNavigate()
  const { key } = useLocation()
  return (e: MouseEvent) => {
    if (key === 'default') return
    e.preventDefault()
    navigate(-1)
  }
}
