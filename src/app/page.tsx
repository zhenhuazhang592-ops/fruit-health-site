import Link from 'next/link'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { WeChatCTA } from '@/components/wechat/WeChatCTA'

const CATEGORIES = [
  {
    name: '水果',
    href: '/fruit',
    description: '榴莲、牛油果、蓝莓...',
    image: 'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?w=400&q=80',
  },
  {
    name: '肉类',
    href: '/meat',
    description: '牛肉、羊肉、海鲜...',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80',
  },
  {
    name: '蔬菜',
    href: '/vegetable',
    description: '有机蔬菜、时令鲜蔬...',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
  },
  {
    name: '营养知识',
    href: '/nutrition',
    description: '维生素、矿物质、膳食纤维...',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&q=80',
  },
]

const ARTICLES = [
  {
    slug: 'avocado-nutrition',
    title: '牛油果的营养价值与食用方法',
    category: '水果',
    date: '2026-04-28',
    description: '牛油果富含健康脂肪和膳食纤维，是减肥人士的理想选择。',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=80',
  },
  {
    slug: 'durian-benefits',
    title: '榴莲：热带水果之王的健康功效',
    category: '水果',
    date: '2026-04-27',
    description: '榴莲不仅美味，还具有丰富的营养价值和保健功效。',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&q=80',
  },
  {
    slug: 'blueberry-antioxidant',
    title: '蓝莓：抗氧化的小能手',
    category: '水果',
    date: '2026-04-25',
    description: '蓝莓富含花青素，有助于保护眼睛和延缓衰老。',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3c1189baf9?w=600&q=80',
  },
  {
    slug: 'beef-protein',
    title: '牛肉：优质蛋白质的来源',
    category: '肉类',
    date: '2026-04-24',
    description: '牛肉富含铁、锌等微量元素，是补血强身的好食材。',
    image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=600&q=80',
  },
  {
    slug: 'organic-vegetables',
    title: '有机蔬菜：健康饮食的首选',
    category: '蔬菜',
    date: '2026-04-23',
    description: '有机蔬菜不含农药和化肥，是追求健康生活的好选择。',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
  },
  {
    slug: 'vitamin-d-sources',
    title: '维生素D：阳光维生素的奥秘',
    category: '营养知识',
    date: '2026-04-22',
    description: '维生素D对骨骼健康至关重要，如何通过食物补充？',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80',
  },
]

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-4 max-w-6xl mx-auto">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            健康饮食，美好生活
          </h1>
          <p className="text-white/90 text-lg mb-6 max-w-xl">
            专业的健康饮食知识平台，为您提供水果营养、选购指南、健康食谱等全方位科普内容。
          </p>
          <Link
            href="/fruit"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-colors w-fit"
          >
            探索更多
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Category Cards */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-display text-2xl font-bold text-text mb-6">探索分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative h-40 rounded-xl overflow-hidden shadow hover:shadow-hover transition-shadow"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <h3 className="font-display text-lg font-bold">{cat.name}</h3>
                <p className="text-xs text-white/80">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="font-display text-2xl font-bold text-text mb-6">最新文章</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${encodeURIComponent(article.slug)}`}
              className="group bg-surface rounded-xl overflow-hidden shadow hover:shadow-hover transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <span className="inline-block text-xs font-medium text-primary bg-secondary/20 px-2 py-1 rounded-full mb-2">
                  {article.category}
                </span>
                <h3 className="font-display text-lg font-bold text-text mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {article.description}
                </p>
                <time className="text-xs text-text-secondary">{article.date}</time>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      <WeChatCTA />
    </>
  )
}
