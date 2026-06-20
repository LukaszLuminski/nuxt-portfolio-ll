<script setup lang="ts">
import { Menu, X } from '@lucide/vue'
import type { HeroContent } from '~/features/hero/types'
import { storeTargetSection } from '~/utils/portfolioNavigation'

const { content } = defineProps<{
  content: HeroContent
}>()

const route = useRoute()
const isMobileNavOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('')
const [brandMain, brandAccent = ''] = content.brandLabel.split(/(?=Luminski$)/)
const hasHeaderSurface = computed(
  () => route.path !== '/' || isScrolled.value || isMobileNavOpen.value
)
const navItems = computed(() =>
  content.nav.map(({ href, label }) => ({
    href,
    label,
    sectionId: href.replace('#', '')
  }))
)
const isMeasuredSection = (
  section: { sectionId: string; top: number } | undefined
): section is { sectionId: string; top: number } => Boolean(section)

function updateScrollState() {
  isScrolled.value = window.scrollY > 16
}

function updateActiveSection() {
  if (route.path !== '/') {
    activeSection.value = ''
    return
  }

  const threshold = window.innerHeight * 0.38
  const currentSection = navItems.value
    .map(({ sectionId }) => {
      const element = document.getElementById(sectionId)

      return element
        ? { sectionId, top: element.getBoundingClientRect().top }
        : undefined
    })
    .filter(isMeasuredSection)
    .filter(({ top }) => top <= threshold)
    .at(-1)

  activeSection.value = currentSection?.sectionId ?? ''
}

function updateHeaderState() {
  updateScrollState()
  updateActiveSection()
}

function scrollToSection(id: string) {
  isMobileNavOpen.value = false

  if (route.path !== '/') {
    storeTargetSection(id)
    return navigateTo('/')
  }

  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  updateHeaderState()
  window.addEventListener('scroll', updateHeaderState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateHeaderState)
})

watch(
  () => route.path,
  async () => {
    await nextTick()
    updateHeaderState()
  }
)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 text-white transition duration-300"
    :class="
      hasHeaderSurface
        ? 'border-b border-white/10 bg-[#05070c]/70 backdrop-blur-xl'
        : 'border-b border-transparent bg-transparent'
    "
  >
    <div class="container flex h-20 items-center justify-between">
      <NuxtLink
        to="/"
        class="group flex items-center gap-3"
        @click="isMobileNavOpen = false"
      >
        <span
          class="text-xl font-normal tracking-normal text-white sm:text-2xl"
        >
          {{ brandMain }}<span class="text-white/60">{{ brandAccent }}</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <button
          v-for="{ href, label, sectionId } in navItems"
          :key="href"
          type="button"
          class="group relative py-2 text-lg font-normal text-white transition duration-300"
          :aria-current="activeSection === sectionId ? 'true' : undefined"
          @click="scrollToSection(sectionId)"
        >
          <span
            class="transition duration-300 group-hover:text-white/75"
            :class="activeSection === sectionId ? 'text-sky-100' : ''"
          >
            {{ label }}
          </span>
          <span
            class="absolute bottom-0 left-0 h-px bg-white transition-all duration-300 group-hover:w-full"
            :class="activeSection === sectionId ? 'w-full bg-sky-100' : 'w-0'"
          />
        </button>
      </nav>

      <button
        type="button"
        class="inline-flex size-11 items-center justify-center rounded-full text-white md:hidden"
        aria-label="Navigation menu"
        :aria-expanded="isMobileNavOpen"
        aria-controls="mobile-navigation"
        @click="isMobileNavOpen = !isMobileNavOpen"
      >
        <X v-if="isMobileNavOpen" class="size-7" />
        <Menu v-else class="size-7" />
      </button>
    </div>

    <nav
      id="mobile-navigation"
      class="container pb-4 md:hidden"
      :class="isMobileNavOpen ? 'block' : 'hidden'"
    >
      <div class="rounded border border-white/15 bg-black/55 p-2">
        <button
          v-for="{ href, label, sectionId } in navItems"
          :key="href"
          type="button"
          class="block w-full rounded px-4 py-3 text-left text-base font-medium text-white transition hover:bg-white/10"
          :class="activeSection === sectionId ? 'bg-white/10 text-sky-100' : ''"
          :aria-current="activeSection === sectionId ? 'true' : undefined"
          @click="scrollToSection(sectionId)"
        >
          {{ label }}
        </button>
      </div>
    </nav>
  </header>
</template>
