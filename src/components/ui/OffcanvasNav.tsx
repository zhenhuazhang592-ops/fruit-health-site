'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: '水果', href: '/fruit' },
  { label: '肉类', href: '/meat' },
  { label: '蔬菜', href: '/vegetable' },
  { label: '营养知识', href: '/nutrition' },
  { label: '关于我们', href: '/about' },
]

export function OffcanvasNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationType, setAnimationType] = useState<'enter' | 'exit'>('enter')

  const open = useCallback(() => {
    setIsAnimating(true)
    setAnimationType('enter')
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsAnimating(true)
    setAnimationType('exit')
  }, [])

  const handleAnimationEnd = useCallback(() => {
    if (animationType === 'exit') {
      setIsOpen(false)
    }
    setIsAnimating(false)
  }, [animationType])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  // Handle swipe gesture (touch)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null || !isOpen) return
    const diff = e.touches[0].clientX - touchStart
    if (diff > 100) {
      close()
      setTouchStart(null)
    }
  }

  const handleTouchEnd = () => {
    setTouchStart(null)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={open}
        className="p-2 rounded-lg hover:bg-white/20 transition-colors"
        aria-label="打开菜单"
        aria-expanded={isOpen}
      >
        <svg className="w-6 h-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/40 z-40 ${
            isAnimating ? (animationType === 'enter' ? 'overlay-enter' : 'overlay-exit') : ''
          }`}
          onClick={close}
        />
      )}

      {/* Offcanvas Panel */}
      {isOpen && (
        <div
          className={`fixed left-0 top-0 h-full w-72 bg-surface z-50 shadow-xl ${
            isAnimating ? (animationType === 'enter' ? 'offcanvas-enter' : 'offcanvas-exit') : ''
          }`}
          onAnimationEnd={handleAnimationEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-display text-lg font-bold text-primary">水果健康</span>
            <button
              onClick={close}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="关闭菜单"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-4">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 rounded-lg hover:bg-secondary/20 text-text transition-colors font-medium"
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  )
}