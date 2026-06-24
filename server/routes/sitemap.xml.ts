function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler(async (event) => {
  const {
    public: { siteUrl }
  } = useRuntimeConfig(event)
  const canonicalSiteUrl = siteUrl.replace(/\/$/, '')
  const projectsStorage = useStorage<string>('assets:projects')
  const filenames = await projectsStorage.getKeys()
  const projects = await readProjects(filenames, async (filename) => {
    const source = await projectsStorage.getItem(filename)

    if (typeof source !== 'string') {
      throw new Error(`Unable to read bundled project content: ${filename}`)
    }

    return source
  })
  const urls = [
    canonicalSiteUrl,
    ...projects.map(({ slug }) => `${canonicalSiteUrl}/projects/${slug}`)
  ]

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    '</urlset>'
  ].join('\n')
})
