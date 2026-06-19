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
  <div class="container relative">
    <div
      class="grid gap-10 lg:grid-cols-[minmax(250px,0.55fr)_minmax(0,1.45fr)] lg:gap-14"
    >
      <div class="lg:sticky lg:top-28 lg:self-start lg:pl-2">
        <p
          class="text-sm font-semibold uppercase tracking-[0.22em]"
          :class="eyebrowClass"
        >
          {{ eyebrow }}
        </p>
        <h2
          class="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-5xl"
        >
          {{ title }}
        </h2>
        <p class="text-white/68 mt-5 max-w-lg text-base leading-7 sm:text-lg">
          {{ intro }}
        </p>
      </div>

      <slot />
    </div>
  </div>
</template>
