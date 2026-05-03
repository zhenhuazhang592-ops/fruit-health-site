import Link from 'next/link'
import { OffcanvasNav } from '@/components/ui/OffcanvasNav'

const CATEGORIES = [
  { name: '水果', href: '/fruit' },
  { name: '肉类', href: '/meat' },
  { name: '蔬菜', href: '/vegetable' },
  { name: '营养知识', href: '/nutrition' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Mobile Nav */}
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <OffcanvasNav />
          </div>
          <Link href="/" className="font-display text-xl font-bold text-primary">
            水果健康
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-sm font-medium text-text hover:text-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <button
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="搜索"
        >
          <svg className="w-5 h-5 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </header>
  )
}
