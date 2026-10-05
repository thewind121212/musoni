import { beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { TheoryAbout } from './TheoryAbout'
import { resetStores } from '@/test/fixtures'

beforeEach(() => resetStores({ lang: 'en' }))

describe('TheoryAbout', () => {
  it('gives the GFDL notice: the original, our Modified Version, the history and the licence text', () => {
    render(<MemoryRouter><TheoryAbout /></MemoryRouter>)
    expect(screen.getAllByText('Music Theory for the 21st-Century Classroom').length).toBeGreaterThan(0)
    expect(screen.getByText(/Copyright © 2017 Robert Hutchinson/)).toBeInTheDocument()
    expect(screen.getByText(/version 1\.2 or any later version/)).toBeInTheDocument()
    expect(screen.getByText(/Modified Version.*version 1\.3, with no Invariant Sections added/)).toBeInTheDocument()
    expect(screen.getByText(/adapted and translated by the Musoni project/)).toBeInTheDocument()
    expect(screen.getByText(/Chapter 1 · Pitch and the staff/)).toHaveTextContent('1.1, 1.2, 1.3, 1.6')
    expect(screen.getByRole('link', { name: /Read the licence/ })).toHaveAttribute('href', '/licenses/gfdl-1.3.txt')
  })

  it('never names the app after the book', () => {
    resetStores({ lang: 'vi' })
    render(<MemoryRouter><TheoryAbout /></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Về nội dung')
    expect(screen.getByText(/Lý thuyết âm nhạc Musoni/)).toBeInTheDocument()
  })
})
