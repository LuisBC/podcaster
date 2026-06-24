import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header/Header'
import { LoadingBar } from '@/components/LoadingBar/LoadingBar'
import { MainPage } from '@/pages/MainPage/MainPage'
import { PodcastDetailPage } from '@/pages/PodcastDetailPage/PodcastDetailPage'
import { EpisodeDetailPage } from './pages/EpisodeDetailPage/EpisodeDetailPage'

function App() {
  return (
    <BrowserRouter>
      <LoadingBar />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetailPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
