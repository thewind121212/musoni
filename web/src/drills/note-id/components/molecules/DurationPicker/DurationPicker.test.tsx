import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DurationPicker } from './DurationPicker'
import { CUSTOM_MINUTES_MAX, CUSTOM_MINUTES_MIN, DURATIONS, customOpeningSeconds } from '@/config/constants'
import { t } from '@/test/i18n'

const setup = (durationSec: number) => {
  const onChange = vi.fn()
  render(<DurationPicker durationSec={durationSec} onChange={onChange} t={t} />)
  return onChange
}

describe('DurationPicker', () => {
  it('renders every offered length plus Other, with the current one checked', () => {
    setup(60)
    expect(screen.getAllByRole('radio')).toHaveLength(DURATIONS.length + 1)
    expect(screen.getByRole('radio', { name: '1 min' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Other' })).toHaveAttribute('aria-checked', 'false')
  })

  it('reports an offered length in seconds', async () => {
    const onChange = setup(60)
    await userEvent.click(screen.getByRole('radio', { name: '5 min' }))
    expect(onChange).toHaveBeenCalledWith(300)
  })

  it('hides the stepper while an offered length is chosen', () => {
    setup(120)
    expect(screen.queryByRole('button', { name: 'Longer' })).toBeNull()
  })

  it('opens Other on a length that is not one of the offered ones', async () => {
    const onChange = setup(60)
    await userEvent.click(screen.getByRole('radio', { name: 'Other' }))
    expect(onChange).toHaveBeenCalledWith(customOpeningSeconds(60))
  })

  it('checks Other and shows the stepper for any other length', () => {
    setup(7 * 60)
    expect(screen.getByRole('radio', { name: 'Other' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByText('7 minutes')).toBeInTheDocument()
  })

  it('steps a custom length one minute at a time', async () => {
    const onChange = setup(7 * 60)
    await userEvent.click(screen.getByRole('button', { name: 'Longer' }))
    expect(onChange).toHaveBeenLastCalledWith(8 * 60)
    await userEvent.click(screen.getByRole('button', { name: 'Shorter' }))
    expect(onChange).toHaveBeenLastCalledWith(6 * 60)
  })

  it('stops at the longest custom length', () => {
    setup(CUSTOM_MINUTES_MAX * 60)
    expect(screen.getByRole('button', { name: 'Longer' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Shorter' })).toBeEnabled()
  })

  it('stops at the shortest custom length', () => {
    // 80 s is not an offered length and rounds to the one-minute floor.
    setup(80)
    expect(screen.getByText(`${CUSTOM_MINUTES_MIN} minute`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Shorter' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Longer' })).toBeEnabled()
  })
})
