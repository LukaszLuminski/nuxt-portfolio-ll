import type { SkillsContent } from './types'

export const skillsContent = {
  eyebrow: 'Expertise',
  title: 'What I work with',
  intro:
    'My work centres on the Vue ecosystem, supported by strong web fundamentals, typed development, component documentation, state management, and focused testing.',
  groups: {
    foundations: 'Frontend foundations',
    ecosystem: 'Vue ecosystem',
    quality: 'Component quality',
    delivery: 'Delivery habits'
  },
  skills: [
    {
      title: 'HTML5',
      group: 'foundations',
      icon: { type: 'image', src: '/images/skills/html.png' },
      description:
        'Semantic structure, accessible document flow, forms, media, and markup that gives Nuxt pages a reliable foundation.',
      highlights: [
        'Semantic layouts',
        'Accessible forms',
        'SEO-ready structure'
      ]
    },
    {
      title: 'CSS3',
      group: 'foundations',
      icon: { type: 'image', src: '/images/skills/css.png' },
      description:
        'Responsive layouts with grid and flexbox, polished interaction states, and design systems that stay consistent across screens.',
      highlights: ['Responsive UI', 'Grid and flexbox', 'Motion details']
    },
    {
      title: 'JavaScript',
      group: 'foundations',
      icon: { type: 'image', src: '/images/skills/javascript.png' },
      description:
        'Modern browser behaviour, async flows, stateful interfaces, and careful DOM work where a framework is not the whole answer.',
      highlights: ['ES modules', 'Async flows', 'Browser APIs']
    },
    {
      title: 'TypeScript',
      group: 'foundations',
      icon: { type: 'lucide', name: 'code' },
      description:
        'Typed models and contracts for safer components, composables, API responses, and content-driven portfolio data.',
      highlights: ['Typed contracts', 'Reusable composables', 'Safer refactors']
    },
    {
      title: 'Vue.js',
      group: 'ecosystem',
      icon: { type: 'image', src: '/images/skills/vue.png' },
      description:
        'Composition API, component architecture, stateful UI patterns, and ergonomic interfaces built around real user tasks.',
      highlights: ['Composition API', 'Component systems', 'Interaction design']
    },
    {
      title: 'Nuxt',
      group: 'ecosystem',
      icon: { type: 'image', src: '/images/skills/nuxt.png' },
      description:
        'Production Nuxt apps with routing, server endpoints, SEO metadata, content loading, and clean project structure.',
      highlights: ['SSR and routing', 'Server API routes', 'SEO metadata']
    },
    {
      title: 'Pinia',
      group: 'ecosystem',
      icon: { type: 'lucide', name: 'store' },
      description:
        'Predictable, typed state management for Vue applications, with stores designed around clear responsibilities and maintainable data flows.',
      highlights: ['Typed stores', 'Shared state', 'Composable patterns']
    },
    {
      title: 'Storybook',
      group: 'quality',
      icon: { type: 'lucide', name: 'storybook' },
      description:
        'Isolated component development and documentation that makes interface states easier to review, reuse, and maintain.',
      highlights: ['Component stories', 'UI documentation', 'Visual states']
    },
    {
      title: 'Vitest',
      group: 'quality',
      icon: { type: 'lucide', name: 'test' },
      description:
        'Fast unit and component tests for composables, content models, and interface behaviour, helping prevent regressions during change.',
      highlights: ['Unit tests', 'Component tests', 'Regression coverage']
    },
    {
      title: 'Git',
      group: 'delivery',
      icon: { type: 'image', src: '/images/skills/git.png' },
      description:
        'Branching, review-friendly commits, and careful change management across production projects and portfolio iterations.',
      highlights: ['Version control', 'Reviewable changes', 'Release hygiene']
    }
  ]
} as const satisfies SkillsContent
