import type { Project } from '~/features/projects/types'

const projectsEndpoint: string = '/api/projects'

export function useProjects() {
  return useAsyncData<Project[]>(
    'projects',
    () => $fetch<Project[]>(projectsEndpoint),
    { default: () => [] }
  )
}
