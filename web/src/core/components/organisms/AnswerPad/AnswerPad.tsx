import type { CSSProperties } from 'react'
import type { NoteOption } from '@/core/music/pianoKeys'
import { PianoKey, type KeyMark } from '@/core/components/molecules'
import { BLACK_KEY_BOUNDARY, blackKeyPosition } from '@/core/music/keyboard'

interface Props {
  options: NoteOption[]
  feedback: { correctIndex: number; chosenIndex: number } | null
  onAnswer: (index: number) => void
  /** Print note names on the keys. Off leaves a bare keyboard; answered keys still show theirs. */
  showLabels?: boolean
  /** A drawn piano keyboard (default), or two rows of free-standing boxes. */
  layout?: 'piano' | 'boxes'
  /** The key's home note, dotted as a landmark, with its screen-reader text. */
  home?: { index: number; label: string }
}

// Box layout: columns in a 14-wide grid, so each white box spans two and each
// black box straddles the boundary between its neighbours.
const BOX_BLACK_COLUMN = [2, 4, 8, 10, 12]

/**
 * The answer keys. By default drawn as a piano: seven long white keys side by side, and
 * the five black keys laid over the gaps between them (two, none where E meets
 * F, then three).
 *
 * The black keys are always drawn, since they are how a pianist finds a note
 * on a keyboard. Without accidentals they are landmarks only, not answers.
 * Keys hold the same position on every question, so the pad is a layout to
 * learn rather than a list to re-read.
 *
 * The box layout is the older look, kept as a setting: black keys as a row of
 * boxes above the white ones, hidden when accidentals are off.
 */
export function AnswerPad({ options, feedback, onAnswer, showLabels = true, layout = 'piano', home }: Props) {
  const naturals = options.filter(o => o.row === 'natural')
  const accidentals = options.filter(o => o.row === 'accidental')

  const markOf = (index: number): KeyMark =>
    !feedback
      ? 'none'
      : index === feedback.correctIndex
        ? 'correct'
        : index === feedback.chosenIndex ? 'wrong' : 'none'

  const key = (option: NoteOption, className: string, style?: CSSProperties) => {
    const index = options.indexOf(option)
    return (
      <PianoKey
        key={option.label}
        label={option.label}
        showLabel={showLabels}
        keyHint={option.keyHint}
        row={option.row}
        shape={layout === 'boxes' ? 'box' : 'piano'}
        mark={markOf(index)}
        homeLabel={home?.index === index ? home.label : undefined}
        disabled={!!feedback}
        onPress={() => onAnswer(index)}
        className={className}
        style={style}
      />
    )
  }

  if (layout === 'boxes') {
    return (
      <div className="select-none">
        {accidentals.length > 0 && (
          <div data-testid="black-keys" className="grid grid-cols-14 gap-1.5 md:gap-2">
            {accidentals.map(option => (
              <div
                key={option.label}
                className="col-span-2 flex"
                style={{ gridColumnStart: BOX_BLACK_COLUMN[option.slot] }}
              >
                {key(option, 'h-14 w-full md:h-16')}
              </div>
            ))}
          </div>
        )}
        <div
          data-testid="white-keys"
          className={'grid grid-cols-7 gap-1.5 md:gap-2 ' + (accidentals.length > 0 ? 'mt-1.5 md:mt-2' : '')}
        >
          {naturals.map(option => key(option, 'h-16 w-full md:h-20'))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[clamp(8.5rem,24dvh,10rem)] select-none md:h-[clamp(9.5rem,22dvh,11rem)]">
      <div data-testid="white-keys" className="flex h-full gap-1">
        {naturals.map(option => key(option, 'h-full min-w-0 flex-1'))}
      </div>
      <div data-testid="black-keys">
        {accidentals.length > 0
          ? accidentals.map(option =>
            key(option, 'absolute top-0 h-[58%]', blackKeyPosition(option.slot)))
          : BLACK_KEY_BOUNDARY.map((_, slot) => (
            <span
              key={slot}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 z-10 h-[58%] rounded-b-lg bg-ink shadow-md"
              style={blackKeyPosition(slot)}
            />
          ))}
      </div>
    </div>
  )
}
