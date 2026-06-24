import { useParams } from 'react-router-dom'
import { usePodcastDetail } from '@/hooks/usePodcastDetail'
import { PodcastSidebar } from '@/components/PodcastSidebar/PodcastSidebar'
import { EpisodeTable } from '@/components/EpisodeTable/EpisodeTable'
import styles from './PodcastDetailPage.module.css'

export function PodcastDetailPage() {
  const { podcastId } = useParams<{ podcastId: string }>()
  const { podcast, episodes, error } = usePodcastDetail(podcastId!)

  if (error) return <p role="alert">{error}</p>
  if (!podcast) return null

  return (
    <div className={styles.layout}>
      <PodcastSidebar podcast={podcast} />
      <EpisodeTable episodes={episodes} podcastId={podcastId!} />
    </div>
  )
}
