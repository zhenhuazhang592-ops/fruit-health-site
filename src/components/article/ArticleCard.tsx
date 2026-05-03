import Link from 'next/link'

interface ArticleCardProps {
  slug: string
  title: string
  description: string
  image?: string
  category?: string
  date?: string
  tags?: string[]
}

export function ArticleCard({
  slug,
  title,
  description,
  image,
  category,
  date,
  tags,
}: ArticleCardProps) {
  const href = `/articles/${encodeURIComponent(slug)}`

  return (
    <Link
      href={href}
      className="group bg-surface rounded-xl overflow-hidden shadow hover:shadow-hover transition-all flex flex-col"
    >
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        {(category || tags?.[0]) && (
          <span className="inline-block text-xs font-medium text-primary bg-secondary/20 px-2 py-1 rounded-full mb-3 w-fit">
            {category || tags?.[0]}
          </span>
        )}
        <h3 className="font-display text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
          {description}
        </p>
        {date && (
          <time className="text-xs text-text-secondary">{date}</time>
        )}
      </div>
    </Link>
  )
}
