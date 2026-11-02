import type { ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'

interface Props {
  open: boolean
  /** For the toggle's `aria-controls`. */
  id?: string
  children: ReactNode
}

// Opens on the app's ease-out, closes a little quicker. Clipped only while it
// moves: once open, overflow is visible again so focus rings and anything
// drawn outside the content are not cut off.
const variants: Variants = {
  open: {
    height: 'auto', opacity: 1, overflow: 'hidden',
    transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
    transitionEnd: { overflow: 'visible' },
  },
  closed: {
    height: 0, opacity: 0, overflow: 'hidden',
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
}

/**
 * Content that folds open and shut under its toggle, growing in height and
 * fading in. While closed it is not rendered, so it stays out of the tab order
 * and away from screen readers. Instant with reduced motion. Put spacing on
 * the child, not as margin around it, so it folds away with the content.
 */
export function Collapse({ open, id, children }: Props) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="content"
          id={id}
          variants={variants}
          initial={reduce ? false : 'closed'}
          animate="open"
          exit={reduce ? undefined : 'closed'}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
