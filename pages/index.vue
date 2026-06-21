<script setup lang="ts">
import { aboutContent } from '~/features/about/content'
import { contactContent } from '~/features/contact/content'
import HeroSection from '~/features/hero/HeroSection.vue'
import IntroScreen from '~/features/hero/IntroScreen.vue'
import { heroContent } from '~/features/hero/content'
import { projectsContent } from '~/features/projects/content'
import { skillsContent } from '~/features/skills/content'

const ProjectsSection = defineLazyHydrationComponent('visible', () =>
  import('~/features/projects/ProjectsSection.vue')
)
const SkillsSection = defineLazyHydrationComponent('visible', () =>
  import('~/features/skills/SkillsSection.vue')
)
const AboutSection = defineLazyHydrationComponent('visible', () =>
  import('~/features/about/AboutSection.vue')
)
const ContactSection = defineLazyHydrationComponent('visible', () =>
  import('~/features/contact/ContactSection.vue')
)

const { data: projects } = await useProjects()
const { isRestoringProjectScroll } = useProjectScrollRestoration()
const hasPlayedIntro = useState('has-played-intro', () => false)
const {
  public: { siteUrl }
} = useRuntimeConfig()
const sameAs = heroContent.social.map(({ href }) => href)

function finishIntro() {
  hasPlayedIntro.value = true
}

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
