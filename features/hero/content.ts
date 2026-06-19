import type { HeroContent } from './types'

export const heroContent = {
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
    {
      label: 'GitHub',
      href: 'https://github.com/LukaszLuminski',
      type: 'github'
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/lukasz-luminski',
      type: 'linkedin'
    }
  ],
  headline: 'Frontend Developer',
  subheadline:
    'Specialising in Vue, Nuxt, and TypeScript, I build responsive, accessible interfaces with careful attention to usability and detail.',
  positioning:
    'Frontend Developer specialising in Vue and Nuxt, building responsive, accessible web interfaces with TypeScript and a careful eye for usability and detail.',
  primaryCta: 'See my projects',
  secondaryCta: 'Read more about me',
  metrics: [
    { value: '2020', label: 'working professionally in frontend development' },
    { value: 'Vue', label: 'core framework and component expertise' },
    { value: 'Nuxt', label: 'production-ready web experiences' }
  ],
  technologies: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'TypeScript',
    'Vue 3',
    'Nuxt 3',
    'Pinia',
    'Storybook',
    'Vitest',
    'Git'
  ]
} as const satisfies HeroContent
