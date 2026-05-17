export type ProjectGroup = 'client' | 'technical' | 'archive'

export interface ProjectLink {
  label: string
  href: string
  type: 'live' | 'code'
}

export interface Project {
  title: string
  slug: string
  order: number
  group: ProjectGroup
  summary: string
  image: string
  imageAlt: string
  stack: string[]
  highlights: string[]
  details: string[]
  frontEnd: string | null
  backEnd: string | null
  database: string | null
  links: ProjectLink[]
}

export interface ProjectsContent {
  eyebrow: string
  title: string
  intro: string
  groups: Record<ProjectGroup, string>
}
