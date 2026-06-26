export type SkillIcon = { type: 'image'; src: string; displaySize?: 'large' }

export type SkillGroup = 'foundations' | 'ecosystem' | 'quality' | 'delivery'

export interface Skill {
  title: string
  group: SkillGroup
  icon: SkillIcon
  description: string
  highlights: readonly string[]
}

export interface SkillsContent {
  eyebrow: string
  title: string
  intro: string
  groups: Readonly<Record<SkillGroup, string>>
  skills: readonly Skill[]
}
