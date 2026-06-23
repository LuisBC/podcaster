import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Main</div>} />
        <Route path="/podcast/:podcastId" element={<div>Podcast Detail</div>} />
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<div>Episode Detail</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
