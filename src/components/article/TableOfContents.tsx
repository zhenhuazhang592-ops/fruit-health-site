import { useState, useEffect } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -70% 0px' }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <nav className="space-y-1" aria-label="文章目录">
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
        目录
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`
                block text-sm py-1.5 px-3 rounded-lg transition-colors
                ${item.level === 2 ? 'pl-3' : 'pl-6'}
                ${activeId === item.id
                  ? 'text-primary bg-secondary/10 font-medium'
                  : 'text-text-secondary hover:text-text hover:bg-gray-50'
                }
              `}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
