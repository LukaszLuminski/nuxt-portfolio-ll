import { parse } from 'yaml'
import type { BlogImage, BlogPost } from '~/features/blog/types'

type UnknownRecord = Record<string, unknown>

export interface BlogArticle extends BlogPost {
  html: string
}

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function invalidPost(filename: string, message: string): never {
  throw new Error(`Invalid blog content in ${filename}: ${message}`)
}

function requireRecord(
  value: unknown,
  filename: string,
  field = 'document'
): UnknownRecord {
  if (isRecord(value)) {
    return value
  }

  return invalidPost(filename, `${field} must be an object.`)
}

function requireString(source: UnknownRecord, field: string, filename: string) {
  const value = source[field]

  if (typeof value === 'string' && value.trim()) {
    return value.trim()
  }

  return invalidPost(filename, `${field} must be a non-empty string.`)
}

function optionalString(
  source: UnknownRecord,
  field: string,
  filename: string
) {
  const value = source[field]

  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'string') {
    return value.trim() || null
  }

  return invalidPost(filename, `${field} must be a string or null.`)
}

function requireBoolean(
  source: UnknownRecord,
  field: string,
  filename: string
) {
  const value = source[field]

  if (typeof value === 'boolean') {
    return value
  }

  return invalidPost(filename, `${field} must be a boolean.`)
}

function requireStringArray(
  source: UnknownRecord,
  field: string,
  filename: string
) {
  const value = source[field]

  if (
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string' && item.trim())
  ) {
    return value.map((item) => item.trim())
  }

  return invalidPost(filename, `${field} must contain only non-empty strings.`)
}

function requireImage(source: UnknownRecord, filename: string): BlogImage {
  const image = requireRecord(source.image, filename, 'image')

  return {
    src: requireString(image, 'src', filename),
    alt: requireString(image, 'alt', filename)
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function parseFrontmatter(source: string, filename: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    return invalidPost(filename, 'frontmatter is required.')
  }

  const [, frontmatter = '', markdown = ''] = match

  return {
    meta: requireRecord(parse(frontmatter), filename, 'frontmatter'),
    markdown: markdown.trim()
  }
}

function renderInlineMarkdown(value: string) {
  return escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>')
}

function renderParagraph(lines: string[]) {
  return `<p>${renderInlineMarkdown(lines.join(' '))}</p>`
}

function renderMarkdown(markdown: string) {
  const blocks: string[] = []
  const paragraphLines: string[] = []
  let listItems: string[] = []

  const flushParagraph = () => {
    if (!paragraphLines.length) {
      return
    }

    blocks.push(renderParagraph(paragraphLines))
    paragraphLines.length = 0
  }

  const flushList = () => {
    if (!listItems.length) {
      return
    }

    blocks.push(`<ul>${listItems.join('')}</ul>`)
    listItems = []
  }

  for (const line of markdown.split(/\r?\n/)) {
    const trimmedLine = line.trim()

    if (!trimmedLine) {
      flushParagraph()
      flushList()
      continue
    }

    if (trimmedLine.startsWith('## ')) {
      flushParagraph()
      flushList()
      blocks.push(`<h2>${renderInlineMarkdown(trimmedLine.slice(3))}</h2>`)
      continue
    }

    if (trimmedLine.startsWith('- ')) {
      flushParagraph()
      listItems.push(`<li>${renderInlineMarkdown(trimmedLine.slice(2))}</li>`)
      continue
    }

    flushList()
    paragraphLines.push(trimmedLine)
  }

  flushParagraph()
  flushList()

  return blocks.join('\n')
}

export function parseBlogPost(source: string, filename: string): BlogArticle {
  const { meta, markdown } = parseFrontmatter(source, filename)
  const slug = requireString(meta, 'slug', filename)

  return {
    path: `/blog/${slug}`,
    title: requireString(meta, 'title', filename),
    description: requireString(meta, 'description', filename),
    slug,
    publishedAt: requireString(meta, 'publishedAt', filename),
    updatedAt: optionalString(meta, 'updatedAt', filename),
    draft: requireBoolean(meta, 'draft', filename),
    tags: requireStringArray(meta, 'tags', filename),
    readingTime: requireString(meta, 'readingTime', filename),
    image: requireImage(meta, filename),
    html: renderMarkdown(markdown)
  }
}

export function toBlogPostSummary({
  html: _html,
  ...post
}: BlogArticle): BlogPost {
  return post
}

function ensureUniqueSlugs(posts: readonly BlogPost[]) {
  const slugs = new Set<string>()

  for (const { slug } of posts) {
    if (slugs.has(slug)) {
      throw new Error(`Duplicate blog slug: ${slug}`)
    }

    slugs.add(slug)
  }
}

export async function readBlogPosts(
  filenames: readonly string[],
  readSource: (filename: string) => Promise<string>
) {
  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith('.md'))
      .map(async (filename) =>
        parseBlogPost(await readSource(filename), filename)
      )
  )

  ensureUniqueSlugs(posts)

  return posts.toSorted(
    ({ publishedAt: previousDate }, { publishedAt: nextDate }) =>
      nextDate.localeCompare(previousDate)
  )
}
