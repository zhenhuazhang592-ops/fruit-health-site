'use client'

import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  items: FaqItem[]
}

export function FAQSection({ items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (items.length === 0) return null

  return (
    <section className="my-12">
      <h2 className="font-display text-xl font-bold text-text mb-4">常见问题</h2>
      <div className="space-y-2">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-surface hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="font-medium text-text flex-1">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-text-secondary shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border bg-gray-50/50">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
