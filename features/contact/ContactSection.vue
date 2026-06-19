<script setup lang="ts">
import { LoaderCircle, Send } from 'lucide-vue-next'
import BrandIcon from '~/components/icons/BrandIcon.vue'
import SectionDivider from '~/components/portfolio/SectionDivider.vue'
import SectionSplitLayout from '~/components/portfolio/SectionSplitLayout.vue'
import { contactFieldConstraints } from '~/shared/contact'
import { createContactSubmission, createInitialContactForm } from './form'
import type { ContactContent } from './types'

const { content } = defineProps<{
  content: ContactContent
}>()

const form = reactive(createInitialContactForm())
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const statusMessage = ref('')

function resetForm() {
  Object.assign(form, createInitialContactForm())
}

async function submitContactForm() {
  status.value = 'submitting'
  statusMessage.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: createContactSubmission(form)
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
    <div
      class="absolute inset-0 bg-[linear-gradient(rgba(214,231,236,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(214,231,236,0.035)_1px,transparent_1px)] bg-[size:44px_44px]"
    />
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(14,165,233,0.13),transparent_34%),radial-gradient(ellipse_at_88%_8%,rgba(245,158,11,0.11),transparent_34%),linear-gradient(180deg,rgba(6,8,13,1),rgba(5,7,12,0.99)_52%,rgba(3,5,9,1))]"
    />
    <div
      class="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#06080d] to-transparent"
    />

    <SectionSplitLayout
      :eyebrow="content.eyebrow"
      :title="content.title"
      :intro="content.intro"
    >
      <div class="grid gap-5">
        <SectionDivider :label="content.formLabel" />

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
            />
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <label class="text-white/72 grid gap-2 text-sm font-medium">
              Name
              <input
                v-model.trim="form.name"
                name="name"
                type="text"
                autocomplete="name"
                required
                :minlength="contactFieldConstraints.name.min"
                :maxlength="contactFieldConstraints.name.max"
                class="h-12 rounded border border-white/10 bg-[#090c12]/85 px-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-sky-200/45 focus:ring-2 focus:ring-sky-300/15"
                placeholder="Your name"
              />
            </label>

            <label class="text-white/72 grid gap-2 text-sm font-medium">
              Email
              <input
                v-model.trim="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                :maxlength="contactFieldConstraints.email.max"
                class="h-12 rounded border border-white/10 bg-[#090c12]/85 px-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-sky-200/45 focus:ring-2 focus:ring-sky-300/15"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label class="text-white/72 mt-4 grid gap-2 text-sm font-medium">
            Subject
            <input
              v-model.trim="form.subject"
              name="subject"
              type="text"
              required
              :minlength="contactFieldConstraints.subject.min"
              :maxlength="contactFieldConstraints.subject.max"
              class="h-12 rounded border border-white/10 bg-[#090c12]/85 px-4 text-base text-white outline-none transition placeholder:text-white/30 focus:border-sky-200/45 focus:ring-2 focus:ring-sky-300/15"
              placeholder="What should we talk about?"
            />
          </label>

          <label class="text-white/72 mt-4 grid gap-2 text-sm font-medium">
            Message
            <textarea
              v-model.trim="form.message"
              name="message"
              required
              :minlength="contactFieldConstraints.message.min"
              :maxlength="contactFieldConstraints.message.max"
              rows="7"
              class="min-h-[180px] resize-y rounded border border-white/10 bg-[#090c12]/85 px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-sky-200/45 focus:ring-2 focus:ring-sky-300/15"
              placeholder="A few useful details about the project, role, or workflow..."
            />
          </label>

          <div
            class="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <button
              type="submit"
              class="inline-flex h-12 items-center justify-center gap-2 rounded bg-white px-5 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(255,255,255,0.10)] transition duration-300 hover:bg-sky-50 hover:shadow-[0_0_34px_rgba(255,255,255,0.18)] disabled:cursor-not-allowed disabled:opacity-55"
              :disabled="status === 'submitting'"
            >
              <LoaderCircle
                v-if="status === 'submitting'"
                class="size-4 animate-spin"
              />
              <Send v-else class="size-4" />
              {{ status === 'submitting' ? 'Sending...' : content.submitLabel }}
            </button>

            <p
              v-if="statusMessage"
              class="text-sm leading-6"
              :class="
                status === 'success' ? 'text-sky-100/78' : 'text-amber-100/78'
              "
              role="status"
            >
              {{ statusMessage }}
            </p>
          </div>
        </form>

        <SectionDivider class="pt-5" :label="content.linksLabel" />

        <div class="grid gap-4 sm:grid-cols-2">
          <a
            v-for="{ href, label, type, value } in content.links"
            :key="href"
            :href="href"
            target="_blank"
            rel="noreferrer"
            class="group rounded border border-white/10 bg-[#090c12]/85 p-5 shadow-line transition duration-300 hover:bg-white/[0.06] hover:shadow-[0_24px_70px_rgba(3,7,18,0.48)]"
          >
            <div class="flex items-center gap-4">
              <span
                class="bg-black/24 text-sky-100/82 flex size-12 shrink-0 items-center justify-center rounded border border-white/10"
              >
                <BrandIcon :type="type" class="size-6" :stroke-width="1.7" />
              </span>
              <span class="min-w-0">
                <span
                  class="block text-lg font-semibold leading-snug text-white"
                >
                  {{ label }}
                </span>
                <span
                  class="text-white/62 group-hover:text-white/78 mt-1 block break-words text-sm leading-6 transition"
                >
                  {{ value }}
                </span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </SectionSplitLayout>
  </section>
</template>
