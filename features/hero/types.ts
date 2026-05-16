export interface HeroMetric {
  value: string
  label: string
}

export interface HeroContent {
  brandLabel: string
  nav: {
    work: string
    systems: string
    contact: string
  }
  availabilityLabel: string
  eyebrow: string
  systemLabel: string
  headline: string
  subheadline: string
  primaryCta: string
  secondaryCta: string
  metrics: HeroMetric[]
  technologies: string[]
  visual: {
    ariaLabel: string
    roleTag: string
    buildTag: string
    kicker: string
    description: string
  }
}
