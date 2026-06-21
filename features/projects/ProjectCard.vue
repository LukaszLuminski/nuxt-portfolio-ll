<script setup lang="ts">
import { ArrowUpRight, Code2, ExternalLink } from '@lucide/vue'
import type { Component } from 'vue'
import { rememberProjectPosition } from '~/utils/portfolioNavigation'
import type { Project, ProjectLink } from './types'

const { project } = defineProps<{
  project: Project
}>()

const linkIcons = {
  live: ExternalLink,
  code: Code2
} satisfies Record<ProjectLink['type'], Component>

const { setCardGlow } = useCardGlow()
</script>

<template>
  <article
    :id="`project-${project.slug}`"
    class="group relative flex min-h-[420px] scroll-mt-28 overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle_at_var(--spotlight-x,50%)_var(--spotlight-y,0%),rgba(56,189,248,0.16),transparent_34%),rgba(255,255,255,0.04)] shadow-line transition duration-300 hover:bg-white/[0.06] hover:shadow-[0_24px_70px_rgba(3,7,18,0.48)]"
    @mousemove="setCardGlow"
  >
    <NuxtLink
      :to="`/projects/${project.slug}`"
      class="absolute inset-0 z-10"
      :aria-label="`Read more about ${project.title}`"
      @click="rememberProjectPosition(project.slug)"
    />

    <div class="flex w-full flex-col">
      <div class="relative aspect-[16/10] overflow-hidden">
        <img
          :src="project.image"
          :alt="project.imageAlt"
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover opacity-[0.86] transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent"
        />
      </div>

      <div class="flex flex-1 flex-col bg-[#090c12]/85 p-5 sm:p-6">
        <div>
          <h3 class="text-xl font-semibold leading-snug text-white">
            {{ project.title }}
          </h3>
          <p class="text-white/66 mt-3 text-sm leading-6">
            {{ project.summary }}
          </p>
        </div>

        <div class="mt-5 flex flex-wrap gap-2">
          <span
            v-for="item in project.stack"
            :key="item"
            class="border-sky-100/12 text-sky-50/68 rounded border bg-sky-100/[0.035] px-2.5 py-1 text-xs font-medium"
          >
            {{ item }}
          </span>
        </div>

        <div class="mt-auto flex flex-wrap items-center gap-3 pt-8">
          <span
            class="pointer-events-none relative z-20 inline-flex h-10 items-center gap-2 rounded bg-white px-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(255,255,255,0.10)] transition duration-300 group-hover:shadow-[0_0_34px_rgba(255,255,255,0.18)]"
          >
            Details
            <ArrowUpRight class="size-4" />
          </span>
          <a
            v-for="{ href, label, type } in project.links"
            :key="href"
            :href="href"
            target="_blank"
            rel="noreferrer"
            class="border-white/12 text-white/72 relative z-20 inline-flex h-10 items-center gap-2 rounded border bg-black/20 px-3 text-sm font-medium transition hover:border-amber-200/45 hover:text-white"
          >
            <component :is="linkIcons[type]" class="size-4" />
            {{ label }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
