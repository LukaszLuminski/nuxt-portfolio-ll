import type { HeroContent } from '~/types/hero'

export function useHeroContent(): HeroContent {
  return {
    eyebrow: 'AI-enabled full-stack engineer',
    headline: 'I build modern AI-powered web products with Vue, Node.js and LLM integrations.',
    subheadline:
      'From product discovery to production infrastructure, I design and ship SaaS experiences that pair sharp Vue/Nuxt interfaces with reliable AI workflows, typed APIs, and scalable backend systems.',
    primaryCta: 'Explore selected systems',
    secondaryCta: 'Discuss a product build',
    metrics: [
      { value: '10+', label: 'years shipping product interfaces' },
      { value: 'AI', label: 'features designed around trust and latency' },
      { value: 'SSR', label: 'Nuxt, Nitro and production delivery' }
    ],
    technologies: [
      'Vue 3',
      'Nuxt 3',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'OpenAI API',
      'AI SDK',
      'RAG',
      'Vector DBs',
      'Docker',
      'Redis',
      'Realtime'
    ]
  }
}
