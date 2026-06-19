<script setup lang="ts">
import { ArrowUpRight, Code2, ExternalLink } from 'lucide-vue-next'
import type { Component } from 'vue'
import SectionDivider from '~/components/portfolio/SectionDivider.vue'
import SectionSplitLayout from '~/components/portfolio/SectionSplitLayout.vue'
import { groupItems } from '~/utils/groupItems'
import { rememberProjectPosition } from '~/utils/portfolioNavigation'
import type { Project, ProjectLink, ProjectsContent } from './types'

const { content, projects } = defineProps<{
  content: ProjectsContent
  projects: readonly Project[]
}>()

const groupedProjects = computed(() => groupItems(content.groups, projects))

const linkIcons = {
  live: ExternalLink,
  code: Code2
} satisfies Record<ProjectLink['type'], Component>

const { setCardGlow } = useCardGlow()
</script>

<template>
  <section
    id="work"
    class="relative overflow-hidden bg-[#08090b] py-20 text-white sm:py-28"
  >
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(214,231,236,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(214,231,236,0.045)_1px,transparent_1px)] bg-[size:44px_44px]"
    />
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,rgba(48,79,88,0.24),transparent_42%),radial-gradient(ellipse_at_88%_0%,rgba(82,49,26,0.30),transparent_38%),radial-gradient(circle_at_16%_30%,rgba(14,165,233,0.085),transparent_30%),radial-gradient(circle_at_88%_26%,rgba(150,82,34,0.095),transparent_30%),linear-gradient(180deg,rgba(7,8,9,0.56),rgba(7,8,10,0.92)_29%,rgba(7,9,13,0.99)_58%)]"
    />
    <div
      class="via-[#08090b]/82 absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050608]/55 to-transparent"
    />

    <SectionSplitLayout
      :eyebrow="content.eyebrow"
      :title="content.title"
      :intro="content.intro"
    >
      <div class="space-y-14">
        <section
          v-for="{ group, label, items } in groupedProjects"
          :key="group"
          :aria-labelledby="`${group}-projects-title`"
        >
          <SectionDivider
            class="mb-5"
            :label="label"
            :heading-id="`${group}-projects-title`"
          />

          <div class="grid gap-4 md:grid-cols-2">
            <article
              v-for="{
                title,
                slug,
                summary,
                image,
                imageAlt,
                stack,
                links
              } in items"
              :id="`project-${slug}`"
              :key="title"
              class="group relative flex min-h-[420px] scroll-mt-28 overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle_at_var(--spotlight-x,50%)_var(--spotlight-y,0%),rgba(56,189,248,0.16),transparent_34%),rgba(255,255,255,0.04)] shadow-line transition duration-300 hover:bg-white/[0.06] hover:shadow-[0_24px_70px_rgba(3,7,18,0.48)]"
              @mousemove="setCardGlow"
            >
              <NuxtLink
                :to="`/projects/${slug}`"
                class="absolute inset-0 z-10"
                :aria-label="`Read more about ${title}`"
                @click="rememberProjectPosition(slug)"
              />

              <div class="flex w-full flex-col">
                <div class="relative aspect-[16/10] overflow-hidden">
                  <img
                    :src="image"
                    :alt="imageAlt"
                    class="h-full w-full object-cover opacity-[0.86] transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-[#080a0f] via-transparent to-transparent"
                  />
                </div>

                <div class="flex flex-1 flex-col bg-[#090c12]/85 p-5 sm:p-6">
                  <div>
                    <h4 class="text-xl font-semibold leading-snug text-white">
                      {{ title }}
                    </h4>
                    <p class="text-white/66 mt-3 text-sm leading-6">
                      {{ summary }}
                    </p>
                  </div>

                  <div class="mt-5 flex flex-wrap gap-2">
                    <span
                      v-for="item in stack"
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
                      v-for="{ href, label: linkLabel, type } in links"
                      :key="href"
                      :href="href"
                      target="_blank"
                      rel="noreferrer"
                      class="border-white/12 text-white/72 relative z-20 inline-flex h-10 items-center gap-2 rounded border bg-black/20 px-3 text-sm font-medium transition hover:border-amber-200/45 hover:text-white"
                    >
                      <component :is="linkIcons[type]" class="size-4" />
                      {{ linkLabel }}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </SectionSplitLayout>
  </section>
</template>
