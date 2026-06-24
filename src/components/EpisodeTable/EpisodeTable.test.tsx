import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { EpisodeTable } from './EpisodeTable'
import type { Episode } from '@/types/episode'

const mockEpisodes: Episode[] = [
  {
    wrapperType: 'podcastEpisode',
    kind: 'podcast-episode',
    trackId: 1,
    trackName: 'Episode One',
    description: 'First episode',
    episodeUrl: 'https://example.com/ep1.mp3',
    previewUrl: 'https://example.com/ep1.mp3',
    releaseDate: '2024-01-15T00:00:00Z',
    trackTimeMillis: 3661000,
    episodeContentType: 'audio',
    collectionId: 42,
    collectionName: 'My Podcast',
  },
  {
    wrapperType: 'podcastEpisode',
    kind: 'podcast-episode',
    trackId: 2,
    trackName: 'Episode Two',
    description: 'Second episode',
    episodeUrl: 'https://example.com/ep2.mp3',
    previewUrl: 'https://example.com/ep2.mp3',
    releaseDate: '2024-02-20T00:00:00Z',
    trackTimeMillis: 125000,
    episodeContentType: 'audio',
    collectionId: 42,
    collectionName: 'My Podcast',
  },
]

function renderTable(episodes = mockEpisodes, podcastId = '42') {
  return render(
    <MemoryRouter>
      <EpisodeTable episodes={episodes} podcastId={podcastId} />
    </MemoryRouter>
  )
}

describe('EpisodeTable', () => {
  it('renders the episode count', () => {
    renderTable()
    expect(screen.getByText('Episodes: 2')).toBeInTheDocument()
  })

  it('renders a row for each episode', () => {
    renderTable()
    expect(screen.getByText('Episode One')).toBeInTheDocument()
    expect(screen.getByText('Episode Two')).toBeInTheDocument()
  })

  it('links each episode to the correct URL', () => {
    renderTable()
    const link = screen.getByRole('link', { name: /Episode: Episode One/i })
    expect(link).toHaveAttribute('href', '/podcast/42/episode/1')
  })

  it('formats duration correctly', () => {
    renderTable()
    // 3661000ms → 1:01:01, 125000ms → 2:05
    expect(screen.getByText('1:01:01')).toBeInTheDocument()
    expect(screen.getByText('2:05')).toBeInTheDocument()
  })

  it('shows count zero when no episodes', () => {
    renderTable([])
    expect(screen.getByText('Episodes: 0')).toBeInTheDocument()
  })
})
