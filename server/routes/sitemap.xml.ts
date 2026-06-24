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
    public: { blogEnabled, siteUrl }
  } = useRuntimeConfig(event)
  const canonicalSiteUrl = siteUrl.replace(/\/$/, '')
  const [projects, posts] = await Promise.all([
    readBundledProjects(),
    blogEnabled ? readPublishedBlogPosts() : []
  ])
  const urls = [
    canonicalSiteUrl,
    ...(blogEnabled ? [`${canonicalSiteUrl}/blog`] : []),
    ...projects.map(({ slug }) => `${canonicalSiteUrl}/projects/${slug}`),
    ...posts.map(({ path }) => `${canonicalSiteUrl}${path}`)
  ]

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`),
    '</urlset>'
  ].join('\n')
})
