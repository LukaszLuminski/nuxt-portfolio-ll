import { fileURLToPath } from 'node:url'

const blogDirectory = fileURLToPath(new URL('./content/blog', import.meta.url))
const projectsDirectory = fileURLToPath(
  new URL('./content/projects', import.meta.url)
)
const productionSiteUrl = 'https://lukaszluminski.dev'
const indexingOverride = process.env.NUXT_PUBLIC_ALLOW_INDEXING
const indexingEnabled = indexingOverride
  ? indexingOverride.toLowerCase() === 'true'
  : process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === 'production'
    : true
const robotsDirective = indexingEnabled
  ? 'index, follow'
  : 'noindex, nofollow, noarchive, nosnippet'
const blogEnabled =
  process.env.NUXT_PUBLIC_BLOG_ENABLED?.toLowerCase() === 'true'
const hiddenBlogRobotsDirective = 'noindex, nofollow, noarchive, nosnippet'
const hiddenBlogRouteRules = blogEnabled
  ? {}
  : {
      '/blog': {
        headers: {
          'X-Robots-Tag': hiddenBlogRobotsDirective
        }
      },
      '/blog/**': {
        headers: {
          'X-Robots-Tag': hiddenBlogRobotsDirective
        }
      }
    }

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: '.',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      include: ['@lucide/vue']
    }
  },
  nitro: {
    externals: {
      inline: ['@vue/shared']
    },
    serverAssets: [
      { baseName: 'projects', dir: projectsDirectory },
      { baseName: 'blog', dir: blogDirectory }
    ]
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en', class: 'dark' },
      titleTemplate: '%s',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/favicon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '48x48',
          href: '/favicon-48.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/favicon-192.png'
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        }
      ],
      meta: [
        { name: 'theme-color', content: '#05070c' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'robots', content: robotsDirective },
        { name: 'googlebot', content: robotsDirective },
        {
          name: 'google-site-verification',
          content: 'tDx0YulXOyWOZ6L1ztLpmByTP56mrJbNLJbOmZKDQMQ'
        }
      ]
    }
  },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY ?? '',
    openaiModel: process.env.OPENAI_MODEL ?? 'gpt-5.4-mini',
    contactToEmail: process.env.CONTACT_TO_EMAIL ?? '',
    contactFromEmail: process.env.CONTACT_FROM_EMAIL ?? '',
    resendApiKey: process.env.RESEND_API_KEY ?? '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? productionSiteUrl,
      indexingEnabled,
      blogEnabled
    }
  },
  routeRules: {
    '/images/**': {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Robots-Tag': robotsDirective
      }
    },
    '/**': {
      headers: {
        'X-Robots-Tag': robotsDirective
      }
    },
    ...hiddenBlogRouteRules
  },
  typescript: {
    strict: true,
    typeCheck: false
  }
})
