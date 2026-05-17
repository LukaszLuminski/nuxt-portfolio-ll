<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    text: string
    delay?: number
    speed?: number
    cursorHeightClass?: string
    align?: 'center' | 'left'
  }>(),
  {
    delay: 700,
    speed: 42,
    cursorHeightClass: 'h-[1.05em]',
    align: 'center'
  }
)

const displayedText = ref('')
const isComplete = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | undefined

function clearTypingTimer() {
  if (!timeoutId) return

  clearTimeout(timeoutId)
  timeoutId = undefined
}

function typeNextCharacter(index = 0) {
  if (index >= props.text.length) {
    isComplete.value = true
    return
  }

  displayedText.value = props.text.slice(0, index + 1)
  timeoutId = setTimeout(() => typeNextCharacter(index + 1), props.speed)
}

function startTyping() {
  clearTypingTimer()
  displayedText.value = ''
  isComplete.value = false
  timeoutId = setTimeout(() => typeNextCharacter(), props.delay)
}

onMounted(startTyping)
onBeforeUnmount(clearTypingTimer)

watch(() => props.text, startTyping)
</script>

<template>
  <span class="relative inline-block max-w-full overflow-hidden whitespace-nowrap" :aria-label="text">
    <span class="invisible" aria-hidden="true">{{ text }}</span>
    <span
      class="absolute inset-0 inline-flex items-center whitespace-nowrap"
      :class="align === 'center' ? 'justify-center' : 'justify-start'"
      aria-hidden="true"
    >
      <span>{{ displayedText }}</span>
      <span
        class="ml-1 inline-block w-px bg-white"
        :class="[cursorHeightClass, isComplete ? 'animate-pulse' : '']"
      />
    </span>
  </span>
</template>
