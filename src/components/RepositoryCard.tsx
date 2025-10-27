import { memo } from 'react'
import type { Repository } from '../types'

interface RepositoryCardProps {
  repository: Repository
  isBookmarked: boolean
  onToggleBookmark: (repository: Repository) => void
}

/**
 * Repository card component displaying repo information
 * Memoized with custom comparison to prevent unnecessary re-renders
 */
export const RepositoryCard = memo<RepositoryCardProps>(
  ({ repository, isBookmarked, onToggleBookmark }) => {
    const {
      full_name,
      description,
      html_url,
      stargazers_count,
      language,
      owner,
    } = repository

    const handleBookmarkClick = (e: React.MouseEvent) => {
      e.preventDefault()
      onToggleBookmark(repository)
    }

    return (
      <article className="bg-gray-900/30 shrink border  border-dashed border-gray-700 rounded-lg p-4 md:p-6 transition-all duration-200 hover:shadow-lg hover:border-green-400 hover:shadow-green-400/10">
        <div className="flex gap-4 mb-4 flex-wrap">
          <img
            src={owner.avatar_url}
            alt={`${owner.login} avatar`}
            className="w-12 h-12 rounded-md shrink border border-border"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <a
              href={html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-green-400 block mb-1 break-words hover:underline font-mono"
            >
              {full_name}
            </a>
            <p className="text-sm text-gray-300 leading-relaxed overflow-hidden font-mono" style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>
              {description || 'No description provided'}
            </p>
          </div>
          <button
            className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200 hover:bg-gray-800 hover:scale-105 order-first md:order-none ml-auto md:ml-0 ${
              isBookmarked ? 'text-yellow-400' : 'text-gray-500'
            }`}
            onClick={handleBookmarkClick}
            aria-label={
              isBookmarked ? 'Remove bookmark' : 'Add bookmark'
            }
            title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isBookmarked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        </div>

        <div className="flex gap-6 items-center text-sm text-gray-300 flex-wrap font-mono">
          {language && (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400" />
              {language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="text-yellow-400"
            >
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
            </svg>
            {stargazers_count.toLocaleString()}
          </span>
        </div>
      </article>
    )
  },
  // Custom comparison function for better performance
  (prevProps, nextProps) => {
    return (
      prevProps.repository.id === nextProps.repository.id &&
      prevProps.isBookmarked === nextProps.isBookmarked
    )
  }
)

RepositoryCard.displayName = 'RepositoryCard'

