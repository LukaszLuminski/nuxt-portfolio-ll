<script setup lang="ts">
import { computed } from 'vue'
import { Languages } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { locale, locales, setLocale, t } = useI18n()

const availableLocales = computed(() =>
  locales.value.map((item) => {
    if (typeof item === 'string') {
      return {
        code: item,
        name: item.toUpperCase()
      }
    }

    return {
      code: item.code,
      name: item.code.toUpperCase()
    }
  })
)
</script>

<template>
  <div
    class="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
    :aria-label="t('locale.switchLabel')"
  >
    <Languages class="ml-2 size-4 text-muted-foreground" aria-hidden="true" />
    <button
      v-for="item in availableLocales"
      :key="item.code"
      type="button"
      class="rounded-full px-2.5 py-1.5 text-xs font-semibold transition hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      :class="item.code === locale ? 'bg-white text-slate-950' : 'text-muted-foreground'"
      :aria-pressed="item.code === locale"
      @click="setLocale(item.code)"
    >
      {{ item.name }}
    </button>
  </div>
</template>
