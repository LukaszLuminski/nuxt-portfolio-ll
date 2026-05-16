import { computed, type ComputedRef } from 'vue'
import { useI18n } from '#imports'
import type { HeroContent } from './types'

interface HeroTranslator {
  t: (key: string) => string
  tm: (key: string) => unknown
  rt: (message: unknown) => string
}

const technologies = [
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
]

function translateMetricMessages(translator: HeroTranslator): HeroContent['metrics'] {
  const metrics = translator.tm('hero.metrics')

  if (!Array.isArray(metrics)) {
    return []
  }

  return metrics.map((metric) => {
    const value = typeof metric === 'object' && metric !== null && 'value' in metric
      ? metric.value
      : ''
    const label = typeof metric === 'object' && metric !== null && 'label' in metric
      ? metric.label
      : ''

    return {
      value: translator.rt(value),
      label: translator.rt(label)
    }
  })
}

export function createHeroContent(translator: HeroTranslator): HeroContent {
  return {
    brandLabel: translator.t('hero.brandLabel'),
    nav: {
      work: translator.t('hero.nav.work'),
      systems: translator.t('hero.nav.systems'),
      contact: translator.t('hero.nav.contact')
    },
    availabilityLabel: translator.t('hero.availabilityLabel'),
    eyebrow: translator.t('hero.eyebrow'),
    systemLabel: translator.t('hero.systemLabel'),
    headline: translator.t('hero.headline'),
    subheadline: translator.t('hero.subheadline'),
    primaryCta: translator.t('hero.primaryCta'),
    secondaryCta: translator.t('hero.secondaryCta'),
    metrics: translateMetricMessages(translator),
    technologies,
    visual: {
      ariaLabel: translator.t('hero.visual.ariaLabel'),
      roleTag: translator.t('hero.visual.roleTag'),
      buildTag: translator.t('hero.visual.buildTag'),
      kicker: translator.t('hero.visual.kicker'),
      description: translator.t('hero.visual.description')
    }
  }
}

export function useHeroContent(): ComputedRef<HeroContent> {
  const { t, tm, rt, locale } = useI18n()

  return computed(() => {
    void locale.value

    return createHeroContent({ t, tm, rt })
  })
}
