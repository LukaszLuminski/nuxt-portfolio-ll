<script setup lang="ts">
import AboutSection from '~/features/about/AboutSection.vue'
import { useAboutContent } from '~/features/about/useAboutContent'
import ContactSection from '~/features/contact/ContactSection.vue'
import { useContactContent } from '~/features/contact/useContactContent'
import HeroSection from '~/features/hero/HeroSection.vue'
import { useHeroContent } from '~/features/hero/useHeroContent'
import ProjectsSection from '~/features/projects/ProjectsSection.vue'
import type { Project } from '~/features/projects/types'
import { useProjectsContent } from '~/features/projects/useProjectsContent'
import SkillsSection from '~/features/skills/SkillsSection.vue'
import { useSkillsContent } from '~/features/skills/useSkillsContent'

const hero = useHeroContent()
const projectsContent = useProjectsContent()
const skillsContent = useSkillsContent()
const aboutContent = useAboutContent()
const contactContent = useContactContent()
const { data: projects } = await useAsyncData('projects', () =>
  $fetch<Project[]>('/api/projects')
)
const isRestoringProjectScroll = ref(false)
const resolvedProjects = computed(() => projects.value ?? [])
const siteUrl = useRuntimeConfig().public.siteUrl
const sameAs = hero.social.map(({ href }) => href)

function restoreProjectScroll(slug: string) {
  const target = document.getElementById(`project-${slug}`)

  if (!target) {
    isRestoringProjectScroll.value = false
    return
  }

  window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 104)
  isRestoringProjectScroll.value = false
}

onBeforeMount(() => {
  isRestoringProjectScroll.value = Boolean(sessionStorage.getItem('portfolio-return-project'))
})

onMounted(() => {
  let stop: (() => void) | undefined

  stop = watch(
    resolvedProjects,
    async ({ length }) => {
      const slug = sessionStorage.getItem('portfolio-return-project')

      if (!slug || !length) {
        return
      }

      stop?.()
      sessionStorage.removeItem('portfolio-return-project')
      sessionStorage.removeItem('portfolio-scroll-y')

      await nextTick()
      requestAnimationFrame(() => restoreProjectScroll(slug))
    },
    { immediate: true }
  )
})

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteUrl}/#person`,
  name: hero.name,
  alternateName: ['Łukasz Łumiński', hero.brandLabel],
  url: siteUrl,
  jobTitle: 'Frontend Developer',
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
  <main :class="isRestoringProjectScroll ? 'opacity-0' : ''">
    <HeroSection :content="hero" />
    <ProjectsSection :content="projectsContent" :projects="resolvedProjects" />
    <SkillsSection :content="skillsContent" />
    <AboutSection :content="aboutContent" />
    <ContactSection :content="contactContent" />
  </main>
</template>
