import type { ProjectsContent } from './types'

const projectsContent: ProjectsContent = {
  eyebrow: 'Selected work',
  title: 'Projects with real delivery context',
  intro:
    'A first pass at the existing portfolio projects: client work, Vue/Nuxt builds, and older experiments kept in proportion while the next AI and Node.js projects take shape.',
  groups: {
    client: 'Client work',
    technical: 'Technical projects',
    archive: 'Earlier experiments'
  }
}

export function createProjectsContent(): ProjectsContent {
  return projectsContent
}

export function useProjectsContent(): ProjectsContent {
  return createProjectsContent()
}
