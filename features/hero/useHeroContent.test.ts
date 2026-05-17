import { describe, expect, it } from 'vitest'
import { createHeroContent } from './useHeroContent'

describe('useHeroContent', () => {
  it('positions the portfolio around Vue/Nuxt product engineering', () => {
    const hero = createHeroContent()

    expect(hero.positioning).toBe(
      'Vue/Nuxt product engineer building modern web apps, Node.js backends, and useful AI-powered workflows.'
    )
    expect(hero.headline).toBe('Vue/Nuxt product engineer')
    expect(hero.name).toBe('Lukasz Luminski')
    expect(hero.introLabel).toBe("Hello, I'm Lukasz")
    expect(hero.subheadline).toContain('Node.js backends')
    expect(hero.subheadline).toContain('AI-powered workflows')
  })

  it('includes the core technologies needed for the portfolio positioning', () => {
    const hero = createHeroContent()

    expect(hero.technologies).toEqual(
      expect.arrayContaining([
        'Vue 3',
        'Nuxt 3',
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'OpenAI API',
        'AI SDK',
        'RAG',
        'Vector DBs',
        'Docker',
        'Redis',
        'Realtime'
      ])
    )
    expect(new Set(hero.technologies).size).toBe(hero.technologies.length)
  })

  it('provides complete CTA and proof content for the hero', () => {
    const hero = createHeroContent()

    expect(hero.primaryCta).toBe('See my projects')
    expect(hero.secondaryCta).toBe('Read more about me')
    expect(hero.metrics).toHaveLength(3)
    expect(hero.metrics).toEqual(
      expect.arrayContaining([
        { value: '10+', label: 'years shipping product interfaces' },
        { value: 'Vue', label: 'deep Nuxt ecosystem specialization' },
        { value: 'Node', label: 'backends, APIs and AI integrations' }
      ])
    )
  })

  it('uses the unaccented visible identity while keeping personal navigation', () => {
    const hero = createHeroContent()

    expect(hero.brandLabel).toBe('LukaszLuminski')
    expect(hero.name).toBe('Lukasz Luminski')
    expect(hero.nav).toEqual({
      work: 'Projects',
      systems: 'Skills',
      about: 'About me',
      contact: 'Contact'
    })
  })
})
