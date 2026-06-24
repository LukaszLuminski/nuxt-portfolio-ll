import { describe, expect, it } from 'vitest'
import { aboutContent } from './about/content'
import { contactContent } from './contact/content'
import { heroContent } from './hero/content'
import { projectsContent } from './projects/content'
import { skillsContent } from './skills/content'

describe('portfolio content contracts', () => {
  it('provides unique in-page navigation targets and typed social links', () => {
    const sectionIds = heroContent.nav.map(({ href }) => href)
    const socialTypes = heroContent.social.map(({ type }) => type)

    expect(
      sectionIds.every((href) => href.startsWith('#') || href.startsWith('/'))
    ).toBe(true)
    expect(new Set(sectionIds).size).toBe(sectionIds.length)
    expect(new Set(socialTypes).size).toBe(socialTypes.length)
    expect(heroContent.technologies).toEqual(
      expect.arrayContaining([
        'TypeScript',
        'Vue 3',
        'Nuxt 3',
        'Pinia',
        'Storybook',
        'Vitest'
      ])
    )
  })

  it('keeps every skill in a declared group with unique titles', () => {
    const groupNames = new Set(Object.keys(skillsContent.groups))
    const titles = skillsContent.skills.map(({ title }) => title)

    expect(
      skillsContent.skills.every(({ group }) => groupNames.has(group))
    ).toBe(true)
    expect(
      [...groupNames].every((group) =>
        skillsContent.skills.some((skill) => skill.group === group)
      )
    ).toBe(true)
    expect(new Set(titles).size).toBe(titles.length)
    expect(
      skillsContent.skills.every(({ highlights }) => highlights.length > 0)
    ).toBe(true)
  })

  it('defines complete project, about, and contact section data', () => {
    expect(Object.keys(projectsContent.groups)).toEqual(['client', 'technical'])
    expect(aboutContent.paragraphs.length).toBeGreaterThan(0)
    expect(
      new Set(aboutContent.milestones.map(({ label }) => label)).size
    ).toBe(aboutContent.milestones.length)
    expect(
      contactContent.links.every(({ href }) => href.startsWith('https://'))
    ).toBe(true)
  })
})
