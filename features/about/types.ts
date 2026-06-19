export interface AboutMilestone {
  label: string
  value: string
}

export interface AboutContent {
  eyebrow: string
  title: string
  intro: string
  image: string
  imageAlt: string
  paragraphs: readonly string[]
  milestones: readonly AboutMilestone[]
}
