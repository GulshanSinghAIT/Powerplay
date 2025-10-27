import { GitHubSearchResponse } from '../types'

const GITHUB_API_BASE = 'https://api.github.com'
const MAX_RESULTS = 30

/**
 * Search GitHub repositories by query string
 * @param query - The search query
 * @returns Promise with search results
 * @throws Error if the API request fails
 */
export async function searchRepositories(
  query: string
): Promise<GitHubSearchResponse> {
  if (!query.trim()) {
    return {
      total_count: 0,
      incomplete_results: false,
      items: [],
    }
  }

  const url = new URL(`${GITHUB_API_BASE}/search/repositories`)
  url.searchParams.append('q', query)
  url.searchParams.append('per_page', MAX_RESULTS.toString())
  url.searchParams.append('sort', 'stars')
  url.searchParams.append('order', 'desc')

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.')
      }
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = (await response.json()) as GitHubSearchResponse
    return data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to fetch repositories')
  }
}

