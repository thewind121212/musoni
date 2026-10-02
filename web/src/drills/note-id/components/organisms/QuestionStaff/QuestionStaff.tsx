import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Staff, type StaffTone } from '@/core/components/organisms'
import type { Clef, Pitch } from '@/core/music/types'

interface Props {
  clef: Clef
  pitch: Pitch
  tone: StaffTone
  /** The reader's wrong pick, drawn beside the printed note. */
  chosen: Pitch | null
}

/** The note to read, on its card. Each new note fades in; feedback recolours it in place. */
export function QuestionStaff({ clef, pitch, tone, chosen }: Props) {
  const reduce = useReducedMotion()
  return (
    <div className="w-full rounded-2xl border border-line bg-raised px-3 py-6 md:mx-auto md:max-w-2xl md:px-10 md:py-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${pitch.letter}${pitch.accidental}${pitch.octave}${clef}`}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <Staff clef={clef} pitch={pitch} tone={tone} chosen={chosen} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
