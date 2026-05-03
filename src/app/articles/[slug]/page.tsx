import { readFile } from 'fs/promises'
import { join } from 'path'
import { Metadata } from 'next'
import { parseArticleMDX } from '@/lib/mdx'
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/schema/article'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { FAQSection } from '@/components/article/FAQSection'
import { Breadcrumb } from '@/components/article/Breadcrumb'
import { VideoEmbed } from '@/components/article/VideoEmbed'
import { WeChatBottomCard } from '@/components/wechat/WeChatBottomCard'
import { WeChatRelatedLinks } from '@/components/wechat/WeChatRelatedLinks'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  try {
    const content = await readFile(join('./content/articles', `${decodedSlug}.mdx`), 'utf-8')
    const { frontmatter } = parseArticleMDX(content)
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        images: frontmatter.image ? [frontmatter.image] : [],
      },
    }
  } catch {
    return { title: '文章未找到' }
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  let frontmatter: any = null
  let body = ''
  let schema: ReturnType<typeof generateArticleSchema> | null = null

  try {
    const content = await readFile(join('./content/articles', `${decodedSlug}.mdx`), 'utf-8')
    const parsed = parseArticleMDX(content)
    frontmatter = parsed.frontmatter
    body = parsed.body

    schema = generateArticleSchema({
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags,
      description: frontmatter.description,
      image: frontmatter.image,
    })
  } catch (e) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-red-500">文章加载失败</p>
      </div>
    )
  }

  const faqs = [
    { question: `${frontmatter.title}有什么营养价值？`, answer: frontmatter.description },
  ]
  const faqSchema = generateFAQSchema(faqs)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: '首页', url: '/' },
    { name: frontmatter.tags[0] || '水果', url: `/${frontmatter.tags[0]?.toLowerCase() || 'fruit'}` },
    { name: frontmatter.title, url: `/articles/${slug}` },
  ])

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <Breadcrumb
          items={[
            { name: frontmatter.tags[0] || '水果', url: `/${frontmatter.tags[0]?.toLowerCase() || 'fruit'}` },
            { name: frontmatter.title },
          ]}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {frontmatter.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <time>{frontmatter.date}</time>
              <div className="flex gap-2">
                {frontmatter.tags.map((tag: string) => (
                  <span key={tag} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br/>') }}
          />

          <VideoEmbed videoId={frontmatter.videoId} title={frontmatter.title} />

          <FAQSection items={faqs} />

          <WeChatBottomCard />

          <WeChatRelatedLinks
            links={frontmatter.wechatLinks || []}
            articleTitle={frontmatter.title}
          />
        </article>
      </div>
      <Footer />
    </>
  )
}

export async function generateStaticParams() {
  async function walkDir(dir: string): Promise<string[]> {
    const { readdir } = await import('fs/promises')
    const entries = await readdir(dir, { withFileTypes: true })
    const files: string[] = []
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...await walkDir(fullPath))
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
    return files
  }

  const files = await walkDir('./content/articles')

  return files.map((file) => ({
    slug: encodeURIComponent(file.replace(/^content\/articles\//, '').replace(/\.(mdx|md)$/, '')),
  }))
}