import { describe, expect, it } from 'vitest'
import { createAboutContent } from './useAboutContent'

describe('useAboutContent', () => {
  it('adapts the legacy about story for the current portfolio', () => {
    const about = createAboutContent()

    expect(about.eyebrow).toBe('About me')
    expect(about.title).toContain('teaching')
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
      { label: 'Current direction', value: 'Node.js and AI' }
    ])
    expect(paragraphs.join(' ')).toContain('Node.js backends')
    expect(paragraphs.join(' ')).toContain('AI-powered workflows')
  })
})
