interface ImageItem {
  label: string
  attributes: { height: string }
}

interface LabelValue {
  label: string
}

interface AttributedLabel {
  label: string
  attributes?: Record<string, string>
}

export interface PodcastEntry {
  'im:name': LabelValue
  'im:artist': { label: string; attributes?: { href: string } }
  'im:image': [ImageItem, ImageItem, ImageItem]
  'im:releaseDate': AttributedLabel
  'im:price': AttributedLabel
  'im:contentType': { attributes: { term: string; label: string } }
  summary?: LabelValue
  title: LabelValue
  link: { attributes: { rel: string; type: string; href: string } }
  id: { label: string; attributes: { 'im:id': string } }
  category: { attributes: { 'im:id': string; term: string; scheme: string; label: string } }
  rights?: LabelValue
}

export interface TopPodcastsResponse {
  feed: {
    entry: PodcastEntry[]
    updated: LabelValue
    title: LabelValue
  }
}
