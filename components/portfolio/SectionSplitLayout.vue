<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    intro: string
    eyebrowClass?: string
  }>(),
  {
    eyebrowClass: 'text-sky-200/55'
  }
)
</script>

<template>
  <div class="container relative">
    <div
      class="grid gap-10 lg:grid-cols-[minmax(270px,0.58fr)_minmax(0,1.42fr)] lg:gap-14"
    >
      <SectionHeading
        class="lg:sticky lg:top-28 lg:self-start lg:pl-2"
        :eyebrow="eyebrow"
        :title="title"
        :intro="intro"
        :eyebrow-class="eyebrowClass"
      />

      <slot />
    </div>
  </div>
</template>
