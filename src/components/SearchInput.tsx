import { memo } from 'react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  isLoading?: boolean
}

/**
 * Search input component with proper labeling for accessibility
 * Memoized to prevent unnecessary re-renders
 */
export const SearchInput = memo<SearchInputProps>(
  ({ value, onChange, isLoading = false }) => {
    return (
      <div className="relative mb-6">
        <input
          type="text"
          className="w-full py-3 sm:py-4 px-6 pl-12 text-base border-2 focus:outline-none border-gray-700  rounded-lg bg-gray-900/30 text-white transition-all duration-200 hover:border-gray-500  placeholder:text-gray-500 font-mono"
          placeholder="Search GitHub repositories..."
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-label="Search repositories"
        />
        {isLoading ? (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <div className="w-5 h-5 border-2 border-gray-700 border-t-green-400 rounded-full animate-spin" />
          </div>
        ) : (
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

