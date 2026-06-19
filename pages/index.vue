<script setup lang="ts">
import AboutSection from '~/features/about/AboutSection.vue'
import { aboutContent } from '~/features/about/content'
import ContactSection from '~/features/contact/ContactSection.vue'
import { contactContent } from '~/features/contact/content'
import HeroSection from '~/features/hero/HeroSection.vue'
import { heroContent } from '~/features/hero/content'
import ProjectsSection from '~/features/projects/ProjectsSection.vue'
import { projectsContent } from '~/features/projects/content'
import SkillsSection from '~/features/skills/SkillsSection.vue'
import { skillsContent } from '~/features/skills/content'

const { data: projects } = await useProjects()
const { isRestoringProjectScroll } = useProjectScrollRestoration(projects)
const {
  public: { siteUrl }
} = useRuntimeConfig()
const sameAs = heroContent.social.map(({ href }) => href)

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: heroContent.name,
  alternateName: ['Łukasz Łumiński', heroContent.brandLabel],
  url: siteUrl,
  jobTitle: 'Frontend Developer',
  description: heroContent.positioning,
  knowsAbout: heroContent.technologies,
  sameAs
}

useSeoMeta({
  title: `${heroContent.name} Portfolio`,
  description: heroContent.positioning,
  author: heroContent.name,
  ogTitle: `${heroContent.name} Portfolio`,
  ogDescription: heroContent.positioning,
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(personJsonLd)
    }
  ]
})
</script>

<template>
  <main :class="isRestoringProjectScroll ? 'opacity-0' : ''">
    <HeroSection :content="heroContent" />
    <ProjectsSection :content="projectsContent" :projects="projects" />
    <SkillsSection :content="skillsContent" />
    <AboutSection :content="aboutContent" />
    <ContactSection :content="contactContent" />
  </main>
</template>
