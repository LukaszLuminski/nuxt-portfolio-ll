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
  nav: [
    { label: 'Projects', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'About me', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/LukaszLuminski' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lukasz-luminski' }
  ],
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
  technologies
}

export function createHeroContent(): HeroContent {
  return heroContent
}

export function useHeroContent(): HeroContent {
  return createHeroContent()
}
