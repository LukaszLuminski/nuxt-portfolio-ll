import type { AboutContent } from './types'

export const aboutContent = {
  eyebrow: 'Background',
  title: 'My story',
  intro:
    'Before becoming a web developer, I was an English teacher in Poland. The common thread has always been the same: understanding people, explaining complex things clearly, and caring about the details that make work feel human.',
  image: '/images/about/lukasz.jpg',
  imageAlt: 'Lukasz Luminski portrait',
  paragraphs: [
    'I have always been interested in IT and art, although for years I treated both as hobbies. Professionally, I started as an English teacher in Poland, then began looking for a more sustainable path where technical problem-solving and creativity could meet.',
    'At first I studied laptop troubleshooting with the idea of moving into technical support. Later, after moving to the UK, I spent time learning small-network installation and maintenance. It helped me understand infrastructure, but it also made something obvious: I wanted a role where I could use more of my eye for detail and interface craft.',
    'Coding quickly became that place. Since 2019 I have worked on projects alongside full-time work, then in June 2020 I started professionally as a Front End Web Developer. Vue became the framework I kept returning to because it lets me build expressive interfaces without losing clarity.',
    'These days I focus on frontend development with Vue, Nuxt, and TypeScript, building maintainable interfaces with thoughtful component architecture, state management, and testing. Away from the keyboard, I am a husband and father, and I still make time for drawing, books, travelling, the gym, cycling, and swimming.'
  ],
  milestones: [
    { label: 'Frontend experience', value: 'Since 2020' },
    { label: 'Core ecosystem', value: 'Vue and Nuxt' },
    { label: 'Component workflow', value: 'Storybook and Vitest' }
  ]
} as const satisfies AboutContent
