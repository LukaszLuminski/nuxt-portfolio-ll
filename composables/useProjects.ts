import type { Project } from '~/features/projects/types'

const projectsEndpoint: string = '/api/projects'

export function useProjects() {
  return useAsyncData<Project[]>(
    'projects',
    async () => {
      const projects = await $fetch<unknown>(projectsEndpoint)

      return Array.isArray(projects) ? (projects as Project[]) : []
    },
    { default: () => [] }
  )
}
