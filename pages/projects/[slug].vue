<script setup lang="ts">
import { ArrowLeft, Code2, ExternalLink } from '@lucide/vue'
import type { Component } from 'vue'
import type { ProjectLink } from '~/features/projects/types'
import { getProjectReturnState } from '~/utils/portfolioNavigation'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const {
  public: { siteUrl }
} = useRuntimeConfig()
const { data: projects } = await useProjects()

const project = computed(() =>
  projects.value.find(({ slug: projectSlug }) => projectSlug === slug.value)
)
const isEnteringFromProjectCard = ref(
  import.meta.client && Boolean(getProjectReturnState())
)
if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const linkIcons = {
  live: ExternalLink,
  code: Code2
} satisfies Record<ProjectLink['type'], Component>

onMounted(() => {
  if (!isEnteringFromProjectCard.value) {
    return
  }

  window.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  requestAnimationFrame(() => {
    isEnteringFromProjectCard.value = false
  })
})

useSeoMeta({
  title: () => `${project.value?.title} Project`,
  description: () => project.value?.summary ?? '',
  ogTitle: () => `${project.value?.title} Project`,
  ogDescription: () => project.value?.summary ?? '',
  ogImage: () => project.value?.image
})

useHead(() => ({
  link: [{ rel: 'canonical', href: `${siteUrl}/projects/${slug.value}` }]
}))
</script>

<template>
  <main
    v-if="project"
    class="min-h-screen bg-[#07090d] text-white"
    :class="isEnteringFromProjectCard ? 'invisible' : ''"
  >
    <section class="relative overflow-hidden pb-20 pt-28 sm:pb-28">
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:44px_44px]"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(245,158,11,0.14),transparent_26%),linear-gradient(180deg,rgba(7,9,13,0.28),rgba(7,9,13,0.98)_42%)]"
      />

      <div class="container relative">
        <NuxtLink
          to="/"
          class="text-white/62 inline-flex items-center gap-2 text-sm font-medium transition hover:text-white"
        >
          <ArrowLeft class="size-4" />
          Back to portfolio
        </NuxtLink>

        <div class="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p
              class="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200/55"
            >
              Project detail
            </p>
            <h1
              class="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-6xl"
            >
              {{ project.title }}
            </h1>
            <p class="text-white/68 mt-5 max-w-2xl text-lg leading-8">
              {{ project.summary }}
            </p>

            <div class="mt-8 flex flex-wrap gap-3">
              <a
                v-for="{ href, label, type } in project.links"
                :key="href"
                :href="href"
                target="_blank"
                rel="noreferrer"
                class="border-white/12 text-white/78 inline-flex h-11 items-center gap-2 rounded border bg-white/[0.045] px-4 text-sm font-medium transition hover:border-amber-200/45 hover:text-white"
              >
                <component :is="linkIcons[type]" class="size-4" />
                {{ label }}
              </a>
            </div>
          </div>

          <figure
            class="overflow-hidden rounded border border-white/10 bg-white/[0.035] shadow-line"
          >
            <img
              :src="project.image"
              :alt="project.imageAlt"
              width="800"
              height="500"
              fetchpriority="high"
              class="aspect-[16/10] w-full object-cover"
            />
          </figure>
        </div>

        <div class="mt-14 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
          <aside class="rounded border border-white/10 bg-white/[0.035] p-5">
            <h2
              class="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/55"
            >
              Stack
            </h2>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="item in project.stack"
                :key="item"
                class="border-sky-100/12 text-sky-50/68 rounded border bg-sky-100/[0.035] px-2.5 py-1 text-xs font-medium"
              >
                {{ item }}
              </span>
            </div>

            <dl class="mt-8 space-y-5 text-sm">
              <div v-if="project.frontEnd">
                <dt class="font-semibold text-white">Front end</dt>
                <dd class="text-white/62 mt-1">{{ project.frontEnd }}</dd>
              </div>
              <div v-if="project.backEnd">
                <dt class="font-semibold text-white">Back end</dt>
                <dd class="text-white/62 mt-1">{{ project.backEnd }}</dd>
              </div>
              <div v-if="project.database">
                <dt class="font-semibold text-white">Database</dt>
                <dd class="text-white/62 mt-1">{{ project.database }}</dd>
              </div>
            </dl>
          </aside>

          <section class="space-y-8">
            <div>
              <h2 class="text-2xl font-semibold text-white">What mattered</h2>
              <ul class="mt-5 grid gap-3 sm:grid-cols-3">
                <li
                  v-for="highlight in project.highlights"
                  :key="highlight"
                  class="text-white/72 rounded border border-white/10 bg-white/[0.035] p-4 text-sm font-medium leading-6"
                >
                  {{ highlight }}
                </li>
              </ul>
            </div>

            <div>
              <h2 class="text-2xl font-semibold text-white">Notes</h2>
              <div class="text-white/68 mt-5 space-y-4 text-base leading-8">
                <p v-for="item in project.details" :key="item">
                  {{ item }}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>
