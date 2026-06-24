import { CACHE_TTL_MS } from '@/constants/api'

interface CacheEntry<T> {
  data: T
  timestamp: number
}

export function getCached<T>(key: string): T | null {
  const raw = localStorage.getItem(key)
  if (!raw) return null

  const entry: CacheEntry<T> = JSON.parse(raw)
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    localStorage.removeItem(key)
    return null
  }

  return entry.data
}

export function setCache<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { data, timestamp: Date.now() }
  localStorage.setItem(key, JSON.stringify(entry))
}
