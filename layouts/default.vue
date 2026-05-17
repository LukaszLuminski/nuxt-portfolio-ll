<script setup lang="ts">
import SiteHeader from '~/features/navigation/SiteHeader.vue'
import { useHeroContent } from '~/features/hero/useHeroContent'

const hero = useHeroContent()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader :content="hero" />
    <slot />
  </div>
</template>
