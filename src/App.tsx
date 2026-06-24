import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header/Header'
import { LoadingBar } from '@/components/LoadingBar/LoadingBar'

const MainPage = lazy(() =>
  import('@/pages/MainPage/MainPage').then((m) => ({ default: m.MainPage }))
)
const PodcastDetailPage = lazy(() =>
  import('@/pages/PodcastDetailPage/PodcastDetailPage').then((m) => ({
    default: m.PodcastDetailPage,
  }))
)
const EpisodeDetailPage = lazy(() =>
  import('@/pages/EpisodeDetailPage/EpisodeDetailPage').then((m) => ({
    default: m.EpisodeDetailPage,
  }))
)

function App() {
  return (
    <BrowserRouter>
      <LoadingBar />
      <Header />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetailPage />} />
            <Route path="*" element={<p>Page not found</p>} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  )
}

export default App
