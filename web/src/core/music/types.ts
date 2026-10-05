/** A five-line staff's clef. Alto and tenor are the C clefs (theory lessons; the drills use treble and bass). */
export type Clef = 'treble' | 'bass' | 'alto' | 'tenor'
export type Letter = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
export type Accidental = '' | '#' | 'b'
export type Naming = 'letters' | 'solfege'

export interface Pitch {
  letter: Letter
  accidental: Accidental
  octave: number
}
