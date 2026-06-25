<script setup lang="ts">
import { ArrowLeft, CalendarDays, Clock3 } from '@lucide/vue'
import type { BlogPost } from '~/features/blog/types'
import { heroContent } from '~/features/hero/content'

type BlogArticle = BlogPost & {
  html: string
}

const route = useRoute()
const slug = String(route.params.slug)
useBlogFeatureGuard('Post not found')
const {
  public: { siteUrl }
} = useRuntimeConfig()
const canonicalSiteUrl = siteUrl.replace(/\/$/, '')
const { data: post } = await useAsyncData(`blog-${slug}`, () =>
  $fetch<BlogArticle>(`/api/blog/${slug}`)
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const article = computed(() => post.value as BlogArticle)
const canonicalUrl = computed(() => `${canonicalSiteUrl}${article.value.path}`)
const articlePageTitle = computed(
  () => `${article.value.title} | ${heroContent.name}`
)
const publishedDate = computed(() =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(article.value.publishedAt))
)
const articleJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.value.title,
  description: article.value.description,
  url: canonicalUrl.value,
  datePublished: article.value.publishedAt,
  dateModified: article.value.updatedAt ?? article.value.publishedAt,
  image: `${canonicalSiteUrl}${article.value.image.src}`,
  author: {
    '@type': 'Person',
    name: heroContent.name
  }
}))

useSeoMeta({
  title: () => articlePageTitle.value,
  description: () => article.value.description,
  ogTitle: () => articlePageTitle.value,
  ogDescription: () => article.value.description,
  ogType: 'article',
  ogUrl: () => canonicalUrl.value,
  ogImage: () => `${canonicalSiteUrl}${article.value.image.src}`,
  twitterCard: 'summary_large_image'
})

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(articleJsonLd.value)
    }
  ]
}))
</script>

<template>
  <main class="min-h-screen bg-[#07090d] text-white">
    <article class="relative overflow-hidden pb-20 pt-28 sm:pb-28">
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:44px_44px]"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_16%_4%,rgba(14,165,233,0.16),transparent_34%),radial-gradient(ellipse_at_82%_0%,rgba(245,158,11,0.11),transparent_30%),linear-gradient(180deg,rgba(7,9,13,0.42),rgba(7,9,13,0.98)_42%)]"
      />

      <div class="container relative">
        <NuxtLink
          to="/blog"
          class="text-white/62 inline-flex items-center gap-2 text-sm font-medium transition hover:text-white"
        >
          <ArrowLeft class="size-4" />
          Back to blog
        </NuxtLink>

        <header class="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <div
              class="text-white/58 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
            >
              <span class="inline-flex items-center gap-2">
                <CalendarDays class="size-4" />
                {{ publishedDate }}
              </span>
              <span class="inline-flex items-center gap-2">
                <Clock3 class="size-4" />
                {{ article.readingTime }}
              </span>
            </div>

            <h1
              class="mt-5 max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-[2.45rem]"
            >
              {{ article.title }}
            </h1>
            <p class="text-white/68 mt-5 max-w-2xl text-lg leading-8">
              {{ article.description }}
            </p>

            <div class="mt-7 flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="border-sky-100/12 text-sky-50/68 rounded border bg-sky-100/[0.035] px-2.5 py-1 text-xs font-medium"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <figure
            class="overflow-hidden rounded border border-white/10 bg-white/[0.035] shadow-line"
          >
            <img
              :src="article.image.src"
              :alt="article.image.alt"
              width="900"
              height="560"
              fetchpriority="high"
              class="aspect-[16/10] w-full object-cover"
            />
          </figure>
        </header>

        <div
          class="mt-14 grid gap-8 lg:grid-cols-[0.25fr_minmax(0,0.75fr)] lg:gap-14"
        >
          <aside class="hidden lg:block">
            <div
              class="sticky top-28 rounded border border-white/10 bg-white/[0.035] p-5"
            >
              <p
                class="text-sm font-semibold uppercase tracking-[0.2em] text-sky-100/55"
              >
                Topic
              </p>
              <p class="text-white/68 mt-4 text-sm leading-6">
                {{ article.tags.join(', ') }}
              </p>
            </div>
          </aside>

          <!-- eslint-disable vue/no-v-html -->
          <div
            class="article-content bg-[#090c12]/78 rounded border border-white/10 p-5 shadow-line sm:p-8"
            v-html="article.html"
          />
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </div>
    </article>
  </main>
</template>
