<script setup lang="ts">
defineProps<{
  label: string
  headingId?: string
}>()
</script>

<template>
  <div class="flex items-center gap-4">
    <h3
      :id="headingId"
      class="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/55"
    >
      {{ label }}
    </h3>
    <div
      class="h-px flex-1 bg-gradient-to-r from-sky-300/25 via-white/10 to-transparent"
    />
  </div>
</template>
