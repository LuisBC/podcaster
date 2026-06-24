import { Link } from 'react-router-dom'
import type { PodcastEntry } from '@/types/podcast'
import styles from './PodcastSidebar.module.css'

interface PodcastSidebarProps {
  podcast: PodcastEntry
  podcastId?: string
}

export function PodcastSidebar({ podcast, podcastId }: PodcastSidebarProps) {
  const name = podcast['im:name'].label
  const artist = podcast['im:artist'].label
  const image = podcast['im:image'][2].label
  const summary = podcast.summary?.label ?? ''

  const imageEl = <img src={image} alt={`${name} cover`} className={styles.image} />

  const infoEl = (
    <>
      <p className={styles.name}>{name}</p>
      <p className={styles.artist}>by {artist}</p>
    </>
  )

  return (
    <aside className={styles.sidebar} aria-label="Podcast information">
      {podcastId ? (
        <Link to={`/podcast/${podcastId}`} aria-label={`Go to ${name} podcast detail`}>
          {imageEl}
        </Link>
      ) : (
        imageEl
      )}
      <hr className={styles.divider} />
      {podcastId ? (
        <Link to={`/podcast/${podcastId}`} className={styles.nameLink}>
          {infoEl}
        </Link>
      ) : (
        infoEl
      )}
      <hr className={styles.divider} />
      <p className={styles.descriptionLabel}>Description:</p>
      <p className={styles.description}>{summary}</p>
    </aside>
  )
}
