export default defineEventHandler((event) => {
  if (process.env.VERCEL_ENV !== 'production') {
    return
  }

  const pathname = getRequestURL(event).pathname

  if (pathname.startsWith('/api/') || pathname.startsWith('/_nuxt/')) {
    return
  }

  const {
    public: { siteUrl }
  } = useRuntimeConfig(event)

  let canonicalUrl: URL

  try {
    canonicalUrl = new URL(siteUrl)
  } catch {
    return
  }

  const host = getHeader(event, 'x-forwarded-host') ?? getHeader(event, 'host')
  const requestHost = host?.split(',')[0]?.trim().toLowerCase()
  const canonicalHost = canonicalUrl.host.toLowerCase()

  if (!requestHost || requestHost === canonicalHost) {
    return
  }

  const requestUrl = getRequestURL(event)
  requestUrl.protocol = canonicalUrl.protocol
  requestUrl.host = canonicalUrl.host

  return sendRedirect(event, requestUrl.toString(), 301)
})
