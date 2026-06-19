<script setup lang="ts">
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
    <div class="absolute inset-0 bg-[linear-gradient(rgba(214,231,236,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(214,231,236,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_10%,rgba(14,165,233,0.12),transparent_36%),radial-gradient(ellipse_at_86%_20%,rgba(245,158,11,0.10),transparent_32%),linear-gradient(180deg,rgba(5,7,12,1),rgba(7,9,13,0.98)_48%,rgba(6,8,13,1))]" />
    <div class="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#05070c] to-transparent" />

    <div class="container relative">
      <div class="grid gap-10 lg:grid-cols-[minmax(250px,0.55fr)_minmax(0,1.45fr)] lg:gap-12">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200/55">
            {{ content.eyebrow }}
          </p>
          <h2 class="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {{ content.title }}
          </h2>
          <p class="mt-5 max-w-lg text-base leading-7 text-white/68 sm:text-lg">
            {{ content.intro }}
          </p>
        </div>

        <div>
          <div class="flex items-center gap-4">
            <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/55">
              Personal background
            </h3>
            <div class="h-px flex-1 bg-gradient-to-r from-sky-300/25 via-white/10 to-transparent" />
          </div>

          <article class="mt-5 overflow-hidden rounded border border-white/10 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.12),transparent_34%),rgba(255,255,255,0.04)] shadow-line">
            <div class="flow-root bg-[#090c12]/85 p-6 sm:p-8">
            <figure class="mx-auto mb-6 w-full max-w-[220px] overflow-hidden rounded border border-white/10 bg-black/30 shadow-[0_18px_45px_rgba(0,0,0,0.32)] sm:float-left sm:mb-4 sm:mr-7 sm:w-[190px] lg:w-[200px]">
              <img
                :src="content.image"
                :alt="content.imageAlt"
                class="aspect-[2/3] h-auto w-full object-cover object-[50%_18%] opacity-95"
                loading="lazy"
              >
            </figure>

            <div class="space-y-5 text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
              <p v-for="paragraph in content.paragraphs" :key="paragraph">
                {{ paragraph }}
              </p>
            </div>
            </div>
          </article>

          <div class="mt-10 flex items-center gap-4">
          <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/55">
            At a glance
          </h3>
          <div class="h-px flex-1 bg-gradient-to-r from-sky-300/25 via-white/10 to-transparent" />
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-3">
            <div
              v-for="{ label, value } in content.milestones"
              :key="label"
              class="rounded border border-white/10 bg-[#090c12]/85 px-4 py-5 shadow-line"
            >
            <p class="whitespace-nowrap text-lg font-semibold leading-none text-white">
              {{ value }}
            </p>
            <p class="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100/52">
              {{ label }}
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
