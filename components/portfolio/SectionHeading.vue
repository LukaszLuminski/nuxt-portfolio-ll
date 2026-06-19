<script setup lang="ts">
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
  <div>
    <p
      class="text-sm font-semibold uppercase tracking-[0.22em]"
      :class="eyebrowClass"
    >
      {{ eyebrow }}
    </p>
    <h2
      class="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-[2.3rem] lg:whitespace-nowrap"
    >
      {{ title }}
    </h2>
    <p class="text-white/68 mt-5 max-w-lg text-base leading-7 sm:text-lg">
      {{ intro }}
    </p>
  </div>
</template>
