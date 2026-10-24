import type { Lesson } from '@/theory/types'

/**
 * The chapter review, after the book's homework (35.3): assignment 66 (an
 * additive or subtractive process piece in 7/8 + 6/8 + ...) and 67 (a phase
 * piece, the lower voice rotated one note left until the voices line up).
 */
export default {
  id: 'review',
  kind: 'review',
  title: { vi: 'Ôn chương 36', en: 'Chapter 36 review' },
  minutes: 4,
  sources: [{ section: '35.3', url: 'https://musictheory.pugetsound.edu/mt21c/Minimalism-5.html' }],
  recap: [
    { vi: 'Quá trình cộng thêm và bớt dần', en: 'Additive and subtractive processes' },
    { vi: 'Số chỉ nhịp đổi theo mỗi bước', en: 'Time signatures that change with each stage' },
    { vi: 'Xoay vòng và dịch pha', en: 'Rotation and phase shifting' },
  ],
  steps: [
    {
      kind: 'check',
      prompt: { vi: 'Bước tiếp theo sẽ có mấy nốt móc đơn?', en: 'How many eighth notes will the next stage have?' },
      blocks: [
        { type: 'staff', clef: 'treble', notes: 'G4:8 A4:8 | G4:8 A4:8 C5:8 | G4:8 A4:8 C5:8 D5:8 ||' },
        { type: 'play', notes: 'G4:8 A4:8 G4:8 A4:8 G4:8 A4:8 C5:8 G4:8 A4:8 C5:8 G4:8 A4:8 C5:8 D5:8 G4:8 A4:8 C5:8 D5:8', bpm: 160 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '4', en: '4' } },
          { text: { vi: '5', en: '5' }, correct: true },
          { text: { vi: '8', en: '8' } },
        ],
      },
      reason: {
        vi: 'Đây là quá trình cộng thêm, mỗi bước thêm một nốt: 2, 3, 4, rồi 5.',
        en: 'This is an additive process, one note more each stage: 2, 3, 4, then 5.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Một bài bớt dần đi xuống từ các nhóm 1+2+3+4+5+6. Sau 1+2+3+4 là gì?',
        en: 'A subtractive piece works down from groups 1+2+3+4+5+6. What comes after 1+2+3+4?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '1+2+3+4+5', en: '1+2+3+4+5' } },
          { text: { vi: '2+3+4', en: '2+3+4' } },
          { text: { vi: '1+2+3', en: '1+2+3' }, correct: true },
        ],
      },
      reason: {
        vi: 'Mỗi bước bỏ nhóm cuối, nên 1+2+3+4 mất nhóm 4.',
        en: 'Each stage drops the final group, so 1+2+3+4 loses group 4.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Ô nhịp 7/8 + 6/8 chứa bao nhiêu nốt móc đơn?', en: 'How many eighth notes fill a measure of 7/8 + 6/8?' },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '12', en: '12' } },
          { text: { vi: '13', en: '13' }, correct: true },
          { text: { vi: '14', en: '14' } },
        ],
      },
      reason: {
        vi: 'Bảy nốt móc đơn cộng sáu nốt móc đơn là mười ba.',
        en: 'Seven eighth notes plus six eighth notes make thirteen.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Theo cách của Glass, mẫu này lặp lại nhưng bỏ nốt cuối. Lần lặp mới kết thúc ở nốt nào?',
        en: 'In Glass’s version, this pattern repeats minus its final note. Which note ends the new repetition?',
      },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'F4:8 A4:8 C5:8 E5:8', labels: ['1', '2', '3', '4'] }],
      answer: { type: 'key', note: 'C', blackKeys: '#' },
      reason: {
        vi: 'Lần lặp mới bỏ {E5}, nên nó là {F4} {A4} {C5} và kết thúc ở {C5}.',
        en: 'The new repetition drops {E5}, so it is {F4} {A4} {C5} and ends on {C5}.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bè nào đang xoay vòng?', en: 'Which voice is rotating?' },
      blocks: [
        { type: 'staff', clef: 'treble', time: '5/8', notes: 'D4:8 A4:8 G4:8 C5:8 E4:8', labels: ['1', '2', '3', '4', '5'] },
        { type: 'staff', clef: 'treble', time: '5/8', notes: 'A4:8 G4:8 C5:8 E4:8 D4:8' },
        { type: 'play', notes: 'D4+A4:8 A4+G4:8 G4+C5:8 C5+E4:8 E4+D4:8 D4+A4:8 A4+G4:8 G4+C5:8 C5+E4:8 E4+D4:8', bpm: 150 },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Bè trên', en: 'The upper voice' } },
          { text: { vi: 'Bè dưới', en: 'The lower voice' }, correct: true },
          { text: { vi: 'Cả hai bè', en: 'Both voices' } },
        ],
      },
      reason: {
        vi: 'Bè dưới bắt đầu từ nốt 2 của mẫu, {A4}: nó đã xoay một nốt sang trái.',
        en: 'The lower voice starts on note 2 of the pattern, {A4}: it has rotated one note to the left.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bè dưới xoay mẫu này sang trái ba nốt. Nó bắt đầu bằng nốt nào?', en: 'The lower voice rotates this pattern three notes to the left. Which note does it start on?' },
      blocks: [{ type: 'staff', clef: 'treble', notes: 'D4:8 E4:8 G4:8 B4:8 A4:8', labels: ['1', '2', '3', '4', '5'] }],
      answer: { type: 'key', note: 'B', blackKeys: 'b' },
      reason: {
        vi: 'Xoay ba nốt thì nốt 4, {B4}, lên đầu.',
        en: 'Three rotations put note 4, {B4}, first.',
      },
    },
    {
      kind: 'check',
      prompt: {
        vi: 'Hai bè chơi một mẫu mười hai nốt. Bè dưới xoay bao nhiêu lần thì hai bè lại đồng pha?',
        en: 'Two voices play a twelve-note pattern. How many rotations until the voices line up again?',
      },
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: '6 lần', en: '6' } },
          { text: { vi: '11 lần', en: '11' } },
          { text: { vi: '12 lần', en: '12' }, correct: true },
        ],
      },
      reason: {
        vi: 'Mỗi lần xoay dời một nốt, nên phải xoay đủ mười hai lần mẫu mới về như cũ.',
        en: 'Each rotation moves one note, so it takes all twelve to bring the pattern back to the start.',
      },
    },
    {
      kind: 'check',
      prompt: { vi: 'Bạn nghe thấy quá trình nào?', en: 'Which process do you hear?' },
      blocks: [
        {
          type: 'play',
          notes: 'C4:8 E4:8 A4:8 G4:8 C4:8 E4:8 A4:8 G4:8 C4+E4:8 E4+A4:8 A4+G4:8 G4+C4:8 C4+E4:8 E4+A4:8 A4+G4:8 G4+C4:8 C4+A4:8 E4+G4:8 A4+C4:8 G4+E4:8 C4+A4:8 E4+G4:8 A4+C4:8 G4+E4:8',
          bpm: 150,
        },
      ],
      answer: {
        type: 'choice',
        choices: [
          { text: { vi: 'Cộng thêm', en: 'Additive' } },
          { text: { vi: 'Bớt dần', en: 'Subtractive' } },
          { text: { vi: 'Dịch pha', en: 'Phase shifting' }, correct: true },
        ],
      },
      reason: {
        vi: 'Độ dài mẫu không đổi, nhưng bè thứ hai cứ lệch thêm một nốt so với bè đầu: đó là dịch pha.',
        en: 'The pattern stays the same length, but a second voice moves one more note away from the first: that is phase shifting.',
      },
    },
  ],
} satisfies Lesson
