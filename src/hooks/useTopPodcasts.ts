import { useEffect, useState } from 'react'
import { fetchTopPodcasts } from '@/services/podcast'
import { getCached, setCache } from '@/utils/cache'
import { useLoading } from '@/hooks/useLoading'
import { TOP_PODCASTS_CACHE_KEY } from '@/constants/api'
import type { PodcastEntry } from '@/types/podcast'

export function useTopPodcasts() {
  const [podcasts, setPodcasts] = useState<PodcastEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      const cached = getCached<PodcastEntry[]>(TOP_PODCASTS_CACHE_KEY)
      if (cached) {
        setPodcasts(cached)
        return
      }

      setIsLoading(true)
      try {
        const data = await fetchTopPodcasts(controller.signal)
        const entries = data.feed.entry
        setCache(TOP_PODCASTS_CACHE_KEY, entries)
        setPodcasts(entries)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setError('Error loading podcasts')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [setIsLoading])

  return { podcasts, error }
}
