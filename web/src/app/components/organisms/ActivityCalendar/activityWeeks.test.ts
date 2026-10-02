import { describe, it, expect } from 'vitest'
import { buildWeeks } from './activityWeeks'
import { localDayKey } from '@/progress/progressStore'

const WEEKS = 20

describe('buildWeeks', () => {
  it('always contains today, whatever day of the week it is', () => {
    // Regression: the range was built by counting back from today and then
    // snapping to a Sunday, which shifted the whole grid earlier and dropped
    // today off the end on any day except Sunday.
    for (let offset = 0; offset < 14; offset++) {
      const today = new Date('2026-08-16T12:00:00')
      today.setDate(today.getDate() + offset)
      const keys = buildWeeks(today, WEEKS).flat().map(localDayKey)
      expect(keys, `${today.toDateString()} is missing from its own calendar`)
        .toContain(localDayKey(today))
    }
  })

  it('puts today in the final column', () => {
    const today = new Date('2026-08-26T12:00:00') // a Wednesday
    const columns = buildWeeks(today, WEEKS)
    expect(columns[columns.length - 1].map(localDayKey)).toContain(localDayKey(today))
  })

  it('returns the asked-for number of full weeks, Sunday first', () => {
    const columns = buildWeeks(new Date('2026-08-26T12:00:00'), WEEKS)
    expect(columns).toHaveLength(WEEKS)
    for (const week of columns) {
      expect(week).toHaveLength(7)
      expect(week[0].getDay()).toBe(0)
      expect(week[6].getDay()).toBe(6)
    }
  })

  it('runs consecutively with no gaps or repeats', () => {
    const days = buildWeeks(new Date('2026-08-26T12:00:00'), WEEKS).flat()
    expect(new Set(days.map(localDayKey)).size).toBe(WEEKS * 7)
    for (let i = 1; i < days.length; i++) {
      const gap = (days[i].getTime() - days[i - 1].getTime()) / 86_400_000
      expect(Math.round(gap)).toBe(1)
    }
  })
})
