import { getRange } from '../progress/progressStore'

export function WeekStrip() {
  const days: string[] = []
  for (let i = 6; i >= 0; i--) {
    days.push(new Date(Date.now() - i * 86_400_000).toISOString().slice(0, 10))
  }
  const range = getRange(days[0], days[6])
  const totals = days.map(d => (range[d] ?? []).reduce((sum, s) => sum + s.practiceScore, 0))
  const max = Math.max(...totals, 1)
  return (
    <div className="card">
      <h3>Your week</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 80 }}>
        {days.map((d, i) => (
          <div key={d} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ height: Math.round((totals[i] / max) * 60), background: '#2563eb', borderRadius: 4 }} />
            <small>{'SMTWTFS'[new Date(d).getUTCDay()]}</small>
          </div>
        ))}
      </div>
    </div>
  )
}
