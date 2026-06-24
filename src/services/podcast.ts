import { TOP_PODCASTS_URL, PODCAST_DETAIL_URL } from '@/constants/api'
import type { TopPodcastsResponse } from '@/types/podcast'

interface ProxyResponse {
  contents: string
}

export async function fetchTopPodcasts(signal?: AbortSignal): Promise<TopPodcastsResponse> {
  const res = await fetch(TOP_PODCASTS_URL, { signal })
  if (!res.ok) throw new Error('Failed to fetch top podcasts')
  const json: ProxyResponse = await res.json()
  return JSON.parse(json.contents) as TopPodcastsResponse
}

export async function fetchPodcastDetail(id: string, signal?: AbortSignal): Promise<unknown> {
  const res = await fetch(PODCAST_DETAIL_URL(id), { signal })
  if (!res.ok) throw new Error(`Failed to fetch podcast ${id}`)
  const json: ProxyResponse = await res.json()
  return JSON.parse(json.contents)
}
