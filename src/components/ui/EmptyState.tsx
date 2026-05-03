interface EmptyStateProps {
  message?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({ message = '暂无内容', icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500 gap-3">
      {icon && <div className="text-4xl opacity-60">{icon}</div>}
      <p className="text-base">{message}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}