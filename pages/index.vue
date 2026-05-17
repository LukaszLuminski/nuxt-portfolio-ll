<script setup lang="ts">
import HeroSection from '~/features/hero/HeroSection.vue'
import { useHeroContent } from '~/features/hero/useHeroContent'

const hero = useHeroContent()
const siteUrl = useRuntimeConfig().public.siteUrl

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: 'Lukasz Luminski',
  alternateName: ['Łukasz Łumiński', 'LukaszLuminski'],
  url: siteUrl,
  jobTitle: 'Vue/Nuxt Product Engineer',
  description:
    'Vue/Nuxt product engineer building modern web apps, Node.js backends, and useful AI-powered workflows.',
  knowsAbout: [
    'Vue 3',
    'Nuxt 3',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Prisma',
    'OpenAI API',
    'RAG',
    'AI workflows'
  ],
  sameAs: [
    'https://github.com/LukaszLuminski',
    'https://www.linkedin.com/in/lukasz-luminski'
  ]
}

useSeoMeta({
  title: 'Lukasz Luminski Portfolio',
  description:
    'Portfolio of Lukasz Luminski, a Vue/Nuxt product engineer building modern web apps, Node.js backends, and useful AI-powered workflows.',
  author: 'Lukasz Luminski',
  ogTitle: 'Lukasz Luminski Portfolio',
  ogDescription:
    'Vue/Nuxt product engineering, Node.js backends, and practical AI-powered workflows.',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(personJsonLd)
    }
  ]
})
</script>

<template>
  <main>
    <HeroSection :content="hero" />
  </main>
</template>
