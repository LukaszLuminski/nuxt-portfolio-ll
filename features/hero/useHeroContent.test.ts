import { describe, expect, it } from 'vitest'
import { createHeroContent } from './useHeroContent'

const messages = {
  hero: {
    brandLabel: 'AI Product Engineer',
    nav: {
      work: 'Work',
      systems: 'Systems',
      contact: 'Contact'
    },
    availabilityLabel: 'Available for builds',
    eyebrow: 'AI-enabled full-stack engineer',
    systemLabel: 'Vue/Nuxt + AI systems',
    headline: 'I build modern AI-powered web products with Vue, Node.js and LLM integrations.',
    subheadline:
      'From product discovery to production infrastructure, I design and ship SaaS experiences that pair sharp Vue/Nuxt interfaces with reliable AI workflows, typed APIs, and scalable backend systems.',
    primaryCta: 'Explore selected systems',
    secondaryCta: 'Discuss a product build',
    metrics: [
      { value: '10+', label: 'years shipping product interfaces' },
      { value: 'AI', label: 'features designed around trust and latency' },
      { value: 'SSR', label: 'Nuxt, Nitro and production delivery' }
    ],
    visual: {
      ariaLabel: 'Portrait-style AI product engineering interface mockup',
      roleTag: 'Product engineer',
      buildTag: 'AI SaaS builds',
      kicker: 'Product-minded engineer',
      description:
        'Vue/Nuxt interfaces, AI-ready data layers, and SaaS systems shipped end to end.'
    }
  }
}

function readMessage(path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (typeof current !== 'object' || current === null || !(segment in current)) {
      return undefined
    }

    return (current as Record<string, unknown>)[segment]
  }, messages)
}

function createTestHeroContent() {
  return createHeroContent({
    t: (key) => String(readMessage(key) ?? key),
    tm: readMessage,
    rt: (message) => String(message)
  })
}

describe('useHeroContent', () => {
  it('positions the portfolio around AI product engineering', () => {
    const hero = createTestHeroContent()

    expect(hero.headline).toBe(
      'I build modern AI-powered web products with Vue, Node.js and LLM integrations.'
    )
    expect(hero.subheadline).toContain('product discovery')
    expect(hero.subheadline).toContain('typed APIs')
  })

  it('includes the core technologies needed for the portfolio positioning', () => {
    const hero = createTestHeroContent()

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
    const hero = createTestHeroContent()

    expect(hero.primaryCta).toBe('Explore selected systems')
    expect(hero.secondaryCta).toBe('Discuss a product build')
    expect(hero.metrics).toHaveLength(3)
    expect(hero.metrics).toEqual(
      expect.arrayContaining([
        { value: '10+', label: 'years shipping product interfaces' },
        { value: 'AI', label: 'features designed around trust and latency' },
        { value: 'SSR', label: 'Nuxt, Nitro and production delivery' }
      ])
    )
  })
})
