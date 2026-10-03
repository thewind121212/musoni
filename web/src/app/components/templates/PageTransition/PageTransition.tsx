import { useLayoutEffect, type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

const variants: Variants = {
  enter: { opacity: 0, x: 24 },
  shown: { opacity: 1, x: 0 },
  // The leaving page reads `instant` from AnimatePresence's `custom`, because
  // its own props are frozen at the render before the navigation.
  leave: (instant: boolean) => (instant ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: -18 }),
}

interface Props {
  /** Show the page as-is, with no exit or entry motion. Set for back and
   *  forward navigation: a phone's edge-swipe has already animated the page in,
   *  so sliding it in again reads as the page re-rendering. */
  instant?: boolean
  children: ReactNode
}

/** Slides a route in from the right on entry, so tapping into a drill reads as
 *  moving forward rather than as a page swap, and opens it at the top. */
export function PageTransition({ instant = false, children }: Props) {
  const reduce = useReducedMotion()
  // Moving forward opens the new page at its top, not at the scroll the last
  // page was left at. Back and forward leave scrolling to the browser.
  useLayoutEffect(() => {
    if (!instant) window.scrollTo(0, 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <motion.div
      custom={instant}
      variants={variants}
      initial={reduce || instant ? false : 'enter'}
      animate="shown"
      exit={reduce ? undefined : 'leave'}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
