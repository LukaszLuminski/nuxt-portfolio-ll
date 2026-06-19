<script setup lang="ts">
import SectionDivider from '~/components/portfolio/SectionDivider.vue'
import SectionSplitLayout from '~/components/portfolio/SectionSplitLayout.vue'
import type { AboutContent } from './types'

const { content } = defineProps<{
  content: AboutContent
}>()
</script>

<template>
  <section
    id="about"
    class="relative overflow-hidden bg-[#06080d] py-20 text-white sm:py-28"
  >
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(214,231,236,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(214,231,236,0.035)_1px,transparent_1px)] bg-[size:44px_44px]"
    />
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_10%,rgba(14,165,233,0.12),transparent_36%),radial-gradient(ellipse_at_86%_20%,rgba(245,158,11,0.10),transparent_32%),linear-gradient(180deg,rgba(5,7,12,1),rgba(7,9,13,0.98)_48%,rgba(6,8,13,1))]"
    />
    <div
      class="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#05070c] to-transparent"
    />

    <SectionSplitLayout
      :eyebrow="content.eyebrow"
      :title="content.title"
      :intro="content.intro"
    >
      <div>
        <SectionDivider label="Personal background" />

        <article
          class="mt-5 overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.12),transparent_34%),rgba(255,255,255,0.04)] shadow-line"
        >
          <div class="flow-root bg-[#090c12]/85 p-6 sm:p-8">
            <figure
              class="mx-auto mb-6 w-full max-w-[220px] overflow-hidden rounded border border-white/10 bg-black/30 shadow-[0_18px_45px_rgba(0,0,0,0.32)] sm:float-left sm:mb-4 sm:mr-7 sm:w-[190px] lg:w-[200px]"
            >
              <img
                :src="content.image"
                :alt="content.imageAlt"
                class="aspect-[2/3] h-auto w-full object-cover object-[50%_18%] opacity-95"
                loading="lazy"
              />
            </figure>

            <div
              class="text-white/68 space-y-5 text-sm leading-7 sm:text-base sm:leading-8"
            >
              <p v-for="paragraph in content.paragraphs" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </article>

        <SectionDivider class="mt-10" label="At a glance" />

        <div class="mt-5 grid gap-4 sm:grid-cols-3">
          <div
            v-for="{ label, value } in content.milestones"
            :key="label"
            class="rounded border border-white/10 bg-[#090c12]/85 px-4 py-5 shadow-line"
          >
            <p
              class="whitespace-nowrap text-lg font-semibold leading-none text-white"
            >
              {{ value }}
            </p>
            <p
              class="text-sky-100/52 mt-3 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              {{ label }}
            </p>
          </div>
        </div>
      </div>
    </SectionSplitLayout>
  </section>
</template>
