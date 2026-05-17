export interface HeroMetric {
  value: string
  label: string
}

export interface HeroContent {
  brandLabel: string
  name: string
  introLabel: string
  nav: {
    work: string
    systems: string
    about: string
    contact: string
  }
  availabilityLabel: string
  social: {
    github: string
    linkedin: string
  }
  eyebrow: string
  systemLabel: string
  headline: string
  subheadline: string
  positioning: string
  primaryCta: string
  secondaryCta: string
  metrics: HeroMetric[]
  technologies: string[]
  visual: {
    ariaLabel: string
    status: string
    title: string
    description: string
    signals: string[]
  }
}
