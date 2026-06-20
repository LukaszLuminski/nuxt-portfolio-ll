<script setup lang="ts">
import { BookOpen, Braces, FlaskConical, Store } from '@lucide/vue'
import type { Component } from 'vue'
import type { Skill, SkillIcon } from './types'

const { skill } = defineProps<{
  skill: Skill
}>()

const lucideIcons = {
  code: Braces,
  store: Store,
  storybook: BookOpen,
  test: FlaskConical
} satisfies Record<Extract<SkillIcon, { type: 'lucide' }>['name'], Component>

const lucideIcon = computed(() =>
  skill.icon.type === 'lucide' ? lucideIcons[skill.icon.name] : null
)
const { setCardGlow } = useCardGlow()
</script>

<template>
  <article
    class="group relative flex min-h-[244px] overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle_at_var(--spotlight-x,50%)_var(--spotlight-y,0%),rgba(56,189,248,0.16),transparent_34%),rgba(255,255,255,0.04)] shadow-line transition duration-300 hover:bg-white/[0.06] hover:shadow-[0_24px_70px_rgba(3,7,18,0.48)]"
    @mousemove="setCardGlow"
  >
    <div class="flex w-full flex-col bg-[#090c12]/85 p-5">
      <div class="flex items-start gap-4">
        <div
          class="bg-black/24 flex size-14 shrink-0 items-center justify-center rounded border border-white/10"
        >
          <img
            v-if="skill.icon.type === 'image'"
            :src="skill.icon.src"
            :alt="`${skill.title} logo`"
            class="size-9 object-contain"
            loading="lazy"
          />
          <component
            :is="lucideIcon"
            v-else
            class="text-sky-100/82 size-7"
            :stroke-width="1.6"
          />
        </div>

        <div class="min-w-0">
          <h3 class="text-xl font-semibold leading-snug text-white">
            {{ skill.title }}
          </h3>
          <p class="text-white/66 mt-2 text-sm leading-6">
            {{ skill.description }}
          </p>
        </div>
      </div>

      <div class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="highlight in skill.highlights"
          :key="highlight"
          class="border-sky-100/12 text-sky-50/68 rounded border bg-sky-100/[0.035] px-2.5 py-1 text-xs font-medium"
        >
          {{ highlight }}
        </span>
      </div>
    </div>
  </article>
</template>
