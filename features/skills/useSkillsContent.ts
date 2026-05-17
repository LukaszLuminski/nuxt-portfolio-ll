import type { SkillsContent } from './types'

const skillsContent: SkillsContent = {
  eyebrow: 'Skills',
  title: 'Frontend craft, backend pragmatism, and AI that earns its keep',
  intro:
    'The stack is centered on Vue and Nuxt, extended with Node.js services, data-aware AI workflows, and the delivery habits needed to keep projects maintainable after launch.',
  groups: {
    frontend: 'Interface engineering',
    backend: 'Backend foundations',
    ai: 'AI workflows',
    delivery: 'Delivery habits'
  },
  skills: [
    {
      title: 'HTML5',
      group: 'frontend',
      icon: { type: 'image', src: '/images/skills/html.png' },
      description:
        'Semantic structure, accessible document flow, forms, media, and markup that gives Nuxt pages a reliable foundation.',
      highlights: ['Semantic layouts', 'Accessible forms', 'SEO-ready structure']
    },
    {
      title: 'CSS3',
      group: 'frontend',
      icon: { type: 'image', src: '/images/skills/css.png' },
      description:
        'Responsive layouts with grid and flexbox, polished interaction states, and design systems that stay consistent across screens.',
      highlights: ['Responsive UI', 'Grid and flexbox', 'Motion details']
    },
    {
      title: 'JavaScript',
      group: 'frontend',
      icon: { type: 'image', src: '/images/skills/javascript.png' },
      description:
        'Modern browser behaviour, async flows, stateful interfaces, and careful DOM work where a framework is not the whole answer.',
      highlights: ['ES modules', 'Async flows', 'Browser APIs']
    },
    {
      title: 'TypeScript',
      group: 'frontend',
      icon: { type: 'lucide', name: 'workflow' },
      description:
        'Typed models and contracts for safer components, composables, API responses, and content-driven portfolio data.',
      highlights: ['Typed contracts', 'Reusable composables', 'Safer refactors']
    },
    {
      title: 'Vue.js',
      group: 'frontend',
      icon: { type: 'image', src: '/images/skills/vue.png' },
      description:
        'Composition API, component architecture, stateful UI patterns, and ergonomic interfaces built around real user tasks.',
      highlights: ['Composition API', 'Component systems', 'Interaction design']
    },
    {
      title: 'Nuxt',
      group: 'frontend',
      icon: { type: 'image', src: '/images/skills/nuxt.png' },
      description:
        'Production Nuxt apps with routing, server endpoints, SEO metadata, content loading, and clean project structure.',
      highlights: ['SSR and routing', 'Server API routes', 'SEO metadata']
    },
    {
      title: 'Node.js',
      group: 'backend',
      icon: { type: 'image', src: '/images/skills/nodejs.png' },
      description:
        'Backend services, API endpoints, integrations, and server-side glue that connect product interfaces to useful data.',
      highlights: ['REST APIs', 'Service integrations', 'Server-side logic']
    },
    {
      title: 'API Design',
      group: 'backend',
      icon: { type: 'lucide', name: 'server' },
      description:
        'Clear request and response shapes, validation boundaries, and backend behaviour that frontend code can trust.',
      highlights: ['Endpoint contracts', 'Validation', 'Error states']
    },
    {
      title: 'PostgreSQL & Prisma',
      group: 'backend',
      icon: { type: 'lucide', name: 'database' },
      description:
        'Relational data modelling, query structure, migrations, and typed data access for maintainable product features.',
      highlights: ['Data modelling', 'Migrations', 'Typed queries']
    },
    {
      title: 'OpenAI API',
      group: 'ai',
      icon: { type: 'lucide', name: 'brain' },
      description:
        'Practical AI features using prompts, structured outputs, tool calling, and guardrails that suit the product context.',
      highlights: ['Structured outputs', 'Tool calling', 'Prompt design']
    },
    {
      title: 'AI SDK',
      group: 'ai',
      icon: { type: 'lucide', name: 'bot' },
      description:
        'Streaming AI interfaces and agentic workflows that feel responsive while keeping state, tools, and UX constraints visible.',
      highlights: ['Streaming UI', 'Agent workflows', 'Tool orchestration']
    },
    {
      title: 'RAG Systems',
      group: 'ai',
      icon: { type: 'lucide', name: 'database' },
      description:
        'Retrieval-aware workflows that combine embeddings, document context, and careful response shaping for grounded answers.',
      highlights: ['Embeddings', 'Vector search', 'Grounded answers']
    },
    {
      title: 'Git',
      group: 'delivery',
      icon: { type: 'image', src: '/images/skills/git.png' },
      description:
        'Branching, review-friendly commits, and careful change management across production projects and portfolio iterations.',
      highlights: ['Version control', 'Reviewable changes', 'Release hygiene']
    },
    {
      title: 'Testing & QA',
      group: 'delivery',
      icon: { type: 'lucide', name: 'workflow' },
      description:
        'Focused tests, type checks, build verification, and browser passes to catch real regressions before they reach users.',
      highlights: ['Unit tests', 'Type checks', 'Visual review']
    }
  ]
}

export function createSkillsContent(): SkillsContent {
  return skillsContent
}

export function useSkillsContent(): SkillsContent {
  return createSkillsContent()
}
