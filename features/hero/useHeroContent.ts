import type { HeroContent } from './types'

const technologies = [
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

const heroContent: HeroContent = {
  brandLabel: 'LukaszLuminski',
  name: 'Lukasz Luminski',
  introLabel: "Hello, I'm Lukasz",
  nav: {
    work: 'Projects',
    systems: 'Skills',
    about: 'About me',
    contact: 'Contact'
  },
  availabilityLabel: 'Available for product builds',
  social: {
    github: 'GitHub',
    linkedin: 'LinkedIn'
  },
  eyebrow: 'Vue / Nuxt / Node.js / practical AI',
  systemLabel: 'Product engineering',
  headline: 'Vue/Nuxt product engineer',
  subheadline: 'Building modern web apps, Node.js backends, and useful AI-powered workflows.',
  positioning:
    'Vue/Nuxt product engineer building modern web apps, Node.js backends, and useful AI-powered workflows.',
  primaryCta: 'See my projects',
  secondaryCta: 'Read more about me',
  metrics: [
    { value: '10+', label: 'years shipping product interfaces' },
    { value: 'Vue', label: 'deep Nuxt ecosystem specialization' },
    { value: 'Node', label: 'backends, APIs and AI integrations' }
  ],
  technologies,
  visual: {
    ariaLabel: 'Product engineering lab status panel',
    status: 'Product lab',
    title: 'Front-end craft, backend judgment, useful AI.',
    description:
      'A portfolio about complete product building: from the first screen, through API architecture, to LLM features when they make the product better.',
    signals: ['Nuxt SSR', 'Vue interfaces', 'Node APIs', 'AI workflows']
  }
}

export function createHeroContent(): HeroContent {
  return heroContent
}

export function useHeroContent(): HeroContent {
  return createHeroContent()
}
