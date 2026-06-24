import { useState } from 'react'
import { useTopPodcasts } from '@/hooks/useTopPodcasts'
import { PodcastCard } from '@/components/PodcastCard/PodcastCard'
import styles from './MainPage.module.css'

export function MainPage() {
  const { podcasts, error } = useTopPodcasts()
  const [filter, setFilter] = useState('')

  const filtered = podcasts.filter((p) => {
    const term = filter.toLowerCase()
    return (
      p['im:name'].label.toLowerCase().includes(term) ||
      p['im:artist'].label.toLowerCase().includes(term)
    )
  })

  if (error) return <p role="alert">{error}</p>

  return (
    <section className={styles.page}>
      <div className={styles.toolbar}>
        <span className={styles.count} aria-live="polite">
          {filtered.length}
        </span>
        <input
          type="search"
          placeholder="Filter podcasts..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.input}
          aria-label="Filter podcasts by title or author"
        />
      </div>
      <ul className={styles.grid} aria-label="Top 100 podcasts">
        {filtered.map((podcast) => (
          <PodcastCard key={podcast.id.attributes['im:id']} podcast={podcast} />
        ))}
      </ul>
    </section>
  )
}
