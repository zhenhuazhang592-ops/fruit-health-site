import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'

describe('Skeleton', () => {
  it('renders with default className', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass('skeleton')
    expect(container.firstChild).toHaveClass('rounded')
  })

  it('renders with custom className', () => {
    const { container } = render(<Skeleton className="w-32 h-4" />)
    expect(container.firstChild).toHaveClass('w-32')
    expect(container.firstChild).toHaveClass('h-4')
  })
})

describe('EmptyState', () => {
  it('renders with default message', () => {
    render(<EmptyState />)
    expect(screen.getByText('暂无内容')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<EmptyState message="没有找到文章" />)
    expect(screen.getByText('没有找到文章')).toBeInTheDocument()
  })

  it('renders with icon when provided', () => {
    render(<EmptyState icon={<span>📁</span>} />)
    expect(screen.getByText('📁')).toBeInTheDocument()
  })
})

describe('ErrorState', () => {
  it('renders with default message', () => {
    render(<ErrorState />)
    expect(screen.getByText('加载失败')).toBeInTheDocument()
  })

  it('renders with custom message', () => {
    render(<ErrorState message="数据获取失败" />)
    expect(screen.getByText('数据获取失败')).toBeInTheDocument()
  })

  it('renders retry button when onRetry provided', () => {
    const handleRetry = () => {}
    render(<ErrorState onRetry={handleRetry} />)
    expect(screen.getByText('重试')).toBeInTheDocument()
  })
})