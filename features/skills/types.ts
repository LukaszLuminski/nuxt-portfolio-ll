export type SkillIcon =
  | { type: 'image'; src: string }
  | { type: 'lucide'; name: 'code' | 'store' | 'storybook' | 'test' }

export type SkillGroup = 'foundations' | 'ecosystem' | 'quality' | 'delivery'

export interface Skill {
  title: string
  group: SkillGroup
  icon: SkillIcon
  description: string
  highlights: string[]
}

export interface SkillsContent {
  eyebrow: string
  title: string
  intro: string
  groups: Record<SkillGroup, string>
  skills: Skill[]
}
