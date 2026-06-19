import { describe, expect, it } from 'vitest'
import { createHeroContent } from './useHeroContent'

describe('useHeroContent', () => {
  it('positions the portfolio around frontend development with Vue and Nuxt', () => {
    const hero = createHeroContent()

    expect(hero.positioning).toBe(
      'Frontend Developer specialising in Vue and Nuxt, building responsive, accessible web interfaces with TypeScript and a careful eye for usability and detail.'
    )
    expect(hero.headline).toBe('Frontend Developer')
    expect(hero.name).toBe('Lukasz Luminski')
    expect(hero.introLabel).toBe("Hello, I'm Lukasz")
    expect(hero.subheadline).toContain('responsive, accessible interfaces')
    expect(hero.subheadline).toContain('TypeScript')
  })

  it('includes the core technologies needed for the portfolio positioning', () => {
    const hero = createHeroContent()

    expect(hero.technologies).toEqual(
      expect.arrayContaining([
        'HTML5',
        'CSS3',
        'JavaScript',
        'TypeScript',
        'Vue 3',
        'Nuxt 3',
        'Pinia',
        'Storybook',
        'Vitest',
        'Git'
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
        { value: '2020', label: 'working professionally in frontend development' },
        { value: 'Vue', label: 'core framework and component expertise' },
        { value: 'Nuxt', label: 'production-ready web experiences' }
      ])
    )
  })

  it('uses the unaccented visible identity while keeping personal navigation', () => {
    const hero = createHeroContent()

    expect(hero.brandLabel).toBe('LukaszLuminski')
    expect(hero.name).toBe('Lukasz Luminski')
    expect(hero.nav).toEqual([
      { label: 'Projects', href: '#work' },
      { label: 'Skills', href: '#skills' },
      { label: 'About me', href: '#about' },
      { label: 'Contact', href: '#contact' }
    ])
  })
})
