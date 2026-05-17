export type SkillIcon =
  | { type: 'image'; src: string }
  | { type: 'lucide'; name: 'bot' | 'brain' | 'database' | 'server' | 'workflow' }

export type SkillGroup = 'frontend' | 'backend' | 'ai' | 'delivery'

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
