<script setup lang="ts">
import { Download } from '@lucide/vue'
import BrandIcon from '~/components/icons/BrandIcon.vue'
import type { HeroContent } from './types'

const { content } = defineProps<{
  content: HeroContent
}>()

const ctaLinks = [
  {
    label: content.primaryCta,
    sectionId: 'work',
    className: 'bg-white/70 hover:bg-white/90'
  },
  {
    label: content.secondaryCta,
    sectionId: 'about',
    className: 'bg-white/[0.38] hover:bg-white/55'
  }
]

function scrollToSection(sectionId: string) {
  document
    .getElementById(sectionId)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section
    class="relative min-h-[100svh] min-h-screen overflow-hidden bg-[#060708] text-white"
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

    <div
      class="container relative flex min-h-[100svh] min-h-screen flex-col pt-14 sm:pt-20"
    >
      <div
        class="flex flex-1 items-center justify-center pb-20 text-center sm:pb-16 sm:pt-4"
      >
        <div
          class="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center"
        >
          <h1
            class="w-full max-w-[620px] text-[1.82rem] font-normal leading-[1.08] tracking-normal text-white sm:text-[3.25rem]"
          >
            {{ content.introLabel }}
          </h1>

          <div
            class="mt-2 w-full max-w-[620px] text-[1.55rem] font-normal leading-[1.12] text-white sm:mt-3 sm:text-[2.77rem]"
          >
            {{ content.headline }}
          </div>

          <p
            class="mt-5 max-w-[420px] text-balance text-center text-sm font-medium leading-5 text-white/80 sm:mt-6 sm:max-w-[620px] sm:text-lg sm:leading-7"
          >
            {{ content.subheadline }}
          </p>

          <div
            class="mt-6 flex flex-wrap items-center justify-center gap-10 text-white/70 sm:mt-10 sm:gap-12"
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
                class="size-10 sm:size-14"
                :stroke-width="1.5"
              />
            </a>
          </div>

          <div
            class="mt-6 flex w-full max-w-[360px] flex-col gap-2.5 sm:mt-12 sm:max-w-[382px] sm:gap-4"
          >
            <button
              v-for="{ label, sectionId, className } in ctaLinks"
              :key="sectionId"
              type="button"
              class="inline-flex h-12 w-full items-center justify-center rounded px-4 text-xs font-medium uppercase tracking-[0.14em] text-slate-950 transition duration-300 sm:h-[54px] sm:px-8 sm:text-sm sm:tracking-[0.18em]"
              :class="className"
              @click="scrollToSection(sectionId)"
            >
              {{ label }}
            </button>

            <a
              :href="content.resumeHref"
              download="lukasz_luminski_resume.pdf"
              class="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded border border-white/50 bg-black/20 px-4 text-xs font-medium uppercase tracking-[0.14em] text-white transition duration-300 hover:border-white/80 hover:bg-black/35 sm:h-[54px] sm:gap-3 sm:px-8 sm:text-sm sm:tracking-[0.18em]"
            >
              <Download class="size-4 shrink-0" aria-hidden="true" />
              {{ content.resumeCta }}
            </a>
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
