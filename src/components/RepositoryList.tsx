import { memo } from 'react'
import { Repository } from '../types'
import { RepositoryCard } from './RepositoryCard'

interface RepositoryListProps {
  repositories: Repository[]
  isBookmarked: (id: number) => boolean
  onToggleBookmark: (repository: Repository) => void
}

/**
 * List component for repositories
 * Memoized to prevent unnecessary re-renders
 */
export const RepositoryList = memo<RepositoryListProps>(
  ({ repositories, isBookmarked, onToggleBookmark }) => {
    return (
      <div className="grid gap-6">
        {repositories.map(repo => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            isBookmarked={isBookmarked(repo.id)}
            onToggleBookmark={onToggleBookmark}
          />
        ))}
      </div>
    )
  }
)

RepositoryList.displayName = 'RepositoryList'

