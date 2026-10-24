import type { Lesson } from '@/theory/types'

/** Book 26.3-26.6: objectionable parallels, voice ranges, rules of melody, rules of spacing. */
export default {
  id: 'voice-rules',
  title: { vi: 'Song song, âm vực và khoảng cách', en: 'Parallels, ranges and spacing' },
  minutes: 5,
  sources: [
    { section: '26.3', url: 'https://musictheory.pugetsound.edu/mt21c/ObjectionableParallels.html' },
    { section: '26.4', url: 'https://musictheory.pugetsound.edu/mt21c/VoiceRanges.html' },
    { section: '26.5', url: 'https://musictheory.pugetsound.edu/mt21c/RulesOfMelody.html' },
    { section: '26.6', url: 'https://musictheory.pugetsound.edu/mt21c/RulesOfSpacing.html' },
  ],
  recap: [
    { vi: 'Tránh quãng 5 và quãng 8 song song giữa hai bè bất kỳ', en: 'Avoid parallel fifths and octaves between any two voices' },
    { vi: 'Mỗi bè ở trong âm vực của nó', en: 'Keep each voice within its range' },
    { vi: 'Nốt khuynh hướng giải quyết; tránh quãng tăng; sau bước nhảy lớn thì đổi hướng', en: 'Resolve tendency tones; avoid augmented intervals; change direction after a large leap' },
    { vi: 'Soprano–alto và alto–tenor cách nhau không quá một quãng 8', en: 'Soprano–alto and alto–tenor stay within an octave' },
  ],
  steps: [
    {
      kind: 'explain',
      title: { vi: 'Quãng song song cần tránh', en: 'Objectionable parallels' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Khi viết ba hay bốn bè, đừng để hai bè nào đi **quãng 5 song song** (parallel fifths) hay **quãng 8 song song** (parallel octaves), kể cả quãng 12 và quãng đồng âm song song. Từ thời Phục hưng đến thời Lãng mạn, chúng bị coi là làm mất sự độc lập của các bè.',
            en: 'In three or four parts, never let two voices move in **parallel fifths** or **parallel octaves**, nor their octave equivalents, parallel twelfths and unisons. From the Renaissance to the Romantic era they were thought to destroy the independence of the voices.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Quãng 3, quãng 4 và quãng 6 song song thì được. Quãng 2 và quãng 7 song song thường không dùng.',
            en: 'Parallel 3rds, 4ths and 6ths are fine. Parallel 2nds and 7ths are generally not used.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'C4+G4 D4+A4 | C4+C5 D4+D5 ||', labels: ['5', '5', '8', '8'] },
        { type: 'play', notes: 'C4+G4:h D4+A4:h C4+C5:h D4+D5:h', label: { vi: 'Nghe quãng 5 rồi quãng 8 song song', en: 'Hear parallel fifths, then octaves' } },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hai hợp âm này mắc lỗi gì?', en: 'What is wrong with these two chords?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'C3+G3+E4+C5 D3+A3+F4+D5' },
        { type: 'play', notes: 'C3+G3+E4+C5:h D3+A3+F4+D5:h' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Quãng 6 song song', en: 'Parallel sixths' } },
          { text: { vi: 'Quãng 5 và quãng 8 song song', en: 'Parallel fifths and octaves' }, correct: true },
          { text: { vi: 'Không có lỗi', en: 'Nothing is wrong' } },
        ],
      },
      reason: {
        vi: 'Bass–tenor đi từ quãng 5 sang quãng 5, bass–soprano từ quãng 8 sang quãng 8; quãng 6 song song giữa alto và soprano thì được.',
        en: 'Bass and tenor move fifth to fifth and bass and soprano octave to octave; the parallel sixths between alto and soprano are fine.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Âm vực của bốn bè', en: 'Voice ranges' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Mỗi bè có một **âm vực** (range), dựa trên các bài hợp xướng của Bach: soprano {C4}–{G5}, alto {G3}–{D5}, tenor {C3}–{G4}, bass {E2}–{C4}.',
            en: 'Each voice has a **range**, based on those most common in Bach’s chorales: soprano {C4}–{G5}, alto {G3}–{D5}, tenor {C3}–{G4}, bass {E2}–{C4}.',
          },
        },
        {
          type: 'staff',
          clef: 'grand',
          notes: 'C4 G5 | G3@t D5 | C3 G4@b | E2 C4@b ||',
          labels: ['S', 'S', 'A', 'A', 'T', 'T', 'B', 'B'],
        },
        { type: 'play', notes: 'C4 G5 G3 D5 C3 G4 E2 C4' },
      ],
    },
    {
      kind: 'explain',
      title: { vi: 'Quy tắc giai điệu', en: 'Rules of melody' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Mỗi bè là một giai điệu, nên phải dễ hát. Các **nốt khuynh hướng** (tendency tones) phải giải quyết: bậc 7 lên bậc 8, bậc 4 xuống bậc 3, bậc 6 và bậc 2 đi xuống liền bậc.',
            en: 'Each part is a melody, so it must be singable. **Tendency tones** should resolve: 7 goes to 8, 4 goes to 3, and 6 and 2 both resolve down by step.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Tránh quãng tăng. Sau bước nhảy lớn hơn quãng 4, hay nhảy một quãng giảm, hãy đổi hướng. Hai bước nhảy liền nhau nên rải một hợp âm ba.',
            en: 'Avoid augmented intervals. After a leap larger than a 4th, or a leap of a diminished interval, change direction. Consecutive leaps should outline a triad.',
          },
        },
        { type: 'staff', clef: 'treble', notes: 'B4 C5 | F4 E4 | C4 A4 G4 | C4 E4 G4 ||', labels: ['7', '8', '4', '3', '', '', '', '', '', ''] },
        { type: 'play', notes: 'B4 C5 F4 E4 C4 A4 G4 C4 E4 G4' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Ở giọng {G} trưởng, cảm âm {F#} trong một bè thường đi đến nốt nào?', en: 'In {G} major, where does the leading tone, {F#}, usually go in a voice?' },
      answer: { type: 'key', note: 'G', blackKeys: '#' },
      reason: {
        vi: 'Cảm âm là bậc 7, một nốt khuynh hướng: nó đi lên bậc 8, {G}.',
        en: 'The leading tone is scale degree 7, a tendency tone: it goes up to 8, {G}.',
      },
    },
    {
      kind: 'explain',
      title: { vi: 'Khoảng cách giữa các bè', en: 'Spacing' },
      blocks: [
        {
          type: 'text',
          text: {
            vi: 'Ba bè trên thường đứng gần nhau. Quy tắc về **khoảng cách giữa các bè** (spacing): soprano–alto và alto–tenor cách nhau không quá một quãng 8; tenor–bass có thể xa hơn.',
            en: 'The three upper voices are usually kept close together. The rule of **spacing**: soprano to alto and alto to tenor stay within an octave; tenor to bass may be wider.',
          },
        },
        {
          type: 'text',
          text: {
            vi: 'Như chuỗi bồi âm, khoảng rộng nằm ở dưới và khoảng hẹp ở trên thì hợp âm vang hơn. Hợp âm 2 có soprano cách alto quá một quãng 8: lỗi khoảng cách.',
            en: 'As in the overtone series, wider spaces low and closer ones high make a chord ring better. Chord 2 has more than an octave between soprano and alto: a spacing error.',
          },
        },
        { type: 'staff', clef: 'grand', notes: 'C3+G3+E4+C5 C3+C4@b+E4+G5', labels: ['1', '2'], highlight: [1] },
        { type: 'play', notes: 'C3+G3+E4+C5:h C3+C4+E4+G5:h' },
      ],
    },
    {
      kind: 'check',
      prompt: { vi: 'Hợp âm nào có lỗi khoảng cách?', en: 'Which chord has a spacing error?' },
      blocks: [
        { type: 'staff', clef: 'grand', notes: 'C3+C4@b+G4+E5 C3+G3+C5+E5 C3+E3+C4+G4', labels: ['1', '2', '3'] },
        { type: 'play', notes: 'C3+C4+G4+E5 C3+G3+C5+E5 C3+E3+C4+G4' },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Hợp âm 1', en: 'Chord 1' } },
          { text: { vi: 'Hợp âm 2', en: 'Chord 2' }, correct: true },
          { text: { vi: 'Hợp âm 3', en: 'Chord 3' } },
        ],
      },
      reason: {
        vi: 'Ở hợp âm 2, tenor {G3} cách alto {C5} một quãng 11, quá một quãng 8.',
        en: 'In chord 2, the tenor {G3} is an 11th below the alto {C5}, more than an octave.',
      },
    },
  ],
} satisfies Lesson
