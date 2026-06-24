import { Link } from 'react-router-dom'
import type { Episode } from '@/types/episode'
import { formatDuration } from '@/utils/formatDuration'
import styles from './EpisodeTable.module.css'

interface EpisodeTableProps {
  episodes: Episode[]
  podcastId: string
}

export function EpisodeTable({ episodes, podcastId }: EpisodeTableProps) {
  return (
    <div className={styles.container}>
      <p className={styles.count}>Episodes: {episodes.length}</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Date</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((ep) => (
            <tr key={ep.trackId}>
              <td>
                <Link
                  to={`/podcast/${podcastId}/episode/${ep.trackId}`}
                  aria-label={`Episode: ${ep.trackName}`}
                >
                  {ep.trackName}
                </Link>
              </td>
              <td>{new Date(ep.releaseDate).toLocaleDateString()}</td>
              <td>{formatDuration(ep.trackTimeMillis)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
