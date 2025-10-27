import { memo } from 'react'

interface EmptyStateProps {
  message: string
  icon?: 'search' | 'bookmark' | 'error'
}

/**
 * Empty state component for various scenarios
 * Memoized to prevent unnecessary re-renders
 */
export const EmptyState = memo<EmptyStateProps>(
  ({ message, icon = 'search' }) => {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center text-gray-500 min-h-72">
        {icon === 'search' && (
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-6 opacity-50"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        )}
        {icon === 'bookmark' && (
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-6 opacity-50"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
        {icon === 'error' && (
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-6 opacity-50"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
        <p className="text-base max-w-sm font-mono">{message}</p>
      </div>
    )
  }
)

EmptyState.displayName = 'EmptyState'

