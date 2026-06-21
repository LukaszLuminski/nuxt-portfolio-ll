import { fileURLToPath } from 'node:url'

const projectsDirectory = fileURLToPath(
  new URL('./content/projects', import.meta.url)
)
const indexingEnabled =
  process.env.NUXT_PUBLIC_ALLOW_INDEXING?.toLowerCase() === 'true'
const robotsDirective = indexingEnabled
  ? 'index, follow'
  : 'noindex, nofollow, noarchive, nosnippet'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  srcDir: '.',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
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
      meta: [
        { name: 'theme-color', content: '#05070c' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'robots', content: robotsDirective },
        { name: 'googlebot', content: robotsDirective }
      ]
    }
  },
  runtimeConfig: {
    contactToEmail: process.env.CONTACT_TO_EMAIL ?? '',
    contactFromEmail: process.env.CONTACT_FROM_EMAIL ?? '',
    resendApiKey: process.env.RESEND_API_KEY ?? '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://lukaszluminski.com',
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
