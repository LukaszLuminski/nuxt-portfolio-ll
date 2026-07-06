<script setup lang="ts">
import {
  ArrowUpRight,
  Download,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  X
} from '@lucide/vue'
import {
  assistantConstraints,
  type AssistantHistoryItem,
  type AssistantResponse,
  type AssistantSource
} from '~/shared/assistant'
import {
  clearTargetSection,
  storeTargetSection
} from '~/utils/portfolioNavigation'
import { scrollToSectionWhenAvailable } from '~/utils/sectionNavigation'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: AssistantSource[]
  isError?: boolean
}

const starterQuestions = [
  'What does Lukasz work with?',
  'Tell me about his leadership experience.',
  'Which project best shows his Nuxt skills?'
] as const

const sessionKey = 'portfolio-assistant-messages-v2'
const route = useRoute()
const isOpen = ref(false)
const isSending = ref(false)
const isAtPageTop = ref(route.path === '/')
const draft = ref('')
const messages = ref<ChatMessage[]>([])
const trigger = ref<HTMLButtonElement>()
const dialog = ref<HTMLElement>()
const closeButton = ref<HTMLButtonElement>()
const input = ref<HTMLTextAreaElement>()
const messageList = ref<HTMLElement>()
let messageSequence = 0

function updateTriggerMode() {
  isAtPageTop.value = route.path === '/' && window.scrollY <= 16
}

function focusComposer(desktopOnly = false) {
  if (desktopOnly && !window.matchMedia('(min-width: 640px)').matches) {
    return
  }

  input.value?.focus({ preventScroll: true })
}

function createMessageId() {
  messageSequence += 1
  return `${Date.now()}-${messageSequence}`
}

function isStoredMessage(value: unknown): value is ChatMessage {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  const message = value as Partial<ChatMessage>

  return (
    typeof message.id === 'string' &&
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.length > 0 &&
    message.content.length <= assistantConstraints.history.maxContentLength
  )
}

function restoreMessages() {
  try {
    const stored = sessionStorage.getItem(sessionKey)
    const parsed: unknown = stored ? JSON.parse(stored) : []

    if (Array.isArray(parsed)) {
      messages.value = parsed.filter(isStoredMessage).slice(-12)
    }
  } catch {
    sessionStorage.removeItem(sessionKey)
  }
}

function persistMessages() {
  const persistentMessages = messages.value.filter(({ isError }) => !isError)
  sessionStorage.setItem(
    sessionKey,
    JSON.stringify(persistentMessages.slice(-12))
  )
}

async function scrollToLatestMessage() {
  await nextTick()

  messageList.value?.scrollTo({
    top: messageList.value.scrollHeight,
    behavior: 'smooth'
  })
}

async function openAssistant() {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  await nextTick()
  if (window.matchMedia('(min-width: 640px)').matches) {
    focusComposer()
  } else {
    closeButton.value?.focus({ preventScroll: true })
  }
  await scrollToLatestMessage()
}

async function closeAssistant() {
  isOpen.value = false
  document.body.style.overflow = ''
  await nextTick()
  trigger.value?.focus()
}

function isDownloadSource({ href }: AssistantSource) {
  return href.toLowerCase().endsWith('.pdf')
}

async function navigateToSource({ href }: AssistantSource) {
  isOpen.value = false
  document.body.style.overflow = ''
  const sectionId = href.split('#')[1]

  if (!sectionId) {
    await navigateTo(href)
    return
  }

  if (route.path !== '/') {
    storeTargetSection(sectionId)
    await navigateTo('/')
  } else {
    clearTargetSection()
  }

  await nextTick()

  if (await scrollToSectionWhenAvailable(sectionId, 'smooth')) {
    clearTargetSection()
  }
}

function resetConversation() {
  messages.value = []
  draft.value = ''
  sessionStorage.removeItem(sessionKey)
  nextTick(() => focusComposer(true))
}

function conversationHistory(): AssistantHistoryItem[] {
  return messages.value
    .filter(({ isError }) => !isError)
    .slice(-assistantConstraints.history.maxItems)
    .map(({ content, role }) => ({ content, role }))
}

function requestErrorMessage(status: number) {
  if (status === 429) {
    return 'A few people are asking questions right now. Please try again in a moment.'
  }

  if (status === 503) {
    return 'The assistant is temporarily unavailable. You can still view the resume or contact Lukasz directly.'
  }

  return 'I could not answer that just now. Please try again.'
}

