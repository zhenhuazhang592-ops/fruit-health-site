interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export function ErrorState({ message = '加载失败', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-red-500 gap-3">
      <svg
        className="w-10 h-10 opacity-70"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p className="text-base">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 mt-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
        >
          重试
        </button>
      )}
    </div>
  )
}