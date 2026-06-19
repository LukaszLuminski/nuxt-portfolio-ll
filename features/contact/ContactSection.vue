<script setup lang="ts">
import { Github, Linkedin, LoaderCircle, Send } from 'lucide-vue-next'
import type { ContactContent, ContactLink } from './types'

const { content } = defineProps<{
  content: ContactContent
}>()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  company: '',
  startedAt: Date.now()
})
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const statusMessage = ref('')

const linkIcons = {
  github: Github,
  linkedin: Linkedin
}

function getLinkIcon(link: ContactLink) {
  return linkIcons[link.type]
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  form.company = ''
  form.startedAt = Date.now()
}

async function submitContactForm() {
  status.value = 'submitting'
  statusMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        ...form,
        elapsedMs: Date.now() - form.startedAt
      }
    })

    status.value = 'success'
    statusMessage.value = content.successMessage
    resetForm()
  } catch {
    status.value = 'error'
    statusMessage.value = content.errorMessage
  }
}
</script>

<template>
  <section
    id="contact"
    class="relative overflow-hidden bg-[#05070c] py-20 text-white sm:py-28"
  >
    <div class="absolute inset-0 bg-[linear-gradient(rgba(214,231,236,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(214,231,236,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(14,165,233,0.13),transparent_34%),radial-gradient(ellipse_at_88%_8%,rgba(245,158,11,0.11),transparent_34%),linear-gradient(180deg,rgba(6,8,13,1),rgba(5,7,12,0.99)_52%,rgba(3,5,9,1))]" />
    <div class="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#06080d] to-transparent" />

    <div class="container relative">
      <div class="grid gap-10 lg:grid-cols-[minmax(250px,0.55fr)_minmax(0,1.45fr)] lg:gap-12">
        <div class="lg:sticky lg:top-28 lg:self-start">
          <p class="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200/55">
            {{ content.eyebrow }}
          </p>
          <h2 class="mt-4 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {{ content.title }}
          </h2>
          <p class="mt-5 max-w-lg text-base leading-7 text-white/68 sm:text-lg">
            {{ content.intro }}
          </p>
        </div>

        <div class="grid gap-5">
          <div class="flex items-center gap-4">
            <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/55">
              {{ content.formLabel }}
            </h3>
            <div class="h-px flex-1 bg-gradient-to-r from-sky-300/25 via-white/10 to-transparent" />
          </div>

          <form
            class="rounded border border-white/10 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.12),transparent_34%),rgba(255,255,255,0.04)] p-5 shadow-line sm:p-6"
            @submit.prevent="submitContactForm"
          >
            <div class="hidden" aria-hidden="true">
              <label for="company">Company</label>
              <input
                id="company"
                v-model="form.company"
                name="company"
                type="text"
                tabindex="-1"
                autocomplete="off"
              >
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <label class="grid gap-2 text-sm font-medium text-white/72">
                Name
                <input
                  v-model.trim="form.name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  minlength="2"
                  maxlength="80"
                  class="h-12 rounded border border-white/10 bg-[#090c12]/85 px-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-sky-200/45 focus:ring-2 focus:ring-sky-300/15"
                  placeholder="Your name"
                >
              </label>

              <label class="grid gap-2 text-sm font-medium text-white/72">
                Email
                <input
                  v-model.trim="form.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  maxlength="120"
                  class="h-12 rounded border border-white/10 bg-[#090c12]/85 px-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-sky-200/45 focus:ring-2 focus:ring-sky-300/15"
                  placeholder="you@example.com"
                >
              </label>
            </div>

            <label class="mt-4 grid gap-2 text-sm font-medium text-white/72">
              Subject
              <input
                v-model.trim="form.subject"
                name="subject"
                type="text"
                required
                minlength="3"
                maxlength="120"
                class="h-12 rounded border border-white/10 bg-[#090c12]/85 px-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-sky-200/45 focus:ring-2 focus:ring-sky-300/15"
                placeholder="What should we talk about?"
              >
            </label>

            <label class="mt-4 grid gap-2 text-sm font-medium text-white/72">
              Message
              <textarea
                v-model.trim="form.message"
                name="message"
                required
                minlength="20"
                maxlength="4000"
                rows="7"
                class="min-h-[180px] resize-y rounded border border-white/10 bg-[#090c12]/85 px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-sky-200/45 focus:ring-2 focus:ring-sky-300/15"
                placeholder="A few useful details about the project, role, or workflow..."
              />
            </label>

            <div class="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                class="inline-flex h-12 items-center justify-center gap-2 rounded bg-white px-5 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(255,255,255,0.10)] transition duration-300 hover:bg-sky-50 hover:shadow-[0_0_34px_rgba(255,255,255,0.18)] disabled:cursor-not-allowed disabled:opacity-55"
                :disabled="status === 'submitting'"
              >
                <LoaderCircle v-if="status === 'submitting'" class="size-4 animate-spin" />
                <Send v-else class="size-4" />
                {{ status === 'submitting' ? 'Sending...' : content.submitLabel }}
              </button>

              <p
                v-if="statusMessage"
                class="text-sm leading-6"
                :class="status === 'success' ? 'text-sky-100/78' : 'text-amber-100/78'"
                role="status"
              >
                {{ statusMessage }}
              </p>
            </div>
          </form>

          <div class="flex items-center gap-4 pt-5">
            <h3 class="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/55">
              {{ content.linksLabel }}
            </h3>
            <div class="h-px flex-1 bg-gradient-to-r from-sky-300/25 via-white/10 to-transparent" />
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <a
              v-for="link in content.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noreferrer"
              class="group rounded border border-white/10 bg-[#090c12]/85 p-5 shadow-line transition duration-300 hover:bg-white/[0.06] hover:shadow-[0_24px_70px_rgba(3,7,18,0.48)]"
            >
              <div class="flex items-center gap-4">
                <span class="flex size-12 shrink-0 items-center justify-center rounded border border-white/10 bg-black/24 text-sky-100/82">
                  <component :is="getLinkIcon(link)" class="size-6" :stroke-width="1.7" />
                </span>
                <span class="min-w-0">
                  <span class="block text-lg font-semibold leading-snug text-white">
                    {{ link.label }}
                  </span>
                  <span class="mt-1 block break-words text-sm leading-6 text-white/62 transition group-hover:text-white/78">
                    {{ link.value }}
                  </span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
