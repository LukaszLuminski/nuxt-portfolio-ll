<script setup lang="ts">
import SectionDivider from '~/components/portfolio/SectionDivider.vue'
import SectionHeading from '~/components/portfolio/SectionHeading.vue'
import { groupItems } from '~/utils/groupItems'
import SkillCard from './SkillCard.vue'
import type { SkillsContent } from './types'

const { content } = defineProps<{
  content: SkillsContent
}>()

const groupedSkills = computed(() => groupItems(content.groups, content.skills))
const foundationSkills = computed(() =>
  groupedSkills.value.find(({ group }) => group === 'foundations')
)
const remainingSkillGroups = computed(() =>
  groupedSkills.value.filter(({ group }) => group !== 'foundations')
)
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

    <div class="container relative">
      <div class="grid gap-x-4 gap-y-12 lg:grid-cols-3">
        <SectionHeading
          class="lg:self-start lg:pt-24"
          :eyebrow="content.eyebrow"
          :title="content.title"
          :intro="content.intro"
          eyebrow-class="text-amber-100/55"
        />

        <section
          v-if="foundationSkills"
          class="lg:col-span-2"
          :aria-labelledby="`${foundationSkills.group}-skills-title`"
        >
          <SectionDivider
            class="mb-5"
            :label="foundationSkills.label"
            :heading-id="`${foundationSkills.group}-skills-title`"
          />

          <div class="grid gap-4 sm:grid-cols-2">
            <SkillCard
              v-for="skill in foundationSkills.items"
              :key="skill.title"
              :skill="skill"
            />
          </div>
        </section>

        <section
          v-for="{ group, label, items } in remainingSkillGroups"
          :key="group"
          class="lg:col-span-3"
          :aria-labelledby="`${group}-skills-title`"
        >
          <SectionDivider
            class="mb-5"
            :label="label"
            :heading-id="`${group}-skills-title`"
          />

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SkillCard
              v-for="skill in items"
              :key="skill.title"
              :skill="skill"
            />
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
