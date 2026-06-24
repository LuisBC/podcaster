import { getCached, setCache } from '@/utils/cache'
import { CACHE_TTL_MS } from '@/constants/api'

describe('cache utils', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns null when key does not exist', () => {
    expect(getCached('missing')).toBeNull()
  })

  it('stores and retrieves data', () => {
    setCache('key', { foo: 'bar' })
    expect(getCached<{ foo: string }>('key')).toEqual({ foo: 'bar' })
  })

  it('returns null and removes entry when cache is expired', () => {
    setCache('key', 'value')
    jest.spyOn(Date, 'now').mockReturnValue(Date.now() + CACHE_TTL_MS + 1)
    expect(getCached('key')).toBeNull()
    expect(localStorage.getItem('key')).toBeNull()
  })

  it('returns data when cache is still valid', () => {
    setCache('key', 'value')
    jest.spyOn(Date, 'now').mockReturnValue(Date.now() + CACHE_TTL_MS - 1000)
    expect(getCached('key')).toBe('value')
  })
})
