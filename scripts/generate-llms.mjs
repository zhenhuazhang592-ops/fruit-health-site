import { readdir, readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import matter from 'gray-matter'

const MDX_DIR = './content/articles'
const OUTPUT = './public/llms.txt'

async function extractMeta(content) {
  const { data } = matter(content)
  return {
    title: data.title || '',
    description: data.description || '',
    tags: data.tags || [],
  }
}

async function generateLLMsTxt() {
  async function walkDir(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    const files = []
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

  const files = await walkDir(MDX_DIR)

  const lines = ['# 营养百科 - 水果健康科普内容', '']

  for (const file of files) {
    try {
      const content = await readFile(file, 'utf-8')
      const meta = await extractMeta(content)
      if (meta.title) {
        lines.push(`## ${meta.title}`, meta.description || '', '')
      }
    } catch (e) {
      console.error(`Error reading ${file}: ${e.message}`)
    }
  }

  await writeFile(OUTPUT, lines.join('\n'), 'utf-8')
  console.log(`Generated llms.txt with ${files.length} entries`)
}

generateLLMsTxt().catch(console.error)