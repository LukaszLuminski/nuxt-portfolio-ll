import { describe, expect, it } from 'vitest'
import { createAboutContent } from './useAboutContent'

describe('useAboutContent', () => {
  it('adapts the legacy about story for the current portfolio', () => {
    const about = createAboutContent()

    expect(about.eyebrow).toBe('Background')
    expect(about.title).toBe('My story')
    expect(about.intro).toContain('English teacher')
    expect(about.image).toBe('/images/about/lukasz.jpg')
    expect(about.paragraphs).toHaveLength(4)
    expect(about.paragraphs.join(' ')).toContain('June 2020')
  })

  it('summarizes the current engineering direction', () => {
    const { milestones, paragraphs } = createAboutContent()

    expect(milestones).toEqual([
      { label: 'Professional frontend work', value: 'Since 2020' },
      { label: 'Core ecosystem', value: 'Vue and Nuxt' },
      { label: 'Component workflow', value: 'Storybook and Vitest' }
    ])
    expect(paragraphs.join(' ')).toContain('Vue, Nuxt, and TypeScript')
    expect(paragraphs.join(' ')).toContain('state management, and testing')
  })
})
