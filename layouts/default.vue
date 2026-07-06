<script setup lang="ts">
import SiteHeader from '~/features/navigation/SiteHeader.vue'
import SiteFooter from '~/features/navigation/SiteFooter.vue'
import PortfolioAssistant from '~/features/assistant/PortfolioAssistant.vue'
import { heroContent } from '~/features/hero/content'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader :content="heroContent" />
    <slot />
    <SiteFooter :name="heroContent.name" />
    <PortfolioAssistant />
  </div>
</template>
