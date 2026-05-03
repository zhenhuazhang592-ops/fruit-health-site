'use client'

interface WeChatBottomCardProps {
  title?: string
  description?: string
}

export function WeChatBottomCard({
  title = '关注微信公众号',
  description = '获取更多水果营养知识，享受专业健康指导',
}: WeChatBottomCardProps) {
  return (
    <div className="my-12 flex items-center gap-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-secondary/20">
      <div className="shrink-0">
        <img
          src="/images/wechat-qr.png"
          alt="微信公众号二维码"
          className="w-24 h-24 rounded-xl border-2 border-secondary/30 shadow-sm object-cover bg-white"
          onError={(e) => {
            // Fallback: show a placeholder icon if QR image missing
            e.currentTarget.style.display = 'none'
            const parent = e.currentTarget.parentElement
            if (parent) {
              parent.innerHTML = `
                <div class="w-24 h-24 rounded-xl border-2 border-secondary/30 bg-white flex items-center justify-center">
                  <svg class="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              `
            }
          }}
        />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-text mb-1">{title}</h3>
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
        <p className="text-xs text-text-secondary/70 mt-2">长按识别二维码</p>
      </div>
    </div>
  )
}
