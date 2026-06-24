import { useEffect, useState } from 'react'
import { fetchPodcastDetail } from '@/services/podcast'
import { getCached, setCache } from '@/utils/cache'
import { useLoading } from '@/hooks/useLoading'
import { PODCAST_DETAIL_CACHE_KEY } from '@/constants/api'
import { findPodcast } from '@/utils/findPodcast'
import type { PodcastEntry } from '@/types/podcast'
import type { Episode, PodcastDetailResponse } from '@/types/episode'

export function usePodcastDetail(podcastId: string) {
  const [podcast, setPodcast] = useState<PodcastEntry | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [error, setError] = useState<string | null>(null)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setIsLoading(true)
      try {
        const found = await findPodcast(podcastId, controller.signal)
        if (found) setPodcast(found)

        const detailKey = PODCAST_DETAIL_CACHE_KEY(podcastId)
        const cached = getCached<Episode[]>(detailKey)
        if (cached) {
          setEpisodes(cached)
          return
        }

        const data = (await fetchPodcastDetail(
          podcastId,
          controller.signal
        )) as PodcastDetailResponse
        const eps = data.results.filter((r): r is Episode => r.wrapperType === 'podcastEpisode')
        setCache(detailKey, eps)
        setEpisodes(eps)
      } catch (err) {
        if ((err as Error).name === 'AbortError') return
        setError('Error loading podcast detail')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [podcastId, setIsLoading])

  return { podcast, episodes, error }
}
