import type { ReactNode } from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { DrillCard } from './DrillCard'

function Drill() {
  const state = useLocation().state as { autostart?: boolean; setup?: boolean } | null
  return <p>{state?.autostart ? 'session' : state?.setup ? 'setup' : 'nothing'}</p>
}

const at = (card: ReactNode) => render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={card} />
      <Route path="/train/x" element={<Drill />} />
    </Routes>
  </MemoryRouter>,
)

describe('DrillCard', () => {
  it('shows a drill not played yet with its chip and no figures, and opens its setup', async () => {
    at(<DrillCard icon={<svg />} title="Đọc nốt nhạc" description="Gọi tên nốt" to="/train/x" toState={{ setup: true }} chip={{ label: 'Chưa tập' }} />)
    expect(screen.getByText('Chưa tập')).toBeInTheDocument()
    expect(screen.getByText('Gọi tên nốt')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('link', { name: 'Đọc nốt nhạc' }))
    expect(screen.getByText('setup')).toBeInTheDocument()
  })

  it('shows a played drill with its figures instead of the line, and starts a session from its button', async () => {
    at(
      <DrillCard
        icon={<svg />} title="Đọc nốt nhạc" description="Gọi tên nốt" to="/train/x" toState={{ setup: true }}
        stats={[{ icon: null, label: 'Cao nhất', value: '42' }]}
        action={{ label: 'Luyện', to: '/train/x', state: { autostart: true } }}
      />,
    )
    expect(screen.getByText('42')).toBeInTheDocument()
    expect(screen.queryByText('Gọi tên nốt')).toBeNull()
    await userEvent.click(screen.getByRole('link', { name: 'Luyện' }))
    expect(screen.getByText('session')).toBeInTheDocument()
  })
})
