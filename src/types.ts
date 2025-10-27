export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  owner: {
    login: string
    avatar_url: string
  }
}

export interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: Repository[]
}

export type FilterMode = 'all' | 'bookmarked'

