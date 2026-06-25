<script setup lang="ts">
import BlogPostCard from '~/features/blog/BlogPostCard.vue'
import { blogContent } from '~/features/blog/content'
import type { BlogPost } from '~/features/blog/types'
import { heroContent } from '~/features/hero/content'

useBlogFeatureGuard('Page not found')
const {
  public: { siteUrl }
} = useRuntimeConfig()
const canonicalSiteUrl = siteUrl.replace(/\/$/, '')
const blogUrl = `${canonicalSiteUrl}/blog`
const blogPageTitle = `Blog | ${heroContent.name}`
const { data: posts } = await useAsyncData('blog-posts', () =>
  $fetch<BlogPost[]>('/api/blog')
)
const publishedPosts = computed(() => posts.value ?? [])
const blogJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: blogContent.title,
  description: blogContent.intro,
  url: blogUrl,
  author: {
    '@type': 'Person',
    name: heroContent.name
  },
  blogPost: publishedPosts.value.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${canonicalSiteUrl}${post.path}`,
    datePublished: post.publishedAt,
    image: `${canonicalSiteUrl}${post.image.src}`
  }))
}))

useSeoMeta({
  title: blogPageTitle,
  description: blogContent.intro,
  ogTitle: blogPageTitle,
  ogDescription: blogContent.intro,
  ogType: 'website',
  ogUrl: blogUrl,
  twitterCard: 'summary_large_image'
})

useHead(() => ({
  link: [{ rel: 'canonical', href: blogUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(blogJsonLd.value)
    }
  ]
}))
</script>

<template>
  <main class="min-h-screen bg-[#07090d] text-white">
    <section class="relative overflow-hidden pb-20 pt-28 sm:pb-28">
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:44px_44px]"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_16%_4%,rgba(14,165,233,0.16),transparent_34%),radial-gradient(ellipse_at_82%_0%,rgba(245,158,11,0.11),transparent_30%),linear-gradient(180deg,rgba(7,9,13,0.42),rgba(7,9,13,0.98)_42%)]"
      />

      <div class="container relative">
        <div class="max-w-3xl">
          <p
            class="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200/55"
          >
            {{ blogContent.eyebrow }}
          </p>
          <h1
            class="mt-4 text-3xl font-semibold leading-tight text-white sm:text-[2.5rem]"
          >
            {{ blogContent.title }}
          </h1>
          <p class="text-white/68 mt-5 text-lg leading-8">
            {{ blogContent.intro }}
          </p>
        </div>

        <div
          v-if="publishedPosts.length"
          class="mt-12 grid gap-4 md:grid-cols-2"
        >
          <BlogPostCard
            v-for="post in publishedPosts"
            :key="post.path"
            :post="post"
          />
        </div>

        <p v-else class="text-white/68 mt-12 text-base">
          {{ blogContent.emptyState }}
        </p>
      </div>
    </section>
  </main>
</template>
