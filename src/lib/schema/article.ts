// Schema.org structured data generators for SEO

const SITE_URL = 'https://fruit-health.example.com'
const PUBLISHER_NAME = '营养百科'

export function generateArticleSchema(post: {
  title: string
  date: string
  updatedAt?: string
  image?: string
  tags: string[]
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: { '@type': 'Person', name: PUBLISHER_NAME },
    publisher: {
      '@type': 'Organization',
      name: PUBLISHER_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
    },
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    articleSection: post.tags[0],
    keywords: post.tags.join(', '),
    description: post.description,
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((qa) => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
      },
    })),
  }
}

export function generateNutritionSchema(food: {
  name: string
  caloriesPer100g: number
  fatPer100g: number
  carbsPer100g: number
  proteinPer100g: number
  fiberPer100g: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NutritionInformation',
    name: food.name,
    calories: food.caloriesPer100g,
    fatContent: `${food.fatPer100g}g`,
    carbohydrateContent: `${food.carbsPer100g}g`,
    proteinContent: `${food.proteinPer100g}g`,
    fiberContent: `${food.fiberPer100g}g`,
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}