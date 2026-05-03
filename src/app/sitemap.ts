import { MetadataRoute } from 'next'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

const BASE_URL = 'https://fruit-health.example.com'

async function getAllArticles() {
  async function walkDir(dir: string): Promise<string[]> {
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

  const articlesDir = './content/articles'
  let files: string[] = []
  try {
    files = await walkDir(articlesDir)
  } catch {
    return []
  }

  const articles: { url: string; lastModified: Date; changeFrequency: 'weekly' | 'monthly'; priority: number }[] = []

  for (const file of files) {
    try {
      const content = await readFile(file, 'utf-8')
      const { data } = matter(content)
      if (data.title && data.date) {
        const slug = file
          .replace(/^content\/articles\//, '')
          .replace(/\.(mdx|md)$/, '')
        articles.push({
          url: `${BASE_URL}/articles/${encodeURIComponent(slug)}`,
          lastModified: new Date(data.date),
          changeFrequency: 'monthly',
          priority: 0.8,
        })
      }
    } catch {
      // skip invalid files
    }
  }

  return articles
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/fruit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/meat`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/vegetable`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...articles,
  ]
}