async function sendMessage(question = draft.value) {
  const message = question.trim()
  const { min, max } = assistantConstraints.message

  if (isSending.value || message.length < min || message.length > max) {
    return
  }

  const history = conversationHistory()
  messages.value.push({
    id: createMessageId(),
    role: 'user',
    content: message
  })
  draft.value = ''
  isSending.value = true
  await scrollToLatestMessage()

  try {
    const response = await fetch('/api/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    })

    if (!response.ok) {
      throw new Error(String(response.status))
    }

    const result = (await response.json()) as AssistantResponse

    if (!result.answer) {
      throw new Error('502')
    }

    messages.value.push({
      id: createMessageId(),
      role: 'assistant',
      content: result.answer,
      sources: result.sources
    })
  } catch (error) {
    const status = Number(error instanceof Error ? error.message : 0)

    messages.value.push({
      id: createMessageId(),
      role: 'assistant',
      content: requestErrorMessage(status),
      isError: true
    })
  } finally {
    isSending.value = false
    persistMessages()
    await scrollToLatestMessage()
  }
}

function handleDialogKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeAssistant()
    return
  }

  if (event.key !== 'Tab' || !dialog.value) {
    return
  }

  const focusable = Array.from(
    dialog.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled])'
    )
  ).filter((element) => element.offsetParent !== null)

  if (focusable.length === 0) {
    return
  }

  const first = focusable[0]
  const last = focusable.at(-1)

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

onMounted(async () => {
  restoreMessages()
  await nextTick()
  updateTriggerMode()
  window.addEventListener('scroll', updateTriggerMode, { passive: true })
  window.addEventListener('resize', updateTriggerMode, { passive: true })
})

watch(
  () => route.path,
  async () => {
    await nextTick()
    requestAnimationFrame(updateTriggerMode)
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('scroll', updateTriggerMode)
  window.removeEventListener('resize', updateTriggerMode)
})
</script>

