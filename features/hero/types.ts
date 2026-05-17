export interface HeroMetric {
  value: string
  label: string
}

export interface HeroLink {
  label: string
  href: string
}

export interface HeroContent {
  brandLabel: string
  name: string
  introLabel: string
  nav: HeroLink[]
  social: HeroLink[]
  headline: string
  subheadline: string
  positioning: string
  primaryCta: string
  secondaryCta: string
  metrics: HeroMetric[]
  technologies: string[]
}
