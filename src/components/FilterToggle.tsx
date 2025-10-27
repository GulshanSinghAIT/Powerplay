import { memo } from 'react'
import { FilterMode } from '../types'

interface FilterToggleProps {
  mode: FilterMode
  onModeChange: (mode: FilterMode) => void
  bookmarkCount: number
}

/**
 * Toggle component to filter between all repos and bookmarked only
 * Memoized to prevent unnecessary re-renders
 */
export const FilterToggle = memo<FilterToggleProps>(
  ({ mode, onModeChange, bookmarkCount }) => {
    return (
      <div className="flex gap-2 bg-gray-900/30 p-1 rounded-md w-fit border border-gray-700 border-dashed">
        <button
          className={`px-6 py-2 text-sm font-medium rounded-sm transition-all duration-200 font-mono ${
            mode === 'all'
              ? 'bg-green-400 text-black'
              : 'text-gray-400 hover:bg-gray-900 hover:text-white'
          }`}
          onClick={() => onModeChange('all')}
          aria-pressed={mode === 'all'}
        >
          ALL
        </button>
        <button
          className={`px-6 py-2 text-sm font-medium rounded-sm transition-all duration-200 font-mono ${
            mode === 'bookmarked'
              ? 'bg-green-400 text-black'
              : 'text-gray-400 hover:bg-gray-900 hover:text-white'
          }`}
          onClick={() => onModeChange('bookmarked')}
          aria-pressed={mode === 'bookmarked'}
        >
          BOOKMARKED ({bookmarkCount})
        </button>
      </div>
    )
  }
)

FilterToggle.displayName = 'FilterToggle'

