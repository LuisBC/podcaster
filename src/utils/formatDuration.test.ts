import { formatDuration } from '@/utils/formatDuration'

describe('formatDuration', () => {
  it('returns 0:00 for 0ms', () => {
    expect(formatDuration(0)).toBe('0:00')
  })

  it('returns 0:00 for NaN', () => {
    expect(formatDuration(NaN)).toBe('0:00')
  })

  it('formats seconds only', () => {
    expect(formatDuration(45000)).toBe('0:45')
  })

  it('formats minutes and seconds', () => {
    expect(formatDuration(90000)).toBe('1:30')
  })

  it('pads seconds with zero', () => {
    expect(formatDuration(61000)).toBe('1:01')
  })

  it('formats hours, minutes and seconds', () => {
    expect(formatDuration(3661000)).toBe('1:01:01')
  })

  it('pads minutes with zero when hours present', () => {
    expect(formatDuration(3605000)).toBe('1:00:05')
  })
})
