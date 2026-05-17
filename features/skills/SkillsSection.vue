<script setup lang="ts">
import {
  Bot,
  BrainCircuit,
  Database,
  ServerCog,
  Workflow
} from 'lucide-vue-next'
import type { Skill, SkillGroup, SkillsContent } from './types'

const { content } = defineProps<{
  content: SkillsContent
}>()

const lucideIcons = {
  bot: Bot,
  brain: BrainCircuit,
  database: Database,
  server: ServerCog,
  workflow: Workflow
}

const groupedSkills = computed(() =>
  Object.entries(content.groups).map(([group, label]) => ({
    group: group as SkillGroup,
    label,
    skills: content.skills.filter((skill) => skill.group === group)
  }))
)

function getLucideIcon(skill: Skill) {
  return skill.icon.type === 'lucide' ? lucideIcons[skill.icon.name] : null
}

function setCardGlow(event: MouseEvent) {
  const element = event.currentTarget as HTMLElement
  const { left, top } = element.getBoundingClientRect()

  element.style.setProperty('--spotlight-x', `${event.clientX - left}px`)
  element.style.setProperty('--spotlight-y', `${event.clientY - top}px`)
}
</script>

<template>
  <section
    id="skills"
    class="relative overflow-hidden bg-[#07090d] py-20 text-white sm:py-28"
  >
    <div class="absolute inset-0 bg-[linear-gradient(rgba(214,231,236,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(214,231,236,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_8%_8%,rgba(245,158,11,0.12),transparent_34%),radial-gradient(ellipse_at_92%_6%,rgba(14,165,233,0.15),transparent_36%),linear-gradient(180deg,rgba(8,9,11,0.92),rgba(7,9,13,0.98)_46%,rgba(5,7,12,1))]" />
    <div class="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07090d] to-transparent" />

    <div class="container relative">
      <div class="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-amber-100/55">
            {{ content.eyebrow }}
          </p>
          <h2 class="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {{ content.title }}
          </h2>
          <p class="mt-5 max-w-lg text-base leading-7 text-white/68 sm:text-lg">
            {{ content.intro }}
          </p>
        </div>

        <div class="space-y-10">
          <section
            v-for="{ group, label, skills } in groupedSkills"
            :key="group"
            :aria-labelledby="`${group}-skills-title`"
          >
            <div class="mb-4 flex items-center gap-4">
              <h3
                :id="`${group}-skills-title`"
                class="text-sm font-semibold uppercase tracking-[0.2em] text-amber-50/55"
              >
                {{ label }}
              </h3>
              <div class="h-px flex-1 bg-gradient-to-r from-amber-200/24 via-white/10 to-transparent" />
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <article
                v-for="skill in skills"
                :key="skill.title"
                class="group relative flex min-h-[244px] overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle_at_var(--spotlight-x,50%)_var(--spotlight-y,0%),rgba(56,189,248,0.16),transparent_34%),rgba(255,255,255,0.04)] shadow-line transition duration-300 hover:bg-white/[0.06] hover:shadow-[0_24px_70px_rgba(3,7,18,0.48)]"
                @mousemove="setCardGlow"
              >
                <div class="flex w-full flex-col bg-[#090c12]/85 p-5">
                  <div class="flex items-start gap-4">
                    <div class="flex size-14 shrink-0 items-center justify-center rounded border border-white/10 bg-black/24">
                      <img
                        v-if="skill.icon.type === 'image'"
                        :src="skill.icon.src"
                        :alt="`${skill.title} logo`"
                        class="size-9 object-contain"
                        loading="lazy"
                      >
                      <component
                        :is="getLucideIcon(skill)"
                        v-else
                        class="size-7 text-sky-100/82"
                        :stroke-width="1.6"
                      />
                    </div>

                    <div class="min-w-0">
                      <h4 class="text-xl font-semibold leading-snug text-white">
                        {{ skill.title }}
                      </h4>
                      <p class="mt-2 text-sm leading-6 text-white/66">
                        {{ skill.description }}
                      </p>
                    </div>
                  </div>

                  <div class="mt-5 flex flex-wrap gap-2">
                    <span
                      v-for="highlight in skill.highlights"
                      :key="highlight"
                      class="rounded border border-sky-100/12 bg-sky-100/[0.035] px-2.5 py-1 text-xs font-medium text-sky-50/68"
                    >
                      {{ highlight }}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
