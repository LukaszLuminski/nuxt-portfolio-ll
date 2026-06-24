import type { BlogContent } from './types'

export const blogContent = {
  eyebrow: 'Writing',
  title: 'Notes from building with Vue, Nuxt, and TypeScript',
  intro:
    'Focused articles about frontend architecture, portfolio decisions, accessibility, testing, and the trade-offs behind production UI work.',
  emptyState: 'No published posts yet.'
} as const satisfies BlogContent
