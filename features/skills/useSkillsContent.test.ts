import { describe, expect, it } from 'vitest'
import { createSkillsContent } from './useSkillsContent'

describe('useSkillsContent', () => {
  it('provides grouped skills content for the homepage section', () => {
    const { eyebrow, groups, intro, skills, title } = createSkillsContent()

    expect(eyebrow).toBe('Expertise')
    expect(title).toBe('What I work with')
    expect(intro).toContain('Vue ecosystem')
    expect(groups).toEqual({
      foundations: 'Frontend foundations',
      ecosystem: 'Vue ecosystem',
      quality: 'Component quality',
      delivery: 'Delivery habits'
    })
    expect(skills).toHaveLength(10)
  })

  it('includes the frontend skills supported by professional experience', () => {
    const { skills } = createSkillsContent()
    const titles = skills.map(({ title }) => title)

    expect(titles).toEqual(
      expect.arrayContaining([
        'HTML5',
        'CSS3',
        'JavaScript',
        'TypeScript',
        'Vue.js',
        'Nuxt',
        'Pinia',
        'Storybook',
        'Vitest',
        'Git'
      ])
    )
    expect(new Set(titles).size).toBe(titles.length)
  })
})
