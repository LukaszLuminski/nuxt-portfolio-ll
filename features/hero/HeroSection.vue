<script setup lang="ts">
import {
  Github,
  Linkedin,
  Menu
} from 'lucide-vue-next'
import TypedHeroLine from './TypedHeroLine.vue'
import type { HeroContent } from './types'

const { content } = defineProps<{
  content: HeroContent
}>()

const [brandMain, brandAccent = ''] = content.brandLabel.split(/(?=Luminski$)/)

const ctaLinks = [
  { label: content.primaryCta, href: '#work' },
  { label: content.secondaryCta, href: '#about' }
]

const socialIcons = [Github, Linkedin]
</script>

<template>
  <section class="relative min-h-screen overflow-hidden bg-[#060708] text-white">
    <img
      src="/images/legacy-hero-bg.jpg"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
    >
    <div class="absolute inset-0 bg-black/15" />
    <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,8,0)_0%,rgba(4,6,8,0.08)_44%,rgba(4,6,8,0.34)_100%)]" />

    <div class="container relative flex min-h-screen flex-col">
      <header
        v-motion
        :initial="{ opacity: 0, y: -16 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 520 } }"
        class="flex items-center justify-between py-6 sm:py-8"
      >
        <NuxtLink to="/" class="group flex items-center gap-3">
          <span class="text-xl font-normal tracking-normal text-white sm:text-2xl">
            {{ brandMain }}<span class="text-white/60">{{ brandAccent }}</span>
          </span>
        </NuxtLink>

        <nav class="hidden items-center gap-8 md:flex">
          <NuxtLink
            v-for="item in content.nav"
            :key="item.href"
            :to="item.href"
            class="group relative py-2 text-lg font-normal text-white transition duration-300"
          >
            <span class="transition duration-300 group-hover:text-white/75">
              {{ item.label }}
            </span>
            <span class="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </NuxtLink>
        </nav>

        <button
          type="button"
          class="inline-flex size-11 items-center justify-center rounded-full text-white md:hidden"
          aria-label="Navigation menu"
        >
          <Menu class="size-7" />
        </button>
      </header>

      <div class="flex flex-1 items-center justify-center pb-12 pt-8 text-center sm:pb-16">
        <div class="mx-auto flex w-full max-w-3xl flex-col items-center">
          <h1
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { duration: 620, delay: 320 } }"
            class="w-full max-w-[560px] text-balance text-5xl font-light leading-tight tracking-normal text-white sm:text-6xl"
          >
            <TypedHeroLine
              :text="content.introLabel"
              :delay="520"
              :speed="48"
              cursor-height-class="h-[0.9em]"
            />
          </h1>

          <div
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { duration: 520, delay: 1900 } }"
            class="mt-4 min-h-[48px] w-full max-w-[560px] text-[2rem] font-normal leading-snug text-white sm:text-[2.33rem]"
          >
            <TypedHeroLine :text="content.headline" :delay="2200" :speed="42" />
          </div>

          <p
            v-motion
            :initial="{ opacity: 0, y: 18 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 520, delay: 3440 } }"
            class="mt-4 max-w-[483px] text-pretty text-base leading-7 text-white/80 sm:text-lg"
          >
            {{ content.subheadline }}
          </p>

          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 520, delay: 3900 } }"
            class="mt-12 flex flex-wrap items-center justify-center gap-12 text-white/70"
          >
            <a
              v-for="(item, index) in content.social"
              :key="item.href"
              :href="item.href"
              target="_blank"
              rel="noreferrer"
              :aria-label="item.label"
              class="transition duration-300 hover:text-white"
            >
              <component :is="socialIcons[index]" class="size-12 sm:size-14" :stroke-width="1.5" />
            </a>
          </div>

          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 520, delay: 4300 } }"
            class="mt-12 flex w-full max-w-[382px] flex-col gap-4"
          >
            <NuxtLink
              v-for="item in ctaLinks"
              :key="item.href"
              :to="item.href"
              class="inline-flex h-[54px] w-full items-center justify-center rounded px-8 text-sm font-medium uppercase tracking-[0.18em] text-slate-950 transition duration-300 bg-white/70 hover:bg-white/90"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="sr-only">
        <span v-for="metric in content.metrics" :key="metric.label">
          {{ metric.value }} {{ metric.label }}.
        </span>
        {{ content.positioning }}
        {{ content.technologies.join(', ') }}
      </div>
    </div>
  </section>
</template>
