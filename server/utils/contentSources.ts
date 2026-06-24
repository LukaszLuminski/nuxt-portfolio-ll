import type { H3Event } from 'h3'

type BundledContentBase = 'blog' | 'projects'

async function readBundledSources(base: BundledContentBase) {
  const storage = useStorage<string>(`assets:${base}`)
  const filenames = await storage.getKeys()
  const readSource = async (filename: string) => {
    const source = await storage.getItem(filename)

    if (typeof source === 'string') {
      return source
    }

    throw new Error(`Unable to read bundled ${base} content: ${filename}`)
  }

  return { filenames, readSource }
}

export async function readBundledProjects() {
  const { filenames, readSource } = await readBundledSources('projects')

  return readProjects(filenames, readSource)
}

export async function readBundledBlogPosts() {
  const { filenames, readSource } = await readBundledSources('blog')

  return readBlogPosts(filenames, readSource)
}

export async function readPublishedBlogPosts() {
  return (await readBundledBlogPosts()).filter(({ draft }) => !draft)
}

export function ensureBlogEnabled(event: H3Event, statusMessage: string) {
  const {
    public: { blogEnabled }
  } = useRuntimeConfig(event)

  if (blogEnabled) {
    return
  }

  throw createError({ statusCode: 404, statusMessage })
}
