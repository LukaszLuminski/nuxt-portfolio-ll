import type { ProjectsContent } from './types'

export const projectsContent = {
  eyebrow: 'Portfolio',
  title: 'Selected work',
  intro:
    'A selection of client work, Vue and Nuxt builds, and earlier projects that show how my frontend skills have developed in practice.',
  groups: {
    client: 'Client work',
    technical: 'Technical projects',
    archive: 'Earlier experiments'
  }
} as const satisfies ProjectsContent
