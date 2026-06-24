import { useLoading } from '@/hooks/useLoading'
import styles from './LoadingBar.module.css'

export function LoadingBar() {
  const { isLoading } = useLoading()

  if (!isLoading) return null

  return (
    <div role="status" aria-live="polite" aria-label="Loading content" className={styles.bar} />
  )
}
