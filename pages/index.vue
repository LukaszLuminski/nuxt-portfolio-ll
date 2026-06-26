<script setup lang="ts">
import { aboutContent } from '~/features/about/content'
import { contactContent } from '~/features/contact/content'
import HeroSection from '~/features/hero/HeroSection.vue'
import IntroScreen from '~/features/hero/IntroScreen.vue'
import { heroContent } from '~/features/hero/content'
import { projectsContent } from '~/features/projects/content'
import { skillsContent } from '~/features/skills/content'

const ProjectsSection = defineLazyHydrationComponent(
  'visible',
  () => import('~/features/projects/ProjectsSection.vue')
)
const SkillsSection = defineLazyHydrationComponent(
  'visible',
  () => import('~/features/skills/SkillsSection.vue')
)
const AboutSection = defineLazyHydrationComponent(
  'visible',
  () => import('~/features/about/AboutSection.vue')
)
const ContactSection = defineLazyHydrationComponent(
  'visible',
  () => import('~/features/contact/ContactSection.vue')
)

const { data: projects } = await useProjects()
const { isRestoringProjectScroll } = useProjectScrollRestoration()
useTargetSectionNavigation()
const hasPlayedIntro = useState('has-played-intro', () => false)
const {
  public: { siteUrl }
} = useRuntimeConfig()
const canonicalSiteUrl = siteUrl.replace(/\/$/, '')
const homeOgImage = `${canonicalSiteUrl}/images/legacy-hero-bg.jpg`
const sameAs = heroContent.social.map(({ href }) => href)
const homeTitle = `${heroContent.name} | Portfolio`
const homeDescription = `Portfolio of ${heroContent.name}, Frontend Developer specialising in Vue, Nuxt, and accessible TypeScript interfaces.`
const personSearchNames = [heroContent.name, heroContent.accentedName]

function finishIntro() {
  hasPlayedIntro.value = true
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${canonicalSiteUrl}/#person`,
  name: heroContent.name,
  alternateName: [heroContent.accentedName, heroContent.brandLabel],
  url: canonicalSiteUrl,
  jobTitle: 'Frontend Developer',
  description: homeDescription,
  knowsAbout: heroContent.technologies,
  sameAs
}

useSeoMeta({
  title: homeTitle,
  description: homeDescription,
  author: heroContent.name,
  keywords: [...personSearchNames, heroContent.brandLabel].join(', '),
  ogTitle: homeTitle,
  ogDescription: homeDescription,
  ogType: 'website',
  ogUrl: canonicalSiteUrl,
  ogImage: homeOgImage,
  twitterCard: 'summary_large_image'
})

useHead({
  titleTemplate: '%s',
  link: [{ rel: 'canonical', href: canonicalSiteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(personJsonLd)
    }
  ]
})
</script>

<template>
  <div class="contents">
    <IntroScreen
      v-if="!hasPlayedIntro"
      :name="heroContent.name"
      @finished="finishIntro"
    />

    <main :class="isRestoringProjectScroll ? 'invisible' : ''">
      <HeroSection :content="heroContent" />
      <ProjectsSection :content="projectsContent" :projects="projects" />
      <SkillsSection :content="skillsContent" />
      <AboutSection :content="aboutContent" />
      <ContactSection :content="contactContent" />
    </main>
  </div>
</template>
