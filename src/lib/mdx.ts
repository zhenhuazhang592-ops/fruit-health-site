import { z } from 'zod'
import matter from 'gray-matter'

// ─── Schemas ─────────────────────────────────────────────────────────

const WeChatLinkSchema = z.object({
  title: z.string().min(1),
  url: z.string(),
  description: z.string().optional(),
})

export const ArticleFrontmatter = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()).min(1),
  description: z.string().min(10).max(300),
  image: z.string().optional(),
  videoId: z.string().optional(),
  wechatLinks: z.array(WeChatLinkSchema).optional(),
})

export type WeChatLink = z.infer<typeof WeChatLinkSchema>

export const EntityFrontmatter = z.object({
  title: z.string().min(1),
  type: z.string().min(1),
  tags: z.array(z.string()),
  lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

// ─── MDX File Parser ─────────────────────────────────────────────────

export interface ParsedMDX<T> {
  frontmatter: T
  body: string
}

export function parseMDXFile<T>(
  content: string,
  schema: z.ZodType<T>,
): ParsedMDX<T> {
  const result = matter(content)
  const data = result.data as Record<string, unknown>
  const body = result.content

  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    throw new Error(
      `Frontmatter validation failed: ${parsed.error.message}\nData: ${JSON.stringify(data)}`,
    )
  }

  return { frontmatter: parsed.data, body }
}

export function parseArticleMDX(content: string): ParsedMDX<z.infer<typeof ArticleFrontmatter>> {
  return parseMDXFile(content, ArticleFrontmatter)
}

export function parseEntityMDX(content: string): ParsedMDX<z.infer<typeof EntityFrontmatter>> {
  return parseMDXFile(content, EntityFrontmatter)
}