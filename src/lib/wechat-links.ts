import { z } from 'zod'

export const WeChatLinkSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  description: z.string().optional(),
})

export const ArticleFrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()).min(1),
  description: z.string().min(10).max(300),
  image: z.string().optional(),
  videoId: z.string().optional(),
  wechatLinks: z.array(WeChatLinkSchema).optional(),
})

export type WeChatLink = z.infer<typeof WeChatLinkSchema>
