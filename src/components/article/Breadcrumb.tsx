import Link from 'next/link'

interface BreadcrumbItem {
  name: string
  url?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑导航" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-text-secondary hover:text-primary transition-colors">
            首页
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-text-secondary">/</span>
            {item.url ? (
              <Link href={item.url} className="text-text-secondary hover:text-primary transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-text font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
