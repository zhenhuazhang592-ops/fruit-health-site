import Link from 'next/link'

const LINKS = [
  { name: '关于我们', href: '/about' },
  { name: '联系方式', href: '/contact' },
  { name: '隐私政策', href: '/privacy' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-secondary">
          © 2026 水果健康科普 · 用知识守护健康
        </p>
        <div className="flex items-center gap-4">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-primary transition-colors text-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
