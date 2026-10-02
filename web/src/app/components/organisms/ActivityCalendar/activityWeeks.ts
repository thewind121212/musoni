/**
 * The columns of the activity calendar: `weeks` consecutive weeks, each running
 * Sunday to Saturday, ending with the week that contains `today`.
 *
 * Anchoring on the current week is the whole point. Counting backwards from
 * today and then snapping to a Sunday moves the range earlier by however many
 * days into the week today happens to be, which can push today out of the grid
 * entirely: on a Wednesday the last column would end three days ago.
 */
export function buildWeeks(today: Date, weeks: number): Date[][] {
  const firstDayOfThisWeek = new Date(today)
  firstDayOfThisWeek.setHours(0, 0, 0, 0)
  firstDayOfThisWeek.setDate(firstDayOfThisWeek.getDate() - firstDayOfThisWeek.getDay())

  const cursor = new Date(firstDayOfThisWeek)
  cursor.setDate(cursor.getDate() - (weeks - 1) * 7)

  const columns: Date[][] = []
  for (let w = 0; w < weeks; w++) {
    const week: Date[] = []
    for (let d = 0; d < 7; d++) {
      week.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    columns.push(week)
  }
  return columns
}
