import { useParams } from 'react-router-dom'
import { usePodcastDetail } from '@/hooks/usePodcastDetail'
import { PodcastSidebar } from '@/components/PodcastSidebar/PodcastSidebar'
import { sanitizeHtml } from '@/utils/sanitize'
import styles from './EpisodeDetailPage.module.css'

export function EpisodeDetailPage() {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>()
  const { podcast, episodes, error } = usePodcastDetail(podcastId!)

  const episode = episodes.find((ep) => String(ep.trackId) === episodeId)

  if (error) return <p role="alert">{error}</p>
  if (!podcast) return null

  return (
    <div className={styles.layout}>
      <PodcastSidebar podcast={podcast} podcastId={podcastId!} />
      {episode ? (
        <article className={styles.detail}>
          <h1 className={styles.title}>{episode.trackName}</h1>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(episode.description) }}
          />
          <audio
            controls
            src={episode.episodeUrl}
            className={styles.player}
            aria-label={`Play episode: ${episode.trackName}`}
          >
            Your browser does not support the audio element.
          </audio>
        </article>
      ) : (
        <p>Episode not found.</p>
      )}
    </div>
  )
}
