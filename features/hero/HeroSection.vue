<script setup lang="ts">
import BrandIcon from '~/components/icons/BrandIcon.vue'
import type { HeroContent } from './types'

const { content } = defineProps<{
  content: HeroContent
}>()

const ctaLinks = [
  { label: content.primaryCta, sectionId: 'work' },
  { label: content.secondaryCta, sectionId: 'about' }
]

function scrollToSection(sectionId: string) {
  document
    .getElementById(sectionId)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section
    class="relative min-h-screen overflow-hidden bg-[#060708] text-white"
  >
    <picture>
      <source
        media="(max-width: 639px)"
        srcset="/images/hero-mobile.webp"
        type="image/webp"
      />
      <img
        src="/images/legacy-hero-bg.jpg"
        alt=""
        width="2000"
        height="1324"
        data-hero-image
        fetchpriority="high"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </picture>
    <div class="absolute inset-0 bg-black/30" />
    <div
      class="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,8,0.05)_0%,rgba(4,6,8,0.16)_44%,rgba(4,6,8,0.58)_100%)]"
    />

    <div class="container relative flex min-h-screen flex-col pt-20">
      <div
        class="flex flex-1 items-center justify-center pb-10 pt-6 text-center sm:pb-16 sm:pt-8"
      >
        <div
          class="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center"
        >
          <h1
            class="w-full max-w-[620px] text-[2rem] font-normal leading-[1.08] tracking-normal text-white sm:text-[3.25rem]"
          >
            {{ content.introLabel }}
          </h1>

          <div
            class="mt-3 w-full max-w-[620px] text-[1.75rem] font-normal leading-[1.12] text-white sm:text-[2.77rem]"
          >
            {{ content.headline }}
          </div>

          <p
            class="mt-6 max-w-[420px] text-balance text-center text-[0.95rem] font-medium leading-6 text-white/80 sm:max-w-[620px] sm:text-lg sm:leading-7"
          >
            {{ content.subheadline }}
          </p>

          <div
            class="mt-10 flex flex-wrap items-center justify-center gap-12 text-white/70 sm:mt-12"
          >
            <a
              v-for="{ href, label, type } in content.social"
              :key="href"
              :href="href"
              target="_blank"
              rel="noreferrer"
              :aria-label="label"
              class="transition duration-300 hover:text-white"
            >
              <BrandIcon
                :type="type"
                class="size-12 sm:size-14"
                :stroke-width="1.5"
              />
            </a>
          </div>

          <div class="mt-10 flex w-full max-w-[382px] flex-col gap-4 sm:mt-12">
            <button
              v-for="{ label, sectionId } in ctaLinks"
              :key="sectionId"
              type="button"
              class="inline-flex h-[54px] w-full items-center justify-center rounded bg-white/70 px-8 text-sm font-medium uppercase tracking-[0.18em] text-slate-950 transition duration-300 hover:bg-white/90"
              @click="scrollToSection(sectionId)"
            >
              {{ label }}
            </button>
          </div>
        </div>
      </div>

      <div class="sr-only">
        <span v-for="{ label, value } in content.metrics" :key="label">
          {{ value }} {{ label }}.
        </span>
        {{ content.positioning }}
        {{ content.technologies.join(', ') }}
      </div>
    </div>
  </section>
</template>
