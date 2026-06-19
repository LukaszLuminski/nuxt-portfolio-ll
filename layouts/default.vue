<script setup lang="ts">
import SiteHeader from '~/features/navigation/SiteHeader.vue'
import { heroContent } from '~/features/hero/content'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader :content="heroContent" />
    <slot />
  </div>
</template>
