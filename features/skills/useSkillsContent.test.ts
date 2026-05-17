import { describe, expect, it } from 'vitest'
import { createSkillsContent } from './useSkillsContent'

describe('useSkillsContent', () => {
  it('provides grouped skills content for the homepage section', () => {
    const { eyebrow, groups, intro, skills, title } = createSkillsContent()

    expect(eyebrow).toBe('Skills')
    expect(title).toContain('AI')
    expect(intro).toContain('Node.js services')
    expect(groups).toEqual({
      frontend: 'Interface engineering',
      backend: 'Backend foundations',
      ai: 'AI workflows',
      delivery: 'Delivery habits'
    })
    expect(skills).toHaveLength(14)
  })

  it('includes the Node.js and AI skills needed for the new positioning', () => {
    const { skills } = createSkillsContent()
    const titles = skills.map(({ title }) => title)

    expect(titles).toEqual(
      expect.arrayContaining([
        'Node.js',
        'API Design',
        'PostgreSQL & Prisma',
        'OpenAI API',
        'AI SDK',
        'RAG Systems'
      ])
    )
    expect(new Set(titles).size).toBe(titles.length)
  })
})
