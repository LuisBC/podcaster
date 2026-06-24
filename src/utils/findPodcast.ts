import { fetchTopPodcasts } from '@/services/podcast'
import { getCached, setCache } from '@/utils/cache'
import { TOP_PODCASTS_CACHE_KEY } from '@/constants/api'
import type { PodcastEntry } from '@/types/podcast'

export async function findPodcast(
  podcastId: string,
  signal?: AbortSignal
): Promise<PodcastEntry | null> {
  const cached = getCached<PodcastEntry[]>(TOP_PODCASTS_CACHE_KEY)
  const list = cached ?? (await fetchTopPodcasts(signal)).feed.entry
  if (!cached) setCache(TOP_PODCASTS_CACHE_KEY, list)
  return list.find((p) => p.id.attributes['im:id'] === podcastId) ?? null
}
