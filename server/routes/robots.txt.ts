export default defineEventHandler((event) => {
  const {
    public: { blogEnabled, indexingEnabled, siteUrl }
  } = useRuntimeConfig(event)
  const canonicalSiteUrl = siteUrl.replace(/\/$/, '')
  const lines = indexingEnabled
    ? [
        'User-agent: *',
        ...(blogEnabled ? [] : ['Disallow: /blog']),
        'Allow: /',
        `Sitemap: ${canonicalSiteUrl}/sitemap.xml`
      ]
    : ['User-agent: *', 'Disallow: /']

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

  return `${lines.join('\n')}\n`
})
