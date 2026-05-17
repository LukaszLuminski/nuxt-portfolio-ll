export type ProjectGroup = 'client' | 'technical' | 'archive'

export interface ProjectLink {
  label: string
  href: string
  type: 'live' | 'code'
}

export interface Project {
  title: string
  order: number
  group: ProjectGroup
  summary: string
  stack: string[]
  links: ProjectLink[]
}

export interface ProjectsContent {
  eyebrow: string
  title: string
  intro: string
  groups: Record<ProjectGroup, string>
}
