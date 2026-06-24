import { fileURLToPath } from 'node:url'

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

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: '.',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      include: ['@lucide/vue', '@vue/devtools-core', '@vue/devtools-kit']
    }
  },
  nitro: {
    externals: {
      inline: ['@vue/shared']
    },
    serverAssets: [
      {
        baseName: 'projects',
        dir: projectsDirectory
      }
    ]
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en', class: 'dark' },
      titleTemplate: '%s | Lukasz Luminski',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
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
    contactToEmail: process.env.CONTACT_TO_EMAIL ?? '',
    contactFromEmail: process.env.CONTACT_FROM_EMAIL ?? '',
    resendApiKey: process.env.RESEND_API_KEY ?? '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? productionSiteUrl,
      indexingEnabled
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
    }
  },
  typescript: {
    strict: true,
    typeCheck: false
  }
})
