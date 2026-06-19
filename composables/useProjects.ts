import type { Project } from '~/features/projects/types'

export function useProjects() {
  return useAsyncData<Project[]>('projects', () => $fetch('/api/projects'), {
    default: () => []
  })
}
