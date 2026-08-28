import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

/** Slides a route in from the right on entry, so tapping into a drill reads as
 *  moving forward rather than as a page swap. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reduce ? undefined : { opacity: 0, x: -18 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
