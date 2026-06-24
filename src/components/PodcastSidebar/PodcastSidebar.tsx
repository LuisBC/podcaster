import type { PodcastEntry } from '@/types/podcast'
import styles from './PodcastSidebar.module.css'

interface PodcastSidebarProps {
  podcast: PodcastEntry
}

export function PodcastSidebar({ podcast }: PodcastSidebarProps) {
  const name = podcast['im:name'].label
  const artist = podcast['im:artist'].label
  const image = podcast['im:image'][2].label
  const summary = podcast.summary?.label ?? ''

  return (
    <aside className={styles.sidebar} aria-label="Podcast information">
      <img src={image} alt={`${name} cover`} className={styles.image} />
      <hr className={styles.divider} />
      <p className={styles.name}>{name}</p>
      <p className={styles.artist}>by {artist}</p>
      <hr className={styles.divider} />
      <p className={styles.descriptionLabel}>Description:</p>
      <p className={styles.description}>{summary}</p>
    </aside>
  )
}
