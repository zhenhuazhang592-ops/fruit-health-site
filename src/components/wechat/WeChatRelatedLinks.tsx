'use client'

import type { WeChatLink } from '@/lib/mdx'

interface WeChatRelatedLinksProps {
  links: WeChatLink[]
  articleTitle?: string
}

export function WeChatRelatedLinks({ links, articleTitle }: WeChatRelatedLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <section className="my-12 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-secondary/20">
      <h3 className="font-display text-lg font-bold text-text mb-1">
        相关推荐阅读
      </h3>
      <p className="text-sm text-text-secondary mb-4">
        微信搜索「水果健康科普」关注公众号，获取更多专业内容
      </p>
      <div className="space-y-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-4 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className="shrink-0 mt-0.5">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text group-hover:text-primary transition-colors text-sm leading-snug">
                {link.title}
              </h4>
              {link.description && (
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                  {link.description}
                </p>
              )}
            </div>
            <div className="shrink-0 self-center">
              <svg
                className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
