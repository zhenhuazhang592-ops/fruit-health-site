'use client'

import { useState, useEffect } from 'react'

export function WeChatCTA() {
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lazy load QR image when visible
  useEffect(() => {
    if (visible && !loaded) {
      setLoaded(true)
    }
  }, [visible, loaded])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1">
      {loaded && (
        <img
          src="/images/wechat-qr.png"
          alt="微信公众号"
          className="w-24 h-24 rounded-xl shadow-lg border border-border"
          onError={() => {
            // Fallback placeholder if QR image missing
          }}
        />
      )}
      <span className="text-xs text-gray-500 bg-white/80 px-2 py-1 rounded-lg shadow">
        长按识别
      </span>
    </div>
  )
}