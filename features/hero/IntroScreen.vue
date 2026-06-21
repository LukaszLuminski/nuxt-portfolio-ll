<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const { name } = defineProps<{
  name: string
}>()

const emit = defineEmits<{
  finished: []
}>()

const isLeaving = ref(false)
const timers = new Set<ReturnType<typeof setTimeout>>()
let isMounted = true

function wait(duration: number) {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      timers.delete(timer)
      resolve()
    }, duration)

    timers.add(timer)
  })
}

function waitForHeroImage() {
  const image = document.querySelector<HTMLImageElement>('[data-hero-image]')

  if (!image || image.complete) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const finish = () => resolve()

    image.addEventListener('load', finish, { once: true })
    image.addEventListener('error', finish, { once: true })
  })
}

async function waitForOpeningAssets() {
  const fontReady = document.fonts?.ready ?? Promise.resolve()

  await Promise.race([Promise.all([waitForHeroImage(), fontReady]), wait(1400)])
}

async function playIntro() {
  if (
    window.matchMedia(
      '(max-width: 639px), (prefers-reduced-motion: reduce)'
    ).matches
  ) {
    emit('finished')
    return
  }

  const startedAt = performance.now()
  await waitForOpeningAssets()
  await wait(Math.max(0, 650 - (performance.now() - startedAt)))

  if (!isMounted) {
    return
  }

  isLeaving.value = true
  await wait(680)

  if (isMounted) {
    emit('finished')
  }
}

onMounted(playIntro)

onBeforeUnmount(() => {
  isMounted = false
  timers.forEach(clearTimeout)
  timers.clear()
})
</script>

<template>
  <div
    class="intro-screen fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#05070c] text-white"
    :class="{ 'intro-screen--leaving': isLeaving }"
    aria-hidden="true"
    @touchmove.prevent
    @wheel.prevent
  >
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(214,231,236,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(214,231,236,0.025)_1px,transparent_1px)] bg-[size:44px_44px]"
    />
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(14,165,233,0.10),transparent_34%),radial-gradient(circle_at_78%_70%,rgba(245,158,11,0.08),transparent_32%)]"
    />

    <div class="intro-screen__content relative px-6 text-center">
      <p
        class="intro-screen__name text-3xl font-light tracking-[0.1em] sm:text-5xl"
      >
        {{ name }}
      </p>
      <div
        class="intro-screen__rule mx-auto mt-6 h-px w-36 overflow-hidden bg-white/10 sm:w-44"
      >
        <span
          class="block h-full bg-gradient-to-r from-sky-300/70 to-amber-300/70"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro-screen {
  clip-path: inset(0);
  transition: clip-path 680ms cubic-bezier(0.76, 0, 0.24, 1);
}

.intro-screen--leaving {
  clip-path: inset(0 0 100% 0);
}

.intro-screen__content {
  transition:
    opacity 260ms ease,
    transform 260ms ease;
}

.intro-screen--leaving .intro-screen__content {
  opacity: 0;
  transform: translateY(-10px);
}

.intro-screen__name {
  animation: intro-name-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.intro-screen__rule span {
  animation: intro-rule-in 620ms 120ms cubic-bezier(0.22, 1, 0.36, 1) both;
  transform-origin: left;
}

@keyframes intro-name-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes intro-rule-in {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

@media (max-width: 639px), (prefers-reduced-motion: reduce) {
  .intro-screen {
    display: none;
  }
}
</style>
