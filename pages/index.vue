<script setup lang="ts">
import HeroSection from '~/features/hero/HeroSection.vue'
import { useHeroContent } from '~/features/hero/useHeroContent'
import ProjectsSection from '~/features/projects/ProjectsSection.vue'
import { useProjectsContent } from '~/features/projects/useProjectsContent'

const hero = useHeroContent()
const projectsContent = useProjectsContent()
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').order('order', 'ASC').all()
)
const siteUrl = useRuntimeConfig().public.siteUrl
const sameAs = hero.social.map(({ href }) => href)

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: hero.name,
  alternateName: ['Łukasz Łumiński', hero.brandLabel],
  url: siteUrl,
  jobTitle: 'Vue/Nuxt Product Engineer',
  description: hero.positioning,
  knowsAbout: hero.technologies,
  sameAs
}

useSeoMeta({
  title: `${hero.name} Portfolio`,
  description: hero.positioning,
  author: hero.name,
  ogTitle: `${hero.name} Portfolio`,
  ogDescription: hero.positioning,
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
    <ProjectsSection :content="projectsContent" :projects="projects ?? []" />
  </main>
</template>