<template>
  <button
    v-if="!isOpen"
    ref="trigger"
    type="button"
    class="assistant-trigger group fixed bottom-4 right-0 z-[80] inline-flex h-12 items-center justify-start overflow-hidden rounded-l border border-r-0 border-sky-100/25 bg-[#081018]/95 px-[15px] text-sm font-semibold text-white shadow-[0_18px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-[width,background-color,border-color] duration-300 hover:border-sky-100/45 hover:bg-[#0b1722] sm:bottom-6 sm:right-6 sm:rounded sm:border"
    :class="isAtPageTop ? 'assistant-trigger--expanded border-sky-100/35' : ''"
    aria-haspopup="dialog"
    @click="openAssistant"
  >
    <Sparkles class="size-4 shrink-0 text-sky-200" aria-hidden="true" />
    <span
      class="assistant-trigger__label ml-2.5 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300"
    >
      Ask about my work
    </span>
  </button>

  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[90]">
      <button
        type="button"
        class="absolute inset-0 hidden bg-black/55 backdrop-blur-sm sm:block"
        aria-label="Close portfolio assistant"
        @click="closeAssistant"
      />

      <section
        ref="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-assistant-title"
        class="sm:border-white/12 absolute inset-x-0 top-0 flex h-[100dvh] max-h-[100dvh] min-h-0 flex-col overflow-hidden bg-[#070a0f] text-white sm:inset-auto sm:bottom-4 sm:right-4 sm:h-[min(680px,calc(100dvh-2rem))] sm:w-[420px] sm:rounded sm:border sm:shadow-[0_30px_100px_rgba(0,0,0,0.68)]"
        @keydown="handleDialogKeydown"
      >
        <header
          class="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#090d13] px-4"
        >
          <div class="flex min-w-0 items-center gap-3">
            <span
              class="flex size-9 shrink-0 items-center justify-center rounded border border-sky-100/15 bg-sky-100/[0.06] text-sky-100"
            >
              <MessageCircle class="size-4" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <p class="text-white/48 text-xs font-medium">
                Portfolio assistant
              </p>
              <h2
                id="portfolio-assistant-title"
                class="truncate text-base font-semibold text-white"
              >
                Ask about Lukasz
              </h2>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <button
              type="button"
              class="inline-flex size-9 items-center justify-center rounded text-white/60 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-35"
              title="Reset conversation"
              aria-label="Reset conversation"
              :disabled="messages.length === 0 || isSending"
              @click="resetConversation"
            >
              <RotateCcw class="size-4" />
            </button>
            <button
              ref="closeButton"
              type="button"
              class="inline-flex size-9 items-center justify-center rounded text-white/60 transition hover:bg-white/[0.07] hover:text-white"
              title="Close assistant"
              aria-label="Close assistant"
              @click="closeAssistant"
            >
              <X class="size-5" />
            </button>
          </div>
        </header>

        <div
          ref="messageList"
          class="min-h-0 flex-1 overflow-y-auto px-4 py-5"
          aria-live="polite"
        >
          <div class="flex gap-3">
            <span
              class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded border border-sky-100/15 bg-sky-100/[0.055] text-sky-100"
            >
              <Sparkles class="size-3.5" aria-hidden="true" />
            </span>
            <p class="text-white/72 max-w-[290px] text-sm leading-6">
              Hi. Ask me about Lukasz's experience, projects, or frontend work.
            </p>
          </div>

          <div v-if="messages.length === 0" class="mt-6 grid gap-2 pl-10">
            <button
              v-for="question in starterQuestions"
              :key="question"
              type="button"
              class="text-white/72 rounded border border-white/10 bg-white/[0.035] px-3 py-2.5 text-left text-sm leading-5 transition hover:border-sky-100/25 hover:bg-sky-100/[0.055] hover:text-white"
              @click="sendMessage(question)"
            >
              {{ question }}
            </button>
          </div>

          <div class="mt-6 grid gap-5">
            <article
              v-for="message in messages"
              :key="message.id"
              class="min-w-0"
              :class="message.role === 'user' ? 'pl-10' : 'pr-5'"
            >
              <div
                class="text-sm leading-6"
                :class="
                  message.role === 'user'
                    ? 'ml-auto w-fit max-w-full rounded bg-white px-3.5 py-2.5 text-slate-950'
                    : message.isError
                      ? 'text-amber-50/76 border-l-2 border-amber-300/45 pl-3'
                      : 'text-white/76 whitespace-pre-wrap border-l-2 border-sky-300/35 pl-3'
                "
              >
                {{ message.content }}
              </div>

              <div
                v-if="message.sources?.length"
                class="mt-3 flex flex-wrap gap-2 pl-3"
              >
                <template v-for="source in message.sources" :key="source.id">
                  <a
                    v-if="isDownloadSource(source)"
                    :href="source.href"
                    download
                    class="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-xs font-medium text-sky-100/70 transition hover:border-sky-100/30 hover:text-sky-50"
                  >
                    {{ source.label }}
                    <Download class="size-3" />
                  </a>
                  <a
                    v-else
                    :href="source.href"
                    class="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-xs font-medium text-sky-100/70 transition hover:border-sky-100/30 hover:text-sky-50"
                    @click.prevent="navigateToSource(source)"
                  >
                    {{ source.label }}
                    <ArrowUpRight class="size-3" />
                  </a>
                </template>
              </div>
            </article>

            <div v-if="isSending" class="flex items-center gap-3 pr-5">
              <span
                class="flex size-7 shrink-0 items-center justify-center rounded border border-sky-100/15 bg-sky-100/[0.055] text-sky-100"
              >
                <LoaderCircle class="size-3.5 animate-spin" />
              </span>
              <span class="text-sm text-white/45">Thinking...</span>
            </div>
          </div>
        </div>

        <form
          class="shrink-0 border-t border-white/10 bg-[#090d13] p-3"
          @submit.prevent="sendMessage()"
        >
          <div
            class="border-white/12 flex items-end gap-2 rounded border bg-[#05070b] p-2 transition focus-within:border-sky-200/35 focus-within:ring-2 focus-within:ring-sky-300/10"
          >
            <textarea
              ref="input"
              v-model="draft"
              rows="1"
              :maxlength="assistantConstraints.message.max"
              class="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-base leading-6 text-white outline-none placeholder:text-white/30"
              placeholder="Ask a question..."
              aria-label="Question for the portfolio assistant"
              :disabled="isSending"
              @keydown.enter.exact.prevent="sendMessage()"
            />
            <button
              type="submit"
              class="inline-flex size-10 shrink-0 items-center justify-center rounded bg-white text-slate-950 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Send question"
              :disabled="
                isSending ||
                draft.trim().length < assistantConstraints.message.min
              "
            >
              <LoaderCircle v-if="isSending" class="size-4 animate-spin" />
              <Send v-else class="size-4" />
            </button>
          </div>
        </form>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.assistant-trigger {
  width: 48px;
}

.assistant-trigger__label {
  max-width: 0;
  opacity: 0;
}

.assistant-trigger--expanded,
.assistant-trigger:hover,
.assistant-trigger:focus-visible {
  width: 190px;
}

.assistant-trigger--expanded .assistant-trigger__label,
.assistant-trigger:hover .assistant-trigger__label,
.assistant-trigger:focus-visible .assistant-trigger__label {
  max-width: 150px;
  opacity: 1;
}
</style>
