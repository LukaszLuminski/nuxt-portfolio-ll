<script setup lang="ts">
import SectionDivider from '~/components/portfolio/SectionDivider.vue'
import SectionHeading from '~/components/portfolio/SectionHeading.vue'
import { groupItems } from '~/utils/groupItems'
import ProjectCard from './ProjectCard.vue'
import type { Project, ProjectsContent } from './types'

const { content, projects } = defineProps<{
  content: ProjectsContent
  projects: readonly Project[]
}>()

const projectItems = computed(() => {
  const value = unref(projects)

  return Array.isArray(value) ? value : []
})
const groupedProjects = computed(() =>
  groupItems(content.groups, projectItems.value)
)
const clientProjects = computed(() =>
  groupedProjects.value.find(({ group }) => group === 'client')
)
const remainingProjectGroups = computed(() =>
  groupedProjects.value.filter(({ group }) => group !== 'client')
)
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

    <div class="container relative">
      <div class="grid gap-x-4 gap-y-14 lg:grid-cols-3">
        <SectionHeading
          class="lg:self-start lg:pt-16"
          :eyebrow="content.eyebrow"
          :title="content.title"
          :intro="content.intro"
        />

        <section
          v-if="clientProjects"
          class="lg:col-span-2"
          :aria-labelledby="`${clientProjects.group}-projects-title`"
        >
          <SectionDivider
            class="mb-5"
            :label="clientProjects.label"
            :heading-id="`${clientProjects.group}-projects-title`"
          />

          <div class="grid gap-4 md:grid-cols-2">
            <ProjectCard
              v-for="project in clientProjects.items"
              :key="project.slug"
              :project="project"
            />
          </div>
        </section>

        <section
          v-for="{ group, label, items } in remainingProjectGroups"
          :key="group"
          class="lg:col-span-3"
          :aria-labelledby="`${group}-projects-title`"
        >
          <SectionDivider
            class="mb-5"
            :label="label"
            :heading-id="`${group}-projects-title`"
          />

          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              v-for="project in items"
              :key="project.slug"
              :project="project"
            />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
