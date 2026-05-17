<script setup lang="ts">
import {
  Code2,
  ExternalLink
} from 'lucide-vue-next'
import type { Project, ProjectGroup, ProjectsContent } from './types'

const props = defineProps<{
  content: ProjectsContent
  projects: Project[]
}>()

const groupedProjects = computed(() =>
  Object.entries(props.content.groups).map(([group, label]) => ({
    group: group as ProjectGroup,
    label,
    projects: props.projects.filter(({ group: projectGroup }) => projectGroup === group)
  }))
)

const linkIcons = {
  live: ExternalLink,
  code: Code2
}
</script>

<template>
  <section id="work" class="bg-[#07090d] py-20 text-white sm:py-28">
    <div class="container">
      <div class="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <div class="lg:sticky lg:top-10 lg:self-start">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
            {{ content.eyebrow }}
          </p>
          <h2 class="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {{ content.title }}
          </h2>
          <p class="mt-5 max-w-lg text-base leading-7 text-white/65 sm:text-lg">
            {{ content.intro }}
          </p>
        </div>

        <div class="space-y-12">
          <section
            v-for="{ group, label, projects } in groupedProjects"
            :key="group"
            :aria-labelledby="`${group}-projects-title`"
          >
            <div class="mb-4 flex items-center gap-4">
              <h3
                :id="`${group}-projects-title`"
                class="text-sm font-semibold uppercase tracking-[0.2em] text-white/50"
              >
                {{ label }}
              </h3>
              <div class="h-px flex-1 bg-white/10" />
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <article
                v-for="project in projects"
                :key="project.title"
                class="flex min-h-[260px] flex-col rounded border border-white/10 bg-white/[0.035] p-5 shadow-line transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]"
              >
                <div>
                  <h4 class="text-xl font-semibold leading-snug text-white">
                    {{ project.title }}
                  </h4>
                  <p class="mt-3 text-sm leading-6 text-white/62">
                    {{ project.summary }}
                  </p>
                </div>

                <div class="mt-5 flex flex-wrap gap-2">
                  <span
                    v-for="item in project.stack"
                    :key="item"
                    class="rounded border border-white/10 px-2.5 py-1 text-xs font-medium text-white/58"
                  >
                    {{ item }}
                  </span>
                </div>

                <div class="mt-auto flex flex-wrap gap-3 pt-8">
                  <a
                    v-for="link in project.links"
                    :key="link.href"
                    :href="link.href"
                    target="_blank"
                    rel="noreferrer"
                    class="inline-flex h-10 items-center gap-2 rounded border border-white/12 px-3 text-sm font-medium text-white/72 transition hover:border-white/28 hover:text-white"
                  >
                    <component :is="linkIcons[link.type]" class="size-4" />
                    {{ link.label }}
                  </a>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
