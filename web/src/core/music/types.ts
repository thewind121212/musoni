export type Clef = 'treble' | 'bass'
export type Letter = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B'
export type Accidental = '' | '#' | 'b'
export type Naming = 'letters' | 'solfege'

export interface Pitch {
  letter: Letter
  accidental: Accidental
  octave: number
}
