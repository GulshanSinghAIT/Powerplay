import { memo } from 'react'

/**
 * Loading spinner component
 * Memoized as it never changes
 */
export const LoadingSpinner = memo(() => {
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-4">
      <div className="w-12 h-12 relative" aria-label="Loading" role="status">
        <div className="w-full h-full border-3 border-gray-700 border-t-green-400 rounded-full animate-spin" />
      </div>
      <p className="text-gray-300 text-sm font-mono">Searching repositories...</p>
    </div>
  )
})

LoadingSpinner.displayName = 'LoadingSpinner'

