import { describe, it, expect } from 'vitest'
import { keyLabels, keysLayout, loneStaffNote, playSounds, staffLabels, staffWidth } from './blocks'
import { parseNotation } from '@/core/music/notation'
import type { StaffBlock } from './types'
import { THEORY_STAFF_WIDTH } from '@/config/constants'

const staff = (over: Partial<StaffBlock>): StaffBlock => ({ type: 'staff', clef: 'treble', notes: 'C4', ...over })

describe('lesson blocks', () => {
  it('labels notes by name or pitch in the naming given, and leaves rests and empty labels bare', () => {
    const b = staff({ notes: 'C4 R:q | G4+B4', labels: 'names' })
    expect(staffLabels(b, parseNotation(b.notes), 'solfege')).toEqual(['Do', null, 'Sol Si'])
    const p = staff({ notes: 'C4 D5', labels: 'pitches' })
    expect(staffLabels(p, parseNotation(p.notes), 'letters')).toEqual(['C4', 'D5'])
    const own = staff({ notes: 'E4 G4', labels: ['1', ''] })
    expect(staffLabels(own, parseNotation(own.notes), 'letters')).toEqual(['1', null])
  })

  it('widens the staff with the notes, within bounds', () => {
    const w = (notes: string) => staffWidth(staff({ notes }), parseNotation(notes))
    expect(w('C4')).toBe(THEORY_STAFF_WIDTH.min)
    expect(w('C4 D4 E4 F4 G4 A4 B4')).toBeGreaterThan(w('C4 D4 E4'))
    expect(w(Array(40).fill('C4').join(' '))).toBe(THEORY_STAFF_WIDTH.max)
  })

  it('draws the keyboard from the C below the lowest note, as many octaves as needed', () => {
    expect(keysLayout({ type: 'keys', notes: 'G4' })).toMatchObject({ from: 60, octaves: 1, lit: [7] })
    expect(keysLayout({ type: 'keys', notes: 'C3 C4 C5' })).toMatchObject({ from: 48, octaves: 3, lit: [0, 12, 24] })
    expect(keysLayout({ type: 'keys', notes: 'E4', from: 'C3', octaves: 2 })).toMatchObject({ from: 48, lit: [16] })
    expect(keyLabels({ type: 'keys', notes: 'C3 C4', labels: 'pitches' }, 'solfege')).toEqual({ 0: 'Do3', 12: 'Do4' })
  })

  it('finds the lone note a check is about, and nothing when there is more to look at', () => {
    expect(loneStaffNote([staff({ notes: 'Bb3' })])).toEqual({ letter: 'B', accidental: 'b', octave: 3 })
    expect(loneStaffNote([staff({ notes: 'C4 D4' })])).toBeNull()
    expect(loneStaffNote([staff({}), staff({})])).toBeNull()
    expect(loneStaffNote([{ type: 'keys', notes: 'C4' }])).toBeNull()
  })

  it('plays untimed notes evenly', () => {
    const sounds = playSounds({ type: 'play', notes: 'C4 E4 G4' })
    expect(sounds).toHaveLength(3)
    expect(sounds[2].at).toBeGreaterThan(sounds[1].at)
  })
})
