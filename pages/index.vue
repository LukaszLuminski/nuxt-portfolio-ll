<script setup lang="ts">
import HeroSection from '~/features/hero/HeroSection.vue'
import { useHeroContent } from '~/features/hero/useHeroContent'

const hero = useHeroContent()

useSeoMeta({
  title: 'AI Product Engineer Portfolio',
  description:
    'Modern portfolio for a Vue 3 developer transitioning into an AI-enabled full-stack product engineer.',
  ogTitle: 'AI Product Engineer Portfolio',
  ogDescription:
    'Vue, Nuxt, Node.js and LLM integrations for production-grade AI SaaS products.',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <main>
    <HeroSection :content="hero" />
  </main>
</template>
