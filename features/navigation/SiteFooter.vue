<script setup lang="ts">
import { ArrowUp } from 'lucide-vue-next'

const { name } = defineProps<{
  name: string
}>()

const currentYear = new Date().getFullYear()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer
    class="relative overflow-hidden border-t border-white/10 bg-[#05070c]"
  >
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_12%_100%,rgba(14,165,233,0.08),transparent_34%),radial-gradient(circle_at_90%_100%,rgba(245,158,11,0.06),transparent_30%)]"
    />

    <div
      class="container relative flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <p class="text-sm leading-5 text-white/60 sm:whitespace-nowrap">
        &copy; {{ currentYear }}. All rights reserved. Made with
        <span class="text-red-400" aria-label="love">♥</span> by {{ name }}
      </p>

      <button
        type="button"
        class="group inline-flex w-fit items-center gap-2.5 text-sm font-medium text-white/65 transition duration-300 hover:text-white"
        @click="scrollToTop"
      >
        <span
          class="inline-flex size-7 items-center justify-center rounded-full bg-white/85 text-slate-950 transition duration-300 group-hover:bg-white"
        >
          <ArrowUp class="size-4" />
        </span>
        Back to top
      </button>
    </div>
  </footer>
</template>
