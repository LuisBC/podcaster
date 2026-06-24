export interface PodcastInfo {
  wrapperType: 'track'
  kind: 'podcast'
  collectionId: number
  trackId: number
  artistName: string
  collectionName: string
  artworkUrl60: string
  artworkUrl100: string
  artworkUrl600: string
  trackCount: number
  primaryGenreName: string
  feedUrl: string
  releaseDate: string
}

export interface Episode {
  wrapperType: 'podcastEpisode'
  kind: 'podcast-episode'
  trackId: number
  trackName: string
  description: string
  shortDescription?: string
  episodeUrl: string
  previewUrl: string
  releaseDate: string
  trackTimeMillis: number
  episodeContentType: string
  collectionId: number
  collectionName: string
  artworkUrl60?: string
  artworkUrl160?: string
  artworkUrl600?: string
}

export type LookupResult = PodcastInfo | Episode

export interface PodcastDetailResponse {
  resultCount: number
  results: LookupResult[]
}
