import Link from 'next/link'

interface CategoryCardProps {
  name: string
  href: string
  description: string
  image: string
}

export function CategoryCard({ name, href, description, image }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative h-40 rounded-xl overflow-hidden shadow hover:shadow-hover transition-shadow"
    >
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-3 left-3 text-white">
        <h3 className="font-display text-lg font-bold">{name}</h3>
        <p className="text-xs text-white/80">{description}</p>
      </div>
    </Link>
  )
}
