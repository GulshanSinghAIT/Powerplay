import { useCallback, useMemo, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { Repository } from '../types'

const BOOKMARKS_KEY = 'github-repo-bookmarks'

/**
 * Custom hook to manage bookmarked repositories
 * @returns Object with bookmarked repositories, toggle function, and check function
 */
export function useBookmarks() {
  const [bookmarksData, setBookmarksData] = useLocalStorage<Repository[]>(
    BOOKMARKS_KEY,
    []
  )

  // One-time migration: clear invalid localStorage data
  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        // If it's not an array or is an empty object (from old Set), clear it
        if (!Array.isArray(parsed) || (typeof parsed === 'object' && Object.keys(parsed).length === 0)) {
          console.log('Migrating bookmarks data: clearing invalid format')
          localStorage.removeItem(BOOKMARKS_KEY)
          setBookmarksData([])
        }
      }
    } catch (error) {
      console.warn('Error during bookmarks migration:', error)
      localStorage.removeItem(BOOKMARKS_KEY)
      setBookmarksData([])
    }
  }, [setBookmarksData])

  // Convert to Set for efficient ID lookup
  const bookmarkedIds = useMemo(() => {
    if (!Array.isArray(bookmarksData)) {
      return new Set<number>()
    }
    
    // Filter out any invalid repository objects
    const validRepos = bookmarksData.filter(repo => 
      repo && 
      typeof repo.id === 'number' && 
      typeof repo.name === 'string' &&
      typeof repo.full_name === 'string'
    )
    
    // If we filtered out invalid values, update localStorage
    if (validRepos.length !== bookmarksData.length) {
      setBookmarksData(validRepos)
    }
    
    return new Set(validRepos.map(repo => repo.id))
  }, [bookmarksData, setBookmarksData])

  const toggleBookmark = useCallback(
    (repository: Repository) => {
      setBookmarksData(prev => {
        const existingIndex = prev.findIndex(repo => repo.id === repository.id)
        
        if (existingIndex >= 0) {
          // Remove bookmark
          return prev.filter(repo => repo.id !== repository.id)
        } else {
          // Add bookmark
          return [...prev, repository]
        }
      })
    },
    [setBookmarksData]
  )

  const isBookmarked = useCallback(
    (repoId: number) => bookmarkedIds.has(repoId),
    [bookmarkedIds]
  )

  return {
    bookmarkedRepositories: bookmarksData,
    bookmarkedIds,
    toggleBookmark,
    isBookmarked,
  }
}

