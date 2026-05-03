import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import Link from 'next/link'
import { parseArticleMDX } from '@/lib/mdx'
import { generateBreadcrumbSchema } from '@/lib/schema/article'

interface Props {
  params: Promise<{ category: string }>
}

const CATEGORY_TITLES: Record<string, string> = {
  fruit: '水果',
  meat: '肉类',
  vegetable: '蔬菜',
  nutrition: '营养知识',
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  fruit: '探索各种水果的营养价值和健康功效',
  meat: '了解优质蛋白质的来源与食用方法',
  vegetable: '时令蔬菜，为您的饮食增添活力',
  nutrition: '营养知识，帮助您吃得更加健康',
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const categoryDir = `./content/articles/${category}`

  let files: string[] = []
  try {
    const entries = await readdir(categoryDir, { withFileTypes: true })
    files = entries
      .filter((e) => !e.isDirectory() && (e.name.endsWith('.mdx') || e.name.endsWith('.md')))
      .map((e) => e.name)
  } catch {
    files = []
  }

  const articles = await Promise.all(
    files.map(async (f) => {
      try {
        const content = await readFile(join(categoryDir, f), 'utf-8')
        const { frontmatter } = parseArticleMDX(content)
        return {
          slug: f.replace(/\.(mdx|md)$/, ''),
          ...frontmatter,
        }
      } catch {
        return null
      }
    })
  ).then((results) => results.filter(Boolean) as any[])

  const title = CATEGORY_TITLES[category] || category
  const description = CATEGORY_DESCRIPTIONS[category] || ''

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '首页', url: '/' },
    { name: title, url: `/${category}` },
  ])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500">{description}</p>
      </header>

      {articles.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          暂无内容
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block bg-white rounded-xl shadow hover:shadow-lg transition p-4"
            >
              {article.image && (
                <div className="bg-gray-200 rounded-lg h-40 mb-4" />
              )}
              <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{article.description}</p>
              <div className="flex gap-2">
                {(article.tags || []).slice(0, 2).map((tag: string) => (
                  <span key={tag} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export async function generateStaticParams() {
  return ['fruit', 'meat', 'vegetable', 'nutrition'].map((category) => ({ category }))
}