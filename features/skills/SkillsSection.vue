<script setup lang="ts">
import { BookOpen, Braces, FlaskConical, Store } from 'lucide-vue-next'
import type { Component } from 'vue'
import SectionDivider from '~/components/portfolio/SectionDivider.vue'
import SectionSplitLayout from '~/components/portfolio/SectionSplitLayout.vue'
import { groupItems } from '~/utils/groupItems'
import type { Skill, SkillIcon, SkillsContent } from './types'

const { content } = defineProps<{
  content: SkillsContent
}>()

const lucideIcons = {
  code: Braces,
  store: Store,
  storybook: BookOpen,
  test: FlaskConical
} satisfies Record<Extract<SkillIcon, { type: 'lucide' }>['name'], Component>

const groupedSkills = computed(() => groupItems(content.groups, content.skills))

function getLucideIcon(skill: Skill) {
  return skill.icon.type === 'lucide' ? lucideIcons[skill.icon.name] : null
}

const { setCardGlow } = useCardGlow()
</script>

<template>
  <section
    id="skills"
    class="relative overflow-hidden bg-[#07090d] py-20 text-white sm:py-28"
  >
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(214,231,236,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(214,231,236,0.04)_1px,transparent_1px)] bg-[size:44px_44px]"
    />
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_8%_8%,rgba(245,158,11,0.12),transparent_34%),radial-gradient(ellipse_at_92%_6%,rgba(14,165,233,0.15),transparent_36%),linear-gradient(180deg,rgba(8,9,11,0.92),rgba(7,9,13,0.98)_46%,rgba(5,7,12,1))]"
    />
    <div
      class="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07090d] to-transparent"
    />

    <SectionSplitLayout
      :eyebrow="content.eyebrow"
      :title="content.title"
      :intro="content.intro"
      eyebrow-class="text-amber-100/55"
    >
      <div class="space-y-12">
        <section
          v-for="{ group, label, items } in groupedSkills"
          :key="group"
          :aria-labelledby="`${group}-skills-title`"
        >
          <SectionDivider
            class="mb-5"
            :label="label"
            :heading-id="`${group}-skills-title`"
          />

          <div class="grid gap-4 sm:grid-cols-2">
            <article
              v-for="skill in items"
              :key="skill.title"
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
                      :is="getLucideIcon(skill)"
                      v-else
                      class="text-sky-100/82 size-7"
                      :stroke-width="1.6"
                    />
                  </div>

                  <div class="min-w-0">
                    <h4 class="text-xl font-semibold leading-snug text-white">
                      {{ skill.title }}
                    </h4>
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
          </div>
        </section>
      </div>
    </SectionSplitLayout>
  </section>
</template>
