import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PodcastCard } from './PodcastCard'
import type { PodcastEntry } from '@/types/podcast'

const mockPodcast: PodcastEntry = {
  'im:name': { label: 'My Podcast' },
  'im:artist': { label: 'Author' },
  'im:image': [
    { label: 'small.jpg', attributes: { height: '55' } },
    { label: 'medium.jpg', attributes: { height: '60' } },
    { label: 'large.jpg', attributes: { height: '170' } },
  ],
  'im:releaseDate': { label: '2021-01-01', attributes: {} },
  'im:price': { label: 'Get', attributes: {} },
  'im:contentType': { attributes: { term: 'Podcast', label: 'Podcast' } },
  title: { label: 'My Podcast' },
  link: { attributes: { rel: 'alternate', type: 'text/html', href: 'https://example.com' } },
  id: { label: 'https://example.com', attributes: { 'im:id': '123456' } },
  category: {
    attributes: { 'im:id': '1310', term: 'Music', scheme: 'https://example.com', label: 'Music' },
  },
}

describe('PodcastCard', () => {
  it('renders the podcast name', () => {
    render(
      <MemoryRouter>
        <PodcastCard podcast={mockPodcast} />
      </MemoryRouter>
    )
    expect(screen.getByText('My Podcast')).toBeInTheDocument()
  })

  it('renders the author name', () => {
    render(
      <MemoryRouter>
        <PodcastCard podcast={mockPodcast} />
      </MemoryRouter>
    )
    expect(screen.getByText('Author: Author')).toBeInTheDocument()
  })

  it('links to the podcast detail page', () => {
    render(
      <MemoryRouter>
        <PodcastCard podcast={mockPodcast} />
      </MemoryRouter>
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/podcast/123456')
  })

  it('renders the podcast cover image', () => {
    render(
      <MemoryRouter>
        <PodcastCard podcast={mockPodcast} />
      </MemoryRouter>
    )
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'large.jpg')
    expect(img).toHaveAttribute('alt', 'My Podcast cover')
  })
})
