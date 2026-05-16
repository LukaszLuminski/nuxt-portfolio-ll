<script setup lang="ts">
import {
  ArrowRight,
  Rocket,
  Sparkles
} from 'lucide-vue-next'
import type { HeroContent } from '~/types/hero'

defineProps<{
  content: HeroContent
}>()
</script>

<template>
  <section class="relative bg-hero-radial">
    <div class="absolute inset-0 bg-grid bg-[length:42px_42px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
    <div class="noise pointer-events-none absolute inset-0 opacity-[0.035]" />
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

    <div class="container relative flex flex-col pb-3 pt-6 sm:py-8 lg:pb-3 lg:pt-8 tall:lg:pt-10">
      <header
        v-motion
        :initial="{ opacity: 0, y: -12 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="flex items-center justify-between"
      >
        <NuxtLink to="/" class="flex items-center gap-3">
          <span class="relative flex size-9 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06]">
            <Sparkles class="size-4 text-secondary" />
            <span class="absolute inset-0 rounded-xl bg-secondary/20 blur-xl" />
          </span>
          <span class="text-sm font-semibold text-white">AI Product Engineer</span>
        </NuxtLink>

        <nav class="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm text-muted-foreground md:flex">
          <NuxtLink class="rounded-full px-4 py-2 transition hover:bg-white/[0.07] hover:text-white" to="#work">
            Work
          </NuxtLink>
          <NuxtLink class="rounded-full px-4 py-2 transition hover:bg-white/[0.07] hover:text-white" to="#systems">
            Systems
          </NuxtLink>
          <NuxtLink class="rounded-full px-4 py-2 transition hover:bg-white/[0.07] hover:text-white" to="#contact">
            Contact
          </NuxtLink>
        </nav>

        <UiButton href="mailto:hello@example.com" variant="secondary" class="hidden sm:inline-flex">
          Available for builds
        </UiButton>
      </header>

      <div class="grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-7 tall:lg:py-16">
        <div class="max-w-3xl">
          <div
            v-motion
            :initial="{ opacity: 0, y: 18 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 620, delay: 120 } }"
            class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-xs font-medium text-slate-200 tall:lg:mb-7"
          >
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-60" />
              <span class="relative inline-flex size-2 rounded-full bg-secondary" />
            </span>
            {{ content.eyebrow }}
            <span class="h-3 w-px bg-white/15" />
            <span class="text-muted-foreground">Vue/Nuxt + AI systems</span>
          </div>

          <h1
            v-motion
            :initial="{ opacity: 0, y: 22 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 210 } }"
            class="gradient-text max-w-5xl pb-3 text-balance text-5xl font-semibold leading-[0.98] sm:text-6xl lg:text-[3.55rem] tall:lg:text-[4.25rem]"
          >
            {{ content.headline }}
          </h1>

          <p
            v-motion
            :initial="{ opacity: 0, y: 18 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 650, delay: 330 } }"
            class="mt-5 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg tall:lg:mt-7 tall:lg:leading-8"
          >
            {{ content.subheadline }}
          </p>

          <div
            v-motion
            :initial="{ opacity: 0, y: 16 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 620, delay: 430 } }"
            class="mt-7 flex flex-col gap-3 sm:flex-row tall:lg:mt-9"
          >
            <UiButton href="#work" size="lg">
              {{ content.primaryCta }}
              <ArrowRight class="size-4 transition-transform group-hover:translate-x-0.5" />
            </UiButton>
            <UiButton href="mailto:hello@example.com" variant="secondary" size="lg">
              {{ content.secondaryCta }}
            </UiButton>
          </div>

          <div class="sr-only">
            <span v-for="metric in content.metrics" :key="metric.label">
              {{ metric.value }} {{ metric.label }}.
            </span>
          </div>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.96, y: 26 }"
          :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 780, delay: 280 } }"
          class="relative mx-auto w-full max-w-[500px] lg:ml-auto"
        >
          <div class="absolute -inset-8 rounded-[36px] bg-primary/10 blur-3xl" />
          <div class="relative rounded-[30px] border border-white/10 bg-white/[0.045] p-3 shadow-glow">
            <div
              role="img"
              aria-label="Placeholder portrait of an AI product engineer"
              class="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-white/10 bg-slate-950"
            >
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_58%_20%,rgba(96,165,250,0.36),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(251,146,60,0.22),transparent_24%),linear-gradient(145deg,#020617,#0b1220_54%,#111827)]" />
              <div class="absolute inset-0 bg-grid bg-[length:34px_34px] opacity-[0.14]" />
              <div class="absolute left-1/2 top-[12%] h-[230px] w-[230px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
              <div class="absolute left-1/2 top-[13%] h-[156px] w-[142px] -translate-x-1/2 rounded-[46%] bg-slate-200 shadow-[0_22px_70px_rgba(15,23,42,0.55)]" />
              <div class="absolute left-1/2 top-[10%] h-[88px] w-[176px] -translate-x-1/2 rounded-t-[70px] rounded-b-[34px] bg-slate-950" />
              <div class="absolute left-[44%] top-[24%] h-2 w-8 rounded-full bg-slate-700" />
              <div class="absolute left-[55%] top-[24%] h-2 w-8 rounded-full bg-slate-700" />
              <div class="absolute left-1/2 top-[34%] h-3 w-16 -translate-x-1/2 rounded-full bg-slate-500/70" />
              <div class="absolute left-1/2 top-[43%] h-[280px] w-[360px] -translate-x-1/2 rounded-t-[120px] bg-gradient-to-b from-slate-700 via-slate-900 to-black" />
              <div class="absolute left-1/2 top-[48%] h-[170px] w-[260px] -translate-x-1/2 rounded-t-[64px] bg-slate-950/85" />
              <div class="absolute left-1/2 top-[54%] w-[220px] -translate-x-1/2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                <div class="h-2 w-24 rounded-full bg-secondary" />
                <div class="mt-3 h-2 w-36 rounded-full bg-primary" />
                <div class="mt-3 h-2 w-28 rounded-full bg-white/30" />
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div class="absolute inset-x-4 top-4 flex items-center justify-between">
                <div class="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white">
                  Product engineer
                </div>
                <div class="rounded-full border border-secondary/25 bg-secondary/15 px-3 py-1.5 text-xs font-semibold text-secondary">
                  AI SaaS builds
                </div>
              </div>

              <div class="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/55 p-4">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                      Product-minded engineer
                    </p>
                    <p class="mt-2 text-base font-semibold leading-6 text-white">
                      Vue/Nuxt interfaces, AI-ready data layers, and SaaS systems shipped end to end.
                    </p>
                  </div>
                  <Rocket class="mt-1 size-5 shrink-0 text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sr-only">
        {{ content.technologies.join(', ') }}
      </div>
    </div>
  </section>
</template>
