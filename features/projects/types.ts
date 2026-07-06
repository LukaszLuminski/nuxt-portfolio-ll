export type ProjectGroup = 'client' | 'technical'

export interface ProjectLink {
  label: string
  href: string
  type: 'live' | 'code'
}

export interface ProjectCaseStudy {
  timeline: string
  status: string
  challenge: readonly string[]
  approach: readonly string[]
  outcomes: readonly string[]
  lessons: readonly string[]
}

export interface Project {
  title: string
  slug: string
  order: number
  group: ProjectGroup
  summary: string
  image: string
  imageAlt: string
  stack: readonly string[]
  highlights: readonly string[]
  details: readonly string[]
  frontEnd: string | null
  backEnd: string | null
  database: string | null
  caseStudy: ProjectCaseStudy | null
  links: readonly ProjectLink[]
}

export interface ProjectsContent {
  eyebrow: string
  title: string
  intro: string
  groups: Readonly<Record<ProjectGroup, string>>
}
