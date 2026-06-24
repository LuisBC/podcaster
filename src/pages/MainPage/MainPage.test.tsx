import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { MainPage } from './MainPage'
import { LoadingProvider } from '@/providers/LoadingProvider'
import type { PodcastEntry } from '@/types/podcast'

function makePodcast(id: string, name: string, artist: string): PodcastEntry {
  return {
    'im:name': { label: name },
    'im:artist': { label: artist },
    'im:image': [
      { label: 'small.jpg', attributes: { height: '55' } },
      { label: 'medium.jpg', attributes: { height: '60' } },
      { label: 'large.jpg', attributes: { height: '170' } },
    ],
    'im:releaseDate': { label: '2021-01-01', attributes: {} },
    'im:price': { label: 'Get', attributes: {} },
    'im:contentType': { attributes: { term: 'Podcast', label: 'Podcast' } },
    title: { label: name },
    link: { attributes: { rel: 'alternate', type: 'text/html', href: 'https://example.com' } },
    id: { label: 'https://example.com', attributes: { 'im:id': id } },
    category: {
      attributes: {
        'im:id': '1310',
        term: 'Music',
        scheme: 'https://example.com',
        label: 'Music',
      },
    },
  }
}

const mockPodcasts = [
  makePodcast('1', 'The Joe Rogan Experience', 'Joe Rogan'),
  makePodcast('2', 'Serial', 'Sarah Koenig'),
]

let fetchMock: jest.MockedFunction<typeof fetch>

beforeEach(() => {
  fetchMock = jest.fn()
  globalThis.fetch = fetchMock
  localStorage.clear()
})

afterEach(() => {
  fetchMock.mockReset()
})

function mockFetchSuccess() {
  const data = { contents: JSON.stringify({ feed: { entry: mockPodcasts } }) }
  fetchMock.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response)
}

function renderMainPage() {
  return render(
    <MemoryRouter>
      <LoadingProvider>
        <MainPage />
      </LoadingProvider>
    </MemoryRouter>
  )
}

describe('MainPage', () => {
  it('renders the podcast list after fetch', async () => {
    mockFetchSuccess()
    renderMainPage()
    await waitFor(() => {
      expect(screen.getByText('The Joe Rogan Experience')).toBeInTheDocument()
      expect(screen.getByText('Serial')).toBeInTheDocument()
    })
  })

  it('shows the podcast count', async () => {
    mockFetchSuccess()
    renderMainPage()
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  it('filters podcasts by title', async () => {
    mockFetchSuccess()
    renderMainPage()
    await waitFor(() => screen.getByText('The Joe Rogan Experience'))

    await userEvent.type(screen.getByRole('searchbox'), 'serial')

    expect(screen.getByText('Serial')).toBeInTheDocument()
    expect(screen.queryByText('The Joe Rogan Experience')).not.toBeInTheDocument()
  })

  it('filters podcasts by author', async () => {
    mockFetchSuccess()
    renderMainPage()
    await waitFor(() => screen.getByText('The Joe Rogan Experience'))

    await userEvent.type(screen.getByRole('searchbox'), 'joe rogan')

    expect(screen.getByText('The Joe Rogan Experience')).toBeInTheDocument()
    expect(screen.queryByText('Serial')).not.toBeInTheDocument()
  })

  it('shows error message when fetch fails', async () => {
    fetchMock.mockRejectedValue(new Error('Network error'))
    renderMainPage()
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })
})
