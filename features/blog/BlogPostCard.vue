<script setup lang="ts">
import { ArrowUpRight, CalendarDays, Clock3 } from '@lucide/vue'
import type { BlogPost } from './types'

const { post } = defineProps<{
  post: BlogPost
}>()

const { setCardGlow } = useCardGlow()
const publishedDate = computed(() =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(post.publishedAt))
)
</script>

<template>
  <article
    class="group relative overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle_at_var(--spotlight-x,50%)_var(--spotlight-y,0%),rgba(56,189,248,0.14),transparent_34%),rgba(255,255,255,0.04)] shadow-line transition duration-300 hover:bg-white/[0.06]"
    @mousemove="setCardGlow"
  >
    <NuxtLink
      :to="post.path"
      class="absolute inset-0 z-10"
      :aria-label="`Read ${post.title}`"
    />

    <div class="relative aspect-[16/9] overflow-hidden">
      <img
        :src="post.image.src"
        :alt="post.image.alt"
        width="800"
        height="450"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover opacity-[0.82] transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent"
      />
    </div>

    <div class="flex min-h-[300px] flex-col bg-[#090c12]/85 p-5 sm:p-6">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="border-sky-100/12 text-sky-50/68 rounded border bg-sky-100/[0.035] px-2.5 py-1 text-xs font-medium"
        >
          {{ tag }}
        </span>
      </div>

      <h2 class="mt-5 text-xl font-semibold leading-snug text-white">
        {{ post.title }}
      </h2>
      <p class="text-white/66 mt-3 text-sm leading-6">
        {{ post.description }}
      </p>

      <div
        class="text-white/58 mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-8 text-sm"
      >
        <span class="inline-flex items-center gap-2">
          <CalendarDays class="size-4" />
          {{ publishedDate }}
        </span>
        <span class="inline-flex items-center gap-2">
          <Clock3 class="size-4" />
          {{ post.readingTime }}
        </span>
      </div>

      <span
        class="pointer-events-none relative z-20 mt-5 inline-flex h-10 w-fit items-center gap-2 rounded bg-white px-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(255,255,255,0.10)] transition duration-300 group-hover:shadow-[0_0_34px_rgba(255,255,255,0.18)]"
      >
        Read note
        <ArrowUpRight class="size-4" />
      </span>
    </div>
  </article>
</template>
