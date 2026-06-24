import { sanitizeHtml } from '@/utils/sanitize'

describe('sanitizeHtml', () => {
  it('returns empty string for empty input', () => {
    expect(sanitizeHtml('')).toBe('')
  })

  it('allows safe HTML tags', () => {
    const result = sanitizeHtml('<p>Hello <strong>world</strong></p>')
    expect(result).toContain('<p>')
    expect(result).toContain('<strong>')
  })

  it('removes script tags', () => {
    const result = sanitizeHtml('<script>alert("xss")</script><p>safe</p>')
    expect(result).not.toContain('<script>')
    expect(result).toContain('<p>safe</p>')
  })

  it('removes event handlers', () => {
    const result = sanitizeHtml('<p onclick="alert(1)">click me</p>')
    expect(result).not.toContain('onclick')
  })

  it('removes javascript: URLs', () => {
    const result = sanitizeHtml('<a href="javascript:alert(1)">click</a>')
    expect(result).not.toContain('javascript:')
  })
})
