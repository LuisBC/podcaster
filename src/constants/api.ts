export const CACHE_TTL_MS = 24 * 60 * 60 * 1000

export const TOP_PODCASTS_CACHE_KEY = 'top_podcasts'
export const PODCAST_DETAIL_CACHE_KEY = (id: string) => `podcast_${id}`

const PROXY_BASE = 'https://api.allorigins.win/get?url='

const TOP_PODCASTS_ENDPOINT =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

const PODCAST_DETAIL_ENDPOINT = (id: string) =>
  `https://itunes.apple.com/lookup?media=podcast&entity=podcastEpisode&id=${id}`

export const TOP_PODCASTS_URL = `${PROXY_BASE}${encodeURIComponent(TOP_PODCASTS_ENDPOINT)}`

export const PODCAST_DETAIL_URL = (id: string) =>
  `${PROXY_BASE}${encodeURIComponent(PODCAST_DETAIL_ENDPOINT(id))}`
