import { Link } from 'react-router-dom'
import type { PodcastEntry } from '@/types/podcast'
import styles from './PodcastCard.module.css'

interface PodcastCardProps {
  podcast: PodcastEntry
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  const id = podcast.id.attributes['im:id']
  const name = podcast['im:name'].label
  const artist = podcast['im:artist'].label
  const image = podcast['im:image'][2].label

  return (
    <li className={styles.card}>
      <Link to={`/podcast/${id}`} aria-label={`${name} by ${artist}`}>
        <img src={image} alt={`${name} cover`} className={styles.image} />
        <div className={styles.info}>
          <p className={styles.name}>{name}</p>
          <p className={styles.artist}>Author: {artist}</p>
        </div>
      </Link>
    </li>
  )
}
