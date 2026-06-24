export interface BlogImage {
  src: string
  alt: string
}

export interface BlogPost {
  path: string
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt: string | null
  draft: boolean
  tags: readonly string[]
  readingTime: string
  image: BlogImage
}

export interface BlogContent {
  eyebrow: string
  title: string
  intro: string
  emptyState: string
}
