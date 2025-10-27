import { useState, useEffect, useCallback, useMemo } from 'react'
import { Repository, FilterMode } from './types'
import { searchRepositories } from './services/github'
import { useDebounce } from './hooks/useDebounce'
import { useBookmarks } from './hooks/useBookmarks'
import { SearchInput } from './components/SearchInput'
import { FilterToggle } from './components/FilterToggle'
import { RepositoryList } from './components/RepositoryList'
import { LoadingSpinner } from './components/LoadingSpinner'
import { EmptyState } from './components/EmptyState'
import './index.css'
function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filterMode, setFilterMode] = useState<FilterMode>('all')
  const { bookmarkedRepositories, toggleBookmark, isBookmarked } = useBookmarks()
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Fetch repositories when debounced search query changes
  useEffect(() => {
    const fetchRepositories = async () => {
      if (!debouncedSearchQuery.trim()) {
        setRepositories([])
        setError(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const data = await searchRepositories(debouncedSearchQuery)
        setRepositories(data.items)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch repositories'
        )
        setRepositories([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [debouncedSearchQuery])

  // Memoized filtered repositories based on filter mode
  const filteredRepositories = useMemo(() => {
    if (filterMode === 'bookmarked') {
      // Show all bookmarked repositories regardless of current search
      return bookmarkedRepositories
    }
    return repositories
  }, [repositories, filterMode, bookmarkedRepositories])

  // Memoized callback for search input change
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  // Memoized callback for filter mode change
  const handleFilterModeChange = useCallback((mode: FilterMode) => {
    setFilterMode(mode)
  }, [])

  // Render empty state for bookmarked filter with no bookmarks
  const shouldShowBookmarkedEmpty =
    filterMode === 'bookmarked' &&
    !isLoading &&
    filteredRepositories.length === 0 &&
    repositories.length > 0

  // Render empty state for search with no results
  const shouldShowSearchEmpty =
    !isLoading &&
    debouncedSearchQuery.trim() !== '' &&
    repositories.length === 0 &&
    !error

  // Render initial state
  const shouldShowInitialState =
    !isLoading && !debouncedSearchQuery.trim() && repositories.length === 0

  return (
    <div className="min-h-screen flex flex-col bg-black  ">
      {/* Header with profile picture and navigation icons */}
      <header className=" border border-gray-700 py-4 px-6 border-dashed max-w-6xl mx-auto w-full sticky top-0 z-10 bg-black">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gray-900/30 border border-gray-700 rounded flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
            <div>
              <h1 className=" text-base sm:text-xl font-semibold text-white uppercase tracking-wide">
                GitHub Repo Search
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wide">
                Repository Explorer
              </p>
            </div>
          </div>
          
          {/* Navigation icons */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto pb-8  border-r border-l border-b border-gray-700 border-dashed">
        {/* About Section */}
        <div className="mb-12 px-6 py-8 sm:py-12  border-b border-gray-700 border-dashed">
          <p className="text-white sm:text-lg mb-4 ">
            Hello, I'm  <span className="font-bold text-green-400">Repository Explorer</span>.
          </p>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            A  tool that searches and bookmarks GitHub repositories. 
            I help  discover standout projects by blending search efficiency with smart organization – 
            making development workflow better.
          </p>
          <div className=" pt-6">
            <p className="text-gray-400  text-sm">
              Built with <span className="text-green-400">React</span>, <span className="text-green-400">TypeScript</span>, 
              and <span className="text-green-400">TailwindCSS</span>
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-8 px-6 py-2 ">
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            isLoading={isLoading}
          />
          {(repositories.length > 0 || bookmarkedRepositories.length > 0) && (
            <FilterToggle
              mode={filterMode}
              onModeChange={handleFilterModeChange}
              bookmarkCount={bookmarkedRepositories.length}
            />
          )}
        </div>

        {/* Results Section */}
        <div className="min-h-96 px-6 pb-12 border-b border-gray-700 border-dashed">
          {error && (
            <EmptyState message={error} icon="error" />
          )}

          {isLoading && <LoadingSpinner />}

          {!isLoading && !error && (
            <>
              {shouldShowInitialState && (
                <EmptyState
                  message="Start typing to search GitHub repositories"
                  icon="search"
                />
              )}

              {shouldShowSearchEmpty && (
                <EmptyState
                  message="No repositories found. Try a different search term."
                  icon="search"
                />
              )}

              {shouldShowBookmarkedEmpty && (
                <EmptyState
                  message="No bookmarked repositories in current search results."
                  icon="bookmark"
                />
              )}

              {filteredRepositories.length > 0 && (
                <>
                  <div className="mb-6 ">
                    <p className="text-sm text-gray-400 font-mono">
                      {filteredRepositories.length} result
                      {filteredRepositories.length !== 1 ? 's' : ''}
                      {filterMode === 'bookmarked' && ' (bookmarked)'}
                    </p>
                  </div>
                  <RepositoryList
                    repositories={filteredRepositories}
                    isBookmarked={isBookmarked}
                    onToggleBookmark={toggleBookmark}
                  />
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default App

