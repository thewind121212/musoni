import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NextLessonCard } from './NextLessonCard'

describe('NextLessonCard', () => {
  it('names the next lesson and opens it from one button', () => {
    render(
      <MemoryRouter>
        <NextLessonCard
          eyebrow="Bài đầu tiên" title="Cao độ và tên nốt" line="Bảy tên nốt."
          action={{ label: 'Học · 3 phút', to: '/theory/pitch-staff/pitch-names' }}
        />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Cao độ và tên nốt' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Học · 3 phút' })).toHaveAttribute('href', '/theory/pitch-staff/pitch-names')
  })

  it('has no button once every lesson is done', () => {
    render(<MemoryRouter><NextLessonCard eyebrow="Xong" title="Bạn đã học hết 5 bài" action={null} /></MemoryRouter>)
    expect(screen.queryByRole('link')).toBeNull()
  })
})